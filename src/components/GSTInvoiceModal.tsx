import React from 'react';
import { Order } from '../types.js';
import { X, Printer, ShieldCheck, Download } from 'lucide-react';

interface GSTInvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const GSTInvoiceModal: React.FC<GSTInvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative border border-slate-200 animate-scale-up">
        {/* Controls */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between rounded-t-3xl print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold">Official Tax Invoice - SAFTY MART</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Area */}
        <div id="printable-gst-invoice" className="p-8 space-y-6 text-slate-800 font-sans text-xs">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                SAFTY <span className="text-amber-500">MART</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Your Home. Our Priority.
              </p>
              <div className="text-[11px] text-slate-600 mt-2 space-y-0.5">
                <p>SAFTY MART Private Limited</p>
                <p>123, Safety Street, Okhla Industrial Area</p>
                <p>New Delhi – 110020, India</p>
                <p className="font-bold text-slate-900">GSTIN: 07AAACS1001M1Z5</p>
                <p>Email: support@saftymart.in | Tel: +91 98765 43210</p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="bg-slate-900 text-amber-400 text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                TAX INVOICE
              </span>
              <p className="font-extrabold text-slate-900 text-sm mt-2">Inv #: INV-{order.orderNumber}</p>
              <p className="text-slate-500">Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN')}</p>
              <p className="text-slate-500">Place of Supply: {order.shippingAddress.state} (07)</p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">BILLED TO & SHIPPED TO:</h4>
              <p className="font-extrabold text-slate-900 text-sm">{order.shippingAddress.fullName}</p>
              <p className="text-slate-600">{order.shippingAddress.addressLine1}</p>
              <p className="text-slate-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-slate-600">Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="space-y-1 text-right">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">PAYMENT DETAILS:</h4>
              <p className="font-bold text-slate-900">Payment Mode: {order.paymentMethod}</p>
              <p className="text-slate-600">Status: {order.paymentStatus}</p>
              {order.payuPaymentId && <p className="text-slate-600">PayU Payment ID: {order.payuPaymentId}</p>}
              {order.payuTxnId && <p className="text-slate-600">Txn Ref: {order.payuTxnId}</p>}
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 text-left">
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] font-bold">
                  <th className="p-2.5 border border-slate-800">#</th>
                  <th className="p-2.5 border border-slate-800">Item Description</th>
                  <th className="p-2.5 border border-slate-800">HSN</th>
                  <th className="p-2.5 border border-slate-800 text-center">Qty</th>
                  <th className="p-2.5 border border-slate-800 text-right">Rate</th>
                  <th className="p-2.5 border border-slate-800 text-right">GST %</th>
                  <th className="p-2.5 border border-slate-800 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 border border-slate-200 font-bold">{idx + 1}</td>
                    <td className="p-2.5 border border-slate-200 font-extrabold text-slate-900">{item.product.name}</td>
                    <td className="p-2.5 border border-slate-200 text-slate-600 font-mono">{item.product.hsnCode || '73269099'}</td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold">{item.quantity}</td>
                    <td className="p-2.5 border border-slate-200 text-right font-medium">₹{item.product.price}</td>
                    <td className="p-2.5 border border-slate-200 text-right font-medium">{item.product.gstPercent || 18}%</td>
                    <td className="p-2.5 border border-slate-200 text-right font-extrabold text-slate-900">₹{item.product.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Summary */}
          <div className="flex justify-end">
            <div className="w-72 space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({order.couponCode || 'Promo'}):</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span>₹{Math.round(order.taxAmount / 2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span>₹{Math.round(order.taxAmount / 2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges:</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-300">
                <span>Total Amount Paid:</span>
                <span className="text-amber-600">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Declaration & Signatory */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
            <div>
              <p className="font-bold text-slate-700">Declaration:</p>
              <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
            </div>

            <div className="text-center font-bold text-slate-900">
              <div className="h-10"></div>
              <p className="border-t border-slate-300 pt-1">Authorized Signatory for SAFTY MART</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
