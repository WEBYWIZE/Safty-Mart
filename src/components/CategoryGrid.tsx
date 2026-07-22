import React from 'react';
import { useStore } from '../context/StoreContext.js';
import { ArrowRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { setActiveCategory, setActivePage } = useStore();

  const categoryCards = [
    {
      name: 'Gate Safety',
      count: '12+ Products',
      image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Fan Cleaning',
      count: '10+ Products',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Corner Safety',
      count: '15+ Products',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Window Safety',
      count: '12+ Products',
      image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Stair Safety',
      count: '10+ Products',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Kitchen Safety',
      count: '8+ Products',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Bathroom Safety',
      count: '10+ Products',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Explore our specialized home safety collections</p>
          </div>

          <button
            onClick={() => {
              setActiveCategory('All Categories');
              setActivePage('shop');
            }}
            className="text-xs font-black text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors uppercase tracking-wider"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {categoryCards.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(cat.name);
                setActivePage('shop');
              }}
              className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all text-center group cursor-pointer flex flex-col items-center"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs font-black text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">{cat.count}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
