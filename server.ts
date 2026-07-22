import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import paymentRoutes from './server/routes/payment.routes.js';
import { db, initDatabase } from './server/db.js';

dotenv.config();

async function startServer() {
  await initDatabase();

  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Security headers & basic rate limit protection simulation
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'SAFTY MART API',
      payuKeySet: Boolean(process.env.PAYU_KEY),
      payuEnv: process.env.PAYU_ENV || 'test',
      timestamp: new Date().toISOString(),
    });
  });

  // Mount Payment & PayU routes
  app.use('/api/payment', paymentRoutes);
  app.use('/api/payu', paymentRoutes);

  // Products API
  app.get('/api/products', async (req, res) => {
    const products = await db.getProducts();
    const category = req.query.category as string;
    const search = req.query.search as string;

    let filtered = products;
    if (category && category !== 'All Categories') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    res.json({ success: true, count: filtered.length, products: filtered });
  });

  app.get('/api/products/:id', async (req, res) => {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }
    res.json({ success: true, product });
  });

  app.post('/api/products', async (req, res) => {
    try {
      const newProduct = await db.addProduct(req.body);
      res.status(201).json({ success: true, product: newProduct });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  app.put('/api/products/:id', async (req, res) => {
    const updated = await db.updateProduct(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Product not found' });
      return;
    }
    res.json({ success: true, product: updated });
  });

  app.delete('/api/products/:id', async (req, res) => {
    const deleted = await db.deleteProduct(req.params.id);
    res.json({ success: deleted });
  });

  // Orders API
  app.get('/api/orders', async (req, res) => {
    const orders = await db.getOrders();
    res.json({ success: true, orders });
  });

  app.get('/api/orders/:id', async (req, res) => {
    const order = await db.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }
    res.json({ success: true, order });
  });

  app.put('/api/orders/:id/status', async (req, res) => {
    const { status, trackingNumber, courierPartner, message } = req.body;
    const order = await db.updateOrderStatus(req.params.id, status, { trackingNumber, courierPartner, message });
    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }
    res.json({ success: true, order });
  });

  // Coupons API
  app.get('/api/coupons', async (req, res) => {
    const coupons = await db.getCoupons();
    res.json({ success: true, coupons });
  });

  app.post('/api/coupons/validate', async (req, res) => {
    const { code, subtotal } = req.body;
    const result = await db.validateCoupon(code, subtotal);
    res.json(result);
  });

  // Auth API
  app.post('/api/auth/login', async (req, res) => {
    const { email, password, role } = req.body;
    const jwtSecret = process.env.JWT_SECRET || 'safty_mart_super_secret_jwt_key_2026';

    const users = await db.getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '9876543210',
        role: role || 'CUSTOMER'
      };
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user,
      message: 'Login successful'
    });
  });

  // Admin Analytics API
  app.get('/api/admin/analytics', async (req, res) => {
    const orders = await db.getOrders();
    const products = await db.getProducts();

    const totalRevenue = orders
      .filter(o => o.paymentStatus === 'SUCCESS' || o.orderStatus === 'DELIVERED')
      .reduce((acc, o) => acc + o.totalAmount, 0);

    const pendingOrders = orders.filter(o => o.orderStatus === 'PLACED' || o.orderStatus === 'ACCEPTED').length;
    const lowStockProducts = products.filter(p => p.stockQuantity < 10);

    res.json({
      success: true,
      analytics: {
        totalRevenue,
        totalOrders: orders.length,
        pendingOrders,
        totalProducts: products.length,
        lowStockCount: lowStockProducts.length,
        recentOrders: orders.slice(0, 5)
      }
    });
  });

  // Vite Middleware in Development vs Static in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAFTY MART Server running on http://localhost:${PORT}`);
  });
}

startServer();
