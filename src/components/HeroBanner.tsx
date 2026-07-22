import React from 'react';
import { useStore } from '../context/StoreContext.js';
import { Shield, Award, Users, Wrench, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActivePage, setActiveCategory } = useStore();

  const hotspots = [
    {
      title: 'Gate Safety',
      subtitle: 'for Kids',
      category: 'Gate Safety',
      img: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=200&q=80',
      pos: 'top-8 left-12'
    },
    {
      title: 'Fan Cleaning',
      subtitle: 'Made Easy',
      category: 'Fan Cleaning',
      img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80',
      pos: 'bottom-16 left-1/4'
    },
    {
      title: 'Corner Safety',
      subtitle: 'Protectors',
      category: 'Furniture Safety',
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80',
      pos: 'top-10 right-16'
    },
    {
      title: 'Window Safety',
      subtitle: 'Locks',
      category: 'Window Safety',
      img: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=200&q=80',
      pos: 'top-1/2 right-6'
    },
    {
      title: 'Stair Safety',
      subtitle: 'Nets',
      category: 'Stair Safety',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
      pos: 'bottom-8 right-24'
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-100 overflow-hidden py-10 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/50 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>INDIA'S #1 TRUSTED HOME SAFETY BRAND</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              MAKE YOUR HOME <br />
              <span className="text-amber-500 underline decoration-amber-300 decoration-wavy">100% SAFE</span>
            </h1>

            <p className="text-base sm:text-lg font-medium text-slate-600 max-w-xl mx-auto lg:mx-0">
              Smart & easy home safety solutions for you and your loved ones. Protect babies, seniors & pets with certified non-toxic safety guards.
            </p>

            {/* Key Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <Award className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">High Quality Products</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <Users className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Trusted by 10,000+ Families</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <Wrench className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Easy to Install & Use</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                <Tag className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Best Prices Guaranteed</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActivePage('shop')}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 text-sm tracking-wide"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => {
                  setActiveCategory('Home Safety');
                  setActivePage('shop');
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all text-sm tracking-wide"
              >
                EXPLORE COLLECTION
              </button>
            </div>
          </div>

          {/* Right Hero Image with Hotspots */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200 group">
              <img
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80"
                alt="Happy family in safe home"
                className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Safety Badges over Image */}
              {hotspots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCategory(spot.category);
                    setActivePage('shop');
                  }}
                  className={`hidden sm:flex absolute ${spot.pos} items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 pr-3 rounded-2xl shadow-xl border border-white hover:scale-110 transition-transform cursor-pointer group/spot`}
                >
                  <img src={spot.img} alt={spot.title} className="w-9 h-9 rounded-xl object-cover" />
                  <div className="text-left">
                    <div className="text-[10px] font-black text-slate-900 group-hover/spot:text-amber-600 transition-colors">
                      {spot.title}
                    </div>
                    <div className="text-[9px] text-slate-500 font-semibold">{spot.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
