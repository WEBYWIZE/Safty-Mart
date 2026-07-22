import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import { ProductCard } from './ProductCard.js';
import { ArrowRight, Flame, ShieldAlert } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { products, activeCategory, setActiveCategory, searchQuery, setActivePage } = useStore();
  const [filterType, setFilterType] = useState<'all' | 'bestsellers' | 'new'>('bestsellers');

  let filtered = products;

  if (activeCategory && activeCategory !== 'All Categories') {
    filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  if (filterType === 'bestsellers') {
    filtered = filtered.filter(p => p.isBestSeller);
  } else if (filterType === 'new') {
    filtered = filtered.filter(p => p.isNewArrival);
  }

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                {activeCategory !== 'All Categories' ? `${activeCategory} Products` : 'BEST SELLERS'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Tested & certified home safety devices trusted by thousands of Indian families
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilterType('bestsellers')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filterType === 'bestsellers'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setFilterType('new')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filterType === 'new'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filterType === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Products
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No products found</h3>
            <p className="text-xs text-slate-500 mt-1">Try changing your category filter or search terms.</p>
            <button
              onClick={() => {
                setActiveCategory('All Categories');
                setFilterType('all');
              }}
              className="mt-4 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* View All Products CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              setActiveCategory('All Categories');
              setActivePage('shop');
            }}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-md transition-all uppercase tracking-wider"
          >
            <span>View All Safety Products ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
