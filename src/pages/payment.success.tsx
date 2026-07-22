import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  CheckCircle2,
  FileText,
  Truck,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Hash,
  ShoppingBag,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GSTInvoiceModal } from '../components/GSTInvoiceModal.js';

export const PaymentSuccessPage: React.FC = () => {
  const { selectedOrderForTrack, orders, setActivePage, setIsTrackOrderOpen } = useStore();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Trigger confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const order = selectedOrderForTrack || orders[0];

  return (
    <div className="min-h-[80vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              PayU SHA512 Payment Verified
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Order Confirmed & Payment Successful!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Thank you for choosing SAFTY MART. Your home safety items are being prepared for dispatch.
            </p>
          </div>

          {order && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs pt-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Order Number</span>
                <p className="font-extrabold text-slate-900">{order.orderNumber}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">PayU Payment ID</span>
                <p className="font-extrabold text-slate-900">{order.payuPaymentId || 'COD-CONFIRMED'}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total Amount</span>
                <p className="font-extrabold text-amber-600">₹{order.totalAmount}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Payment Method</span>
                <p className="font-extrabold text-slate-900">{order.paymentMethod}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              <FileText className="w-4 h-4" />
              <span>Download Official GST Invoice (PDF)</span>
            </button>

            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              <Truck className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
            </button>
          </div>
        </div>

        {/* Order Items Review */}
        {order && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" /> Purchased Safety Items
            </h3>

            <div className="space-y-3 divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                    <div>
                      <h4 className="font-extrabold text-slate-900">{item.product.name}</h4>
                      <p className="text-[11px] text-slate-500">Qty: {item.quantity} x ₹{item.product.price}</p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => setActivePage('home')}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Return to SAFTY MART Home Page
          </button>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && order && (
        <GSTInvoiceModal order={order} onClose={() => setShowInvoiceModal(false)} />
      )}
    </div>
  );
};
