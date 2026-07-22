import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import { Truck, PackageCheck, CheckCircle2, XCircle, FileText, Send, MapPin } from 'lucide-react';

export const SupplierDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [courierPartner, setCourierPartner] = useState('Delhivery Express');
  const [trackingNumber, setTrackingNumber] = useState(`AWB-98${Math.floor(10000 + Math.random() * 90000)}`);

  const handleDispatchSubmit = (e: React.FormEvent, orderId: string) => {
    e.preventDefault();
    updateOrderStatus(orderId, 'DISPATCHED', {
      trackingNumber,
      courierPartner,
      message: `Package dispatched via ${courierPartner} (Tracking: ${trackingNumber})`
    });
    setSelectedOrderId(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Supplier Header */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center font-black">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Authorized Fulfillment Warehouse
              </span>
              <h1 className="text-xl sm:text-2xl font-black">Supplier Dispatch Portal</h1>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Pending Orders for Fulfillment ({orders.length})
          </h3>

          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-black text-slate-900">{order.orderNumber}</span>
                    <span className="ml-2 text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-md uppercase">
                      Status: {order.orderStatus}
                    </span>
                  </div>

                  {/* Supplier Stage Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {order.orderStatus === 'PLACED' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ACCEPTED', { message: 'Order accepted by Supplier Warehouse' })}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Accept Order
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'REJECTED', { message: 'Order rejected due to stock constraint' })}
                          className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject Order
                        </button>
                      </>
                    )}

                    {order.orderStatus === 'ACCEPTED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PACKING', { message: 'Order packing initiated in safety box' })}
                        className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
                      >
                        <PackageCheck className="w-3.5 h-3.5" /> Mark Packing Complete
                      </button>
                    )}

                    {order.orderStatus === 'PACKING' && (
                      <button
                        onClick={() => setSelectedOrderId(order.id)}
                        className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-black text-xs px-4 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" /> Generate Dispatch AWB
                      </button>
                    )}

                    {order.orderStatus === 'DISPATCHED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'DELIVERED', { message: 'Package delivered to customer address' })}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-1.5 rounded-xl shadow-xs"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>

                {/* Items & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h4 className="font-extrabold text-slate-800 mb-1">Items to Pack:</h4>
                    <ul className="space-y-1 text-slate-600">
                      {order.items.map((item, idx) => (
                        <li key={idx}>• {item.product.name} (Qty: {item.quantity})</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-800 mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" /> Delivery Address:
                    </h4>
                    <p className="text-slate-600">{order.shippingAddress.fullName}</p>
                    <p className="text-slate-600">{order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
                    <p className="text-slate-600">Phone: {order.shippingAddress.phone}</p>
                  </div>
                </div>

                {/* Dispatch Form Popup */}
                {selectedOrderId === order.id && (
                  <form onSubmit={(e) => handleDispatchSubmit(e, order.id)} className="p-4 bg-white rounded-xl border border-slate-300 space-y-3">
                    <h4 className="font-bold text-slate-900">Enter Shipping Dispatch Info</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-bold mb-1">Courier Partner</label>
                        <input
                          type="text"
                          required
                          value={courierPartner}
                          onChange={(e) => setCourierPartner(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">AWB Tracking Number</label>
                        <input
                          type="text"
                          required
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setSelectedOrderId(null)} className="px-3 py-1.5 bg-slate-100 text-xs font-bold rounded-lg">Cancel</button>
                      <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg">Confirm Dispatch</button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
