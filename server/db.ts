import mongoose from 'mongoose';
import { Product, Order, Coupon, User } from '../src/types.js';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../src/data/initialProducts.js';

let isMongoConnected = false;

// Connect to MongoDB if MONGODB_URI is provided
export async function initDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri && mongoUri.trim() !== '') {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000,
      });
      isMongoConnected = true;
      console.log('Successfully connected to MongoDB Atlas');
    } catch (err: any) {
      console.warn('MongoDB connection warning (falling back to Memory Store):', err?.message || err);
      try {
        await mongoose.disconnect();
      } catch (_) {}
    }
  } else {
    console.log('MONGODB_URI not provided. Operating in high-performance Memory Data Store mode.');
  }
}

// Memory Stores
const memoryProducts: Product[] = [...INITIAL_PRODUCTS];
const memoryCoupons: Coupon[] = [...INITIAL_COUPONS];
const memoryOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SM-2026-1001',
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1 },
      { product: INITIAL_PRODUCTS[2], quantity: 2 }
    ],
    shippingAddress: {
      fullName: 'Rahul Sharma',
      phone: '9876543210',
      email: 'rahul@example.com',
      addressLine1: 'Flat 402, Green Valley Apartments',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    paymentMethod: 'PAYU',
    paymentStatus: 'SUCCESS',
    payuPaymentId: '403928102',
    payuTxnId: 'TXN-SM-1001',
    payuHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    subtotal: 1397,
    discount: 100,
    couponCode: 'WELCOME50',
    taxAmount: 233,
    shippingFee: 0,
    totalAmount: 1530,
    orderStatus: 'PACKING',
    supplierId: 'sup-1',
    trackingNumber: 'AWB-982140',
    courierPartner: 'Delhivery',
    timeline: [
      { status: 'PLACED', message: 'Order placed & PayU Payment Verified', timestamp: '2026-07-21 10:15 AM' },
      { status: 'ACCEPTED', message: 'Order accepted by Supplier', timestamp: '2026-07-21 11:30 AM' },
      { status: 'PACKING', message: 'Order packed in safety warehouse', timestamp: '2026-07-21 02:00 PM' }
    ],
    createdAt: new Date().toISOString()
  }
];

const memoryUsers: User[] = [
  {
    id: 'usr-admin',
    name: 'Safty Mart Admin',
    email: 'admin@saftymart.com',
    phone: '9876543210',
    role: 'ADMIN'
  },
  {
    id: 'usr-supplier',
    name: 'National Logistics Supplier',
    email: 'supplier@saftymart.com',
    phone: '9812345678',
    role: 'SUPPLIER'
  },
  {
    id: 'usr-customer',
    name: 'Pooja Mehta',
    email: 'pooja@example.com',
    phone: '9988776655',
    role: 'CUSTOMER'
  }
];

export const db = {
  getProducts: async (): Promise<Product[]> => {
    return memoryProducts;
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    return memoryProducts.find(p => p.id === id);
  },

  addProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    memoryProducts.unshift(newProduct);
    return newProduct;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    const index = memoryProducts.findIndex(p => p.id === id);
    if (index === -1) return null;
    memoryProducts[index] = { ...memoryProducts[index], ...updates };
    return memoryProducts[index];
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    const index = memoryProducts.findIndex(p => p.id === id);
    if (index === -1) return false;
    memoryProducts.splice(index, 1);
    return true;
  },

  getOrders: async (): Promise<Order[]> => {
    return memoryOrders;
  },

  getOrderById: async (idOrTxnId: string): Promise<Order | undefined> => {
    return memoryOrders.find(
      o => o.id === idOrTxnId || o.orderNumber === idOrTxnId || o.payuTxnId === idOrTxnId
    );
  },

  createOrderFromPayment: async (data: {
    payuPaymentId: string;
    payuTxnId: string;
    payuHash: string;
    status: string;
    orderDetails: any;
  }): Promise<Order> => {
    const existing = memoryOrders.find(o => o.payuTxnId === data.payuTxnId);
    if (existing) {
      existing.paymentStatus = 'SUCCESS';
      existing.payuPaymentId = data.payuPaymentId;
      existing.payuHash = data.payuHash;
      return existing;
    }

    const orderNum = `SM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const details = data.orderDetails || {};

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      items: details.items || [],
      shippingAddress: details.shippingAddress || {
        fullName: details.firstname || 'Customer',
        phone: details.phone || '9876543210',
        email: details.email || 'customer@saftymart.com',
        addressLine1: details.address || 'Standard Safety Delivery Address',
        city: details.city || 'New Delhi',
        state: details.state || 'Delhi',
        pincode: details.pincode || '110001'
      },
      paymentMethod: 'PAYU',
      paymentStatus: 'SUCCESS',
      payuPaymentId: data.payuPaymentId,
      payuTxnId: data.payuTxnId,
      payuHash: data.payuHash,
      subtotal: details.subtotal || 999,
      discount: details.discount || 0,
      couponCode: details.couponCode,
      taxAmount: details.taxAmount || 180,
      shippingFee: details.shippingFee || 0,
      totalAmount: details.totalAmount || 1179,
      orderStatus: 'PLACED',
      timeline: [
        {
          status: 'PLACED',
          message: `Order placed successfully via PayU Online Payment (Payment ID: ${data.payuPaymentId})`,
          timestamp: new Date().toLocaleString('en-IN')
        }
      ],
      createdAt: new Date().toISOString()
    };

    memoryOrders.unshift(newOrder);
    return newOrder;
  },

  createCODOrder: async (data: any): Promise<Order> => {
    const orderNum = `SM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      items: data.items,
      shippingAddress: data.shippingAddress,
      paymentMethod: 'COD',
      paymentStatus: 'COD_PENDING',
      subtotal: data.subtotal,
      discount: data.discount || 0,
      couponCode: data.couponCode,
      taxAmount: data.taxAmount || 0,
      shippingFee: data.shippingFee || 0,
      totalAmount: data.totalAmount,
      orderStatus: 'PLACED',
      timeline: [
        {
          status: 'PLACED',
          message: 'Cash on Delivery order placed successfully',
          timestamp: new Date().toLocaleString('en-IN')
        }
      ],
      createdAt: new Date().toISOString()
    };

    memoryOrders.unshift(newOrder);
    return newOrder;
  },

  updateOrderStatus: async (
    orderId: string,
    status: Order['orderStatus'],
    updates?: { trackingNumber?: string; courierPartner?: string; message?: string }
  ): Promise<Order | null> => {
    const order = memoryOrders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    order.orderStatus = status;
    if (updates?.trackingNumber) order.trackingNumber = updates.trackingNumber;
    if (updates?.courierPartner) order.courierPartner = updates.courierPartner;

    order.timeline.push({
      status,
      message: updates?.message || `Order status updated to ${status}`,
      timestamp: new Date().toLocaleString('en-IN')
    });

    return order;
  },

  getCoupons: async (): Promise<Coupon[]> => {
    return memoryCoupons;
  },

  validateCoupon: async (code: string, subtotal: number): Promise<{ valid: boolean; coupon?: Coupon; discount: number; message: string }> => {
    const coupon = memoryCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { valid: false, discount: 0, message: 'Invalid coupon code.' };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount for code ${coupon.code} is ₹${coupon.minOrderValue}`
      };
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENT') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }

    return {
      valid: true,
      coupon,
      discount,
      message: `Coupon ${coupon.code} applied successfully!`
    };
  },

  getUsers: async (): Promise<User[]> => {
    return memoryUsers;
  }
};
