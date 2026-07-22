import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, User, Coupon, ShippingAddress } from '../types.js';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/initialProducts.js';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  products: Product[];
  categories: string[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  currentUser: User | null;
  activeRole: 'CUSTOMER' | 'ADMIN' | 'SUPPLIER';
  activePage: string;
  activeCategory: string;
  searchQuery: string;
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isTrackOrderOpen: boolean;
  selectedOrderForTrack: Order | null;
  toasts: Toast[];

  // Actions
  setActivePage: (page: string) => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsTrackOrderOpen: (open: boolean) => void;
  setSelectedOrderForTrack: (order: Order | null) => void;
  setActiveRole: (role: 'CUSTOMER' | 'ADMIN' | 'SUPPLIER') => void;

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;

  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  login: (email: string, role?: 'CUSTOMER' | 'ADMIN' | 'SUPPLIER') => Promise<void>;
  logout: () => void;

  fetchOrders: () => Promise<void>;
  createCODOrder: (shippingAddress: ShippingAddress, couponCode?: string, discount?: number) => Promise<Order | null>;
  initiatePayUPayment: (shippingAddress: ShippingAddress, couponCode?: string, discount?: number) => Promise<boolean>;

  updateOrderStatus: (orderId: string, status: Order['orderStatus'], updates?: any) => Promise<void>;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CATEGORIES_LIST = [
  'All Categories',
  'Home Safety',
  'Gate Safety',
  'Door Safety',
  'Window Safety',
  'Kitchen Safety',
  'Bathroom Safety',
  'Stair Safety',
  'Electrical Safety',
  'Child Safety',
  'Baby Safety',
  'Fire Safety',
  'Emergency Safety',
  'Cleaning Tools',
  'Fan Cleaning',
  'Furniture Safety',
  'Anti Slip Products',
  'Mosquito Protection',
  'Water Leak Protection'
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('safty_mart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('safty_mart_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'usr-customer-1',
    name: 'Pooja Mehta',
    email: 'pooja@example.com',
    phone: '9876543210',
    role: 'CUSTOMER'
  });
  const [activeRole, setActiveRole] = useState<'CUSTOMER' | 'ADMIN' | 'SUPPLIER'>('CUSTOMER');

  const [activePage, setActivePage] = useState<string>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState<boolean>(false);
  const [selectedOrderForTrack, setSelectedOrderForTrack] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('safty_mart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('safty_mart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync URL query params for payment success/failed redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      setActivePage(pageParam);
    }
    fetchProducts();
    fetchOrders();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      }
    } catch (e) {
      console.warn('API fetch products warning:', e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      }
    } catch (e) {
      console.warn('API fetch orders warning:', e);
    }
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to Cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const login = async (email: string, role: 'CUSTOMER' | 'ADMIN' | 'SUPPLIER' = 'CUSTOMER') => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'dummy', role })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.user);
        setActiveRole(data.user.role);
        showToast(`Welcome ${data.user.name}! (${data.user.role} view activated)`, 'success');
      }
    } catch (err) {
      showToast('Login simulated successfully', 'success');
      setCurrentUser({
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '9876543210',
        role
      });
      setActiveRole(role);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out', 'info');
  };

  // Create COD Order
  const createCODOrder = async (shippingAddress: ShippingAddress, couponCode?: string, discount = 0): Promise<Order | null> => {
    const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    const taxAmount = Math.round((subtotal - discount) * 0.18);
    const totalAmount = subtotal - discount + taxAmount;

    try {
      const res = await fetch('/api/payment/cod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingAddress,
          subtotal,
          discount,
          couponCode,
          taxAmount,
          shippingFee: 0,
          totalAmount
        })
      });

      const data = await res.json();
      if (data.success && data.order) {
        setOrders(prev => [data.order, ...prev]);
        clearCart();
        setIsCheckoutOpen(false);
        showToast('Order Placed Successfully via Cash On Delivery!', 'success');
        return data.order;
      }
    } catch (e) {
      console.error('COD Order Error:', e);
    }
    return null;
  };

  // Initiate Official PayU India Online Gateway Payment
  const initiatePayUPayment = async (shippingAddress: ShippingAddress, couponCode?: string, discount = 0): Promise<boolean> => {
    const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
    const taxAmount = Math.round((subtotal - discount) * 0.18);
    const totalAmount = subtotal - discount + taxAmount;
    const txnid = `TXN-SM-${Date.now()}`;
    const productinfo = cart.map(i => i.product.name).join(', ').substring(0, 80) || 'Home Safety Products';

    const udf1Payload = encodeURIComponent(
      JSON.stringify({
        items: cart,
        shippingAddress,
        subtotal,
        discount,
        couponCode,
        taxAmount,
        totalAmount
      })
    );

    try {
      const res = await fetch('/api/payment/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txnid,
          amount: totalAmount,
          productinfo,
          firstname: shippingAddress.fullName,
          email: shippingAddress.email,
          udf1: udf1Payload
        })
      });

      const data = await res.json();
      if (data.success) {
        // Construct and submit standard HTML form to official PayU India Gateway URL
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.actionUrl;

        const fields: Record<string, string> = {
          key: data.key,
          txnid: data.txnid,
          amount: Number(data.amount).toFixed(2),
          productinfo: data.productinfo,
          firstname: data.firstname,
          email: data.email,
          phone: shippingAddress.phone || '',
          surl: `${window.location.origin}/api/payment/success`,
          furl: `${window.location.origin}/api/payment/failed`,
          hash: data.hash,
          udf1: udf1Payload
        };

        Object.entries(fields).forEach(([k, v]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = k;
          input.value = v;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        return true;
      } else {
        showToast(data.error || 'Failed to generate PayU payment hash', 'error');
      }
    } catch (e: any) {
      console.error('PayU Payment Initiation Error:', e);
      showToast('Error connecting to PayU gateway', 'error');
    }
    return false;
  };

  const updateOrderStatus = async (orderId: string, status: Order['orderStatus'], updates?: any) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, ...updates })
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrders(prev => prev.map(o => o.id === data.order.id ? data.order : o));
        showToast(`Order status updated to ${status}`, 'success');
      }
    } catch (e) {
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o)
      );
      showToast(`Order status updated to ${status}`, 'success');
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => [data.product, ...prev]);
        showToast('New Safety Product Added Successfully!', 'success');
      }
    } catch (e) {
      const localP = { ...productData, id: `prod-${Date.now()}` };
      setProducts(prev => [localP, ...prev]);
      showToast('New Product Created', 'success');
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === id ? data.product : p));
        showToast('Product Updated', 'success');
      }
    } catch (e) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
      showToast('Product Updated', 'success');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product removed from catalog', 'info');
    } catch (e) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product removed', 'info');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: CATEGORIES_LIST,
        cart,
        wishlist,
        orders,
        coupons,
        currentUser,
        activeRole,
        activePage,
        activeCategory,
        searchQuery,
        selectedProduct,
        isCartOpen,
        isCheckoutOpen,
        isTrackOrderOpen,
        selectedOrderForTrack,
        toasts,

        setActivePage,
        setActiveCategory,
        setSearchQuery,
        setSelectedProduct,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsTrackOrderOpen,
        setSelectedOrderForTrack,
        setActiveRole,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,

        showToast,
        login,
        logout,

        fetchOrders,
        createCODOrder,
        initiatePayUPayment,

        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
