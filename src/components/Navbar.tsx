import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  Menu,
  Flame,
  LayoutDashboard,
  Truck,
  ChevronDown,
  Shield,
  Sparkles,
  Search,
  PackageCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    activePage,
    setActivePage,
    activeRole,
    setActiveRole
  } = useStore();

  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const navLinks = [
    { label: 'HOME', page: 'home' },
    { label: 'SHOP', page: 'shop' },
    { label: 'HOME SAFETY SOLUTIONS', page: 'shop', category: 'Home Safety' },
    { label: 'NEW ARRIVALS', page: 'shop', filter: 'new' },
    { label: 'BEST SELLERS', page: 'shop', filter: 'bestseller' },
    { label: 'TRACK ORDER', page: 'track-order' },
    { label: 'CONTACT US', page: 'contact' }
  ];

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 relative z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* All Categories Button */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-4 sm:px-6 py-3.5 flex items-center gap-2.5 transition-colors uppercase tracking-wider"
          >
            <Menu className="w-4 h-4 stroke-[2.5]" />
            <span>ALL CATEGORIES</span>
            <ChevronDown className="w-3.5 h-3.5 ml-1" />
          </button>

          {/* Category Dropdown Menu */}
          {showCategoryMenu && (
            <div
              className="absolute left-0 top-full w-64 bg-white text-slate-800 shadow-2xl rounded-b-2xl border border-slate-200 py-2 z-50 animate-slide-down"
              onMouseLeave={() => setShowCategoryMenu(false)}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActivePage('shop');
                    setShowCategoryMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-amber-50 hover:text-amber-700 transition-colors flex items-center justify-between ${
                    activeCategory === cat ? 'bg-amber-100 text-amber-900 font-bold' : ''
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] text-slate-400 font-normal">→</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (link.category) setActiveCategory(link.category);
                setActivePage(link.page);
              }}
              className={`px-3 py-3.5 text-[11px] font-extrabold uppercase tracking-wider transition-colors hover:text-amber-400 ${
                activePage === link.page && (!link.category || activeCategory === link.category)
                  ? 'text-amber-400 border-b-2 border-amber-400 bg-slate-800/40'
                  : 'text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Deals of the Day Highlight */}
          <button
            onClick={() => {
              setActivePage('shop');
            }}
            className="px-3 py-3.5 text-[11px] font-black uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5 animate-pulse"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>DEALS OF THE DAY</span>
          </button>
        </div>

        {/* Portal Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveRole('ADMIN');
              setActivePage('admin');
            }}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
              activePage === 'admin'
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <LayoutDashboard className="w-3 h-3 text-indigo-400" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          <button
            onClick={() => {
              setActiveRole('SUPPLIER');
              setActivePage('supplier');
            }}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
              activePage === 'supplier'
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Truck className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Supplier</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
