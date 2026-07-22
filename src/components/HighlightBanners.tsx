import React from 'react';
import { useStore } from '../context/StoreContext.js';

export const HighlightBanners: React.FC = () => {
  const { setActiveCategory, setActivePage } = useStore();

  const highlights = [
    {
      title: 'KEEP KIDS SAFE',
      subtitle: 'Everywhere at Home',
      category: 'Child Safety',
      bgImage: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'CLEAN FANS WITHOUT RISK',
      subtitle: 'Long Handle, Easy Cleaning',
      category: 'Fan Cleaning',
      bgImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'PREVENT INJURIES AT HOME',
      subtitle: 'Smart Corner Protection',
      category: 'Furniture Safety',
      bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'SAFE WINDOWS PEACEFUL HOME',
      subtitle: 'Secure Your Windows',
      category: 'Window Safety',
      bgImage: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'STRONG & SAFE STAIR PROTECTION',
      subtitle: 'Protect Your Family',
      category: 'Stair Safety',
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {highlights.map((h, idx) => (
            <div
              key={idx}
              className="relative h-56 rounded-2xl overflow-hidden shadow-md border border-slate-200 group flex flex-col justify-end p-5 text-white"
            >
              <img
                src={h.bgImage}
                alt={h.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />

              <div className="relative z-10 space-y-1">
                <h3 className="text-xs font-black tracking-tight leading-tight uppercase text-amber-300">
                  {h.title}
                </h3>
                <p className="text-[11px] font-medium text-slate-200">{h.subtitle}</p>

                <button
                  onClick={() => {
                    setActiveCategory(h.category);
                    setActivePage('shop');
                  }}
                  className="mt-3 bg-white hover:bg-amber-400 text-slate-950 font-black text-[10px] px-3.5 py-1.5 rounded-lg shadow-xs transition-colors uppercase tracking-wider inline-block"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
