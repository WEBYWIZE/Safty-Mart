import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  X,
  ShoppingCart,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    setIsCheckoutOpen,
    coupons
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const totalDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const taxAmount = Math.round((subtotal - totalDiscount) * 0.18);
  const freeShippingThreshold = 499;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const total = subtotal - totalDiscount + taxAmount;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponCode) return;

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, subtotal })
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCoupon({ code: couponCode.toUpperCase(), discount: data.discount });
      } else {
        setCouponError(data.message || 'Invalid coupon code');
      }
    } catch (err) {
      if (couponCode.toUpperCase() === 'SAFETY10') {
        setAppliedCoupon({ code: 'SAFETY10', discount: Math.round(subtotal * 0.1) });
      } else {
        setCouponError('Coupon code invalid or subtotal too low');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-slate-200 animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-black tracking-wide uppercase">Your Safety Cart</h2>
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-amber-50 p-3 px-5 border-b border-amber-200/80 text-xs text-amber-950">
          {amountForFreeShipping > 0 ? (
            <p className="font-semibold">
              Add <span className="font-extrabold text-amber-900">₹{amountForFreeShipping}</span> more to unlock FREE Delivery!
            </p>
          ) : (
            <p className="font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> You unlocked FREE Prepaid Shipping!
            </p>
          )}
          <div className="w-full h-1.5 bg-amber-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-slate-100">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                />

                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1">{item.product.name}</h4>
                  <div className="text-xs font-black text-amber-600">₹{item.product.price}</div>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 text-xs">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 font-bold text-slate-700 hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="px-2 font-black text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 font-bold text-slate-700 hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">Your cart is empty</h3>
              <p className="text-xs text-slate-400">Protect your home today by adding safety products.</p>
            </div>
          )}
        </div>

        {/* Footer & Checkout Trigger */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. SAFETY10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="bg-slate-900 text-amber-400 font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-slate-800"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <p className="text-xs font-bold text-emerald-600 flex items-center justify-between">
                <span>Coupon {appliedCoupon.code} applied:</span>
                <span>-₹{appliedCoupon.discount}</span>
              </p>
            )}
            {couponError && <p className="text-xs font-semibold text-rose-500">{couponError}</p>}

            {/* Price Summary Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-extrabold text-slate-900">₹{subtotal}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount:</span>
                  <span>-₹{totalDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated GST (18%):</span>
                <span className="font-extrabold text-slate-900">₹{taxAmount}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="text-amber-600">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
