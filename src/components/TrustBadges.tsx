import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Wallet, Lock } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Truck,
      title: 'FREE DELIVERY',
      desc: 'On Prepaid Orders'
    },
    {
      icon: RotateCcw,
      title: '7 DAYS RETURN',
      desc: 'No Questions Asked'
    },
    {
      icon: ShieldCheck,
      title: 'SECURE PAYMENT',
      desc: '100% Protected PayU'
    },
    {
      icon: Wallet,
      title: 'COD AVAILABLE',
      desc: 'Cash on Delivery'
    },
    {
      icon: Lock,
      title: 'SAFE SHOPPING',
      desc: 'Your Safety, Our Priority'
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {badges.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-2 justify-center text-center sm:text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/60">
                  <IconComponent className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 tracking-wide uppercase">{b.title}</h4>
                  <p className="text-[11px] font-medium text-slate-500">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
