import React from 'react';
import { useStore } from '../context/StoreContext.js';
import { AlertTriangle, RefreshCw, ShoppingCart, HelpCircle } from 'lucide-react';

export const PaymentFailedPage: React.FC = () => {
  const { setActivePage, setIsCheckoutOpen, setIsCartOpen } = useStore();

  return (
    <div className="min-h-[70vh] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <AlertTriangle className="w-9 h-9 stroke-[2.2]" />
        </div>

        <div>
          <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            PayU Transaction Failed
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">
            Payment Couldn't Be Processed
          </h1>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Your transaction was declined or cancelled. Don't worry, your cart items are safe and no money was deducted.
          </p>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 text-left space-y-1">
          <div className="font-extrabold flex items-center gap-1.5 text-amber-900">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" /> Common Reasons for Failure:
          </div>
          <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5 pt-1">
            <li>Incorrect UPI PIN or Card OTP</li>
            <li>Bank server timeout or insufficient funds</li>
            <li>Browser back or window closed during authentication</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setIsCheckoutOpen(true);
            }}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <RefreshCw className="w-4 h-4" />
            <span>RETRY PAYMENT (PAYU OR COD)</span>
          </button>

          <button
            onClick={() => {
              setIsCartOpen(true);
            }}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl transition-all text-xs"
          >
            Review Cart Items
          </button>
        </div>
      </div>
    </div>
  );
};
