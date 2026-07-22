import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  Lock,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  User as UserIcon
} from 'lucide-react';
import { ShippingAddress } from '../types.js';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createCODOrder,
    initiatePayUPayment,
    setSelectedOrderForTrack,
    setActivePage,
    currentUser
  } = useStore();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: currentUser?.name || 'Rahul Sharma',
    phone: currentUser?.phone || '9876543210',
    email: currentUser?.email || 'rahul@example.com',
    addressLine1: 'Flat 402, Green Valley Apartments, MG Road',
    addressLine2: 'Near Metro Station',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001'
  });

  const [paymentMethod, setPaymentMethod] = useState<'PAYU' | 'COD'>('PAYU');
  const [couponCode, setCouponCode] = useState('SAFETY10');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const discount = couponCode.toUpperCase() === 'SAFETY10' ? Math.round(subtotal * 0.1) : 0;
  const taxAmount = Math.round((subtotal - discount) * 0.18);
  const totalAmount = subtotal - discount + taxAmount;

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (paymentMethod === 'COD') {
      const order = await createCODOrder(shippingAddress, couponCode, discount);
      setIsSubmitting(false);
      if (order) {
        setSelectedOrderForTrack(order);
        setActivePage('payment-success');
      }
    } else {
      // Official PayU Gateway Flow - Submits POST form to PayU India Gateway
      await initiatePayUPayment(shippingAddress, couponCode, discount);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-slate-200 animate-scale-up">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-base font-black tracking-wide uppercase">Secure Checkout</h2>
              <p className="text-[11px] text-slate-300">100% Encrypted & Certified by PayU India</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePaymentSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Shipping Address Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" /> 1. Shipping & Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address (for GST Invoice & Updates)</label>
                <input
                  type="email"
                  required
                  value={shippingAddress.email}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Flat / House No. / Building / Street</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={shippingAddress.pincode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-500" /> 2. Select Payment Option
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'PAYU'
                    ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'PAYU'}
                  onChange={() => setPaymentMethod('PAYU')}
                  className="mt-1 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    PayU India Online Gateway
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md">
                      Instant SHA512 Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    UPI (Google Pay, PhonePe, Paytm), Credit/Debit Card, Netbanking
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'COD'
                    ? 'border-amber-400 bg-amber-50/60 ring-2 ring-amber-400/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <div className="text-xs font-black text-slate-900">Cash on Delivery (COD)</div>
                  <p className="text-[11px] text-slate-500 mt-1">Pay with cash upon delivery at your doorstep</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary & Final Total */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Subtotal ({cart.length} items):</span>
              <span className="font-bold text-slate-900">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                <span>Coupon Discount (SAFETY10):</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-slate-600">
              <span>Estimated GST (18%):</span>
              <span className="font-bold text-slate-900">₹{taxAmount}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Delivery Charges:</span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>Grand Total:</span>
              <span className="text-amber-600">₹{totalAmount}</span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Generating PayU SHA512 Hash...</span>
            ) : paymentMethod === 'PAYU' ? (
              <>
                <Lock className="w-4 h-4" />
                <span>PAY ₹{totalAmount} VIA PAYU GATEWAY</span>
              </>
            ) : (
              <>
                <Truck className="w-4 h-4" />
                <span>CONFIRM CASH ON DELIVERY ORDER</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
