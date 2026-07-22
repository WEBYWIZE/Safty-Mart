export interface Product {
  id: string;
  name: string;
  tagline?: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockQuantity: number;
  hsnCode: string;
  gstPercent: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  faqs?: { question: string; answer: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethod = 'PAYU' | 'COD';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'COD_PENDING';
  payuPaymentId?: string;
  payuTxnId?: string;
  payuHash?: string;
  subtotal: number;
  discount: number;
  couponCode?: string;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
  orderStatus: 'PLACED' | 'ACCEPTED' | 'PACKING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED' | 'REJECTED';
  supplierId?: string;
  trackingNumber?: string;
  courierPartner?: string;
  timeline: {
    status: string;
    message: string;
    timestamp: string;
  }[];
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'PERCENT' | 'FLAT';
  discountValue: number;
  minOrderValue: number;
  description: string;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPPLIER';
  address?: ShippingAddress;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}
