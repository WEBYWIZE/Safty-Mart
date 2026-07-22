import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, MapPin } from 'lucide-react';

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, orders, selectedOrderForTrack } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState(selectedOrderForTrack || orders[0] || null);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    const found = orders.find(
      o => o.orderNumber.toLowerCase() === searchQuery.toLowerCase() ||
           o.id === searchQuery ||
           o.shippingAddress.phone.includes(searchQuery)
    );
    if (found) {
      setActiveOrder(found);
    }
  };

  const steps = ['PLACED', 'ACCEPTED', 'PACKING', 'DISPATCHED', 'DELIVERED'];

  const getStepIndex = (status: string) => {
    const idx = steps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  const currentStepIdx = activeOrder ? getStepIndex(activeOrder.orderStatus) : 0;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative border border-slate-200 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-black tracking-wide uppercase">Track Your Safety Shipment</h2>
          </div>

          <button onClick={() => setIsTrackOrderOpen(false)} className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order Number (e.g. SM-2026-1001) or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              Search
            </button>
          </form>

          {activeOrder ? (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-slate-900 text-sm">{activeOrder.orderNumber}</span>
                  <span className="bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-md text-[10px] uppercase">
                    Status: {activeOrder.orderStatus}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                  <p><span className="font-bold">Shipment To:</span> {activeOrder.shippingAddress.fullName}</p>
                  <p><span className="font-bold">Pincode:</span> {activeOrder.shippingAddress.pincode}</p>
                  {activeOrder.trackingNumber && (
                    <p className="col-span-2 text-emerald-700 font-extrabold">
                      Courier Partner: {activeOrder.courierPartner} (AWB: {activeOrder.trackingNumber})
                    </p>
                  )}
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Live Delivery Timeline</h4>

                <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                  {activeOrder.timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-xs flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                      </div>
                      <div className="text-xs space-y-0.5">
                        <div className="font-extrabold text-slate-900">{item.status}</div>
                        <p className="text-slate-600 font-medium">{item.message}</p>
                        <p className="text-[10px] text-slate-400">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              No active order selected. Enter your order number above to search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
