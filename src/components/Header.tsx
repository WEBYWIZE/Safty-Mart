import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  Phone,
  ShieldCheck,
  Truck,
  ChevronDown,
  LayoutDashboard,
  Truck as TruckIcon,
  LogOut,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    setIsCartOpen,
    setActivePage,
    currentUser,
    activeRole,
    setActiveRole,
    logout,
    login
  } = useStore();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('shop');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authEmail) {
      login(authEmail, 'CUSTOMER');
      setShowAuthModal(false);
      setAuthEmail('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center gap-6 text-slate-300 mx-auto sm:mx-0">
          <span className="flex items-center gap-1.5 font-medium text-amber-400">
            <Truck className="w-3.5 h-3.5 text-amber-400" /> Free Delivery on Prepaid Orders
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure Payment (PayU Verified)
          </span>
        </div>
        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium">
            <Phone className="w-3.5 h-3.5 text-amber-400" /> Help Line: +91 98765 43210
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => {
            setActivePage('home');
            setActiveCategory('All Categories');
            setSearchQuery('');
          }}
          className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-hidden"
        >
          <div className="w-11 h-11 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
              SAFTY <span className="text-amber-500">MART</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Your Home. Our Priority.
            </div>
          </div>
        </button>

        {/* Search Bar with Category Dropdown */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-2xl items-center border-2 border-amber-400 rounded-xl overflow-hidden bg-slate-50 focus-within:ring-2 focus-within:ring-amber-400/50 transition-all"
        >
          <div className="relative shrink-0 border-r border-slate-300 bg-white">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="appearance-none bg-transparent py-2.5 pl-3.5 pr-8 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <input
            type="text"
            placeholder="Search for home safety products (e.g. baby gate, fan cleaner, fire extinguisher)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 px-4 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
          />

          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-5 py-3 transition-colors flex items-center justify-center shrink-0"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Actions (Login / Account, Wishlist, Cart) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* User Account & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all text-slate-800"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                {activeRole === 'ADMIN' ? 'AD' : activeRole === 'SUPPLIER' ? 'SUP' : 'US'}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  {activeRole}
                </div>
                <div className="text-xs font-bold text-slate-800 truncate max-w-[100px]">
                  {currentUser ? currentUser.name : 'Account'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {showRoleMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in"
                onMouseLeave={() => setShowRoleMenu(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{currentUser ? currentUser.name : 'Guest User'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser ? currentUser.email : 'Click below to switch view'}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveRole('CUSTOMER');
                      setActivePage('home');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                      activeRole === 'CUSTOMER' ? 'font-bold text-amber-600 bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    <UserIcon className="w-4 h-4 text-slate-500" /> Customer Store View
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole('ADMIN');
                      setActivePage('admin');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                      activeRole === 'ADMIN' ? 'font-bold text-amber-600 bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-600" /> Admin Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole('SUPPLIER');
                      setActivePage('supplier');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                      activeRole === 'SUPPLIER' ? 'font-bold text-amber-600 bg-amber-50/50' : 'text-slate-700'
                    }`}
                  >
                    <TruckIcon className="w-4 h-4 text-emerald-600" /> Supplier Portal
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  {currentUser ? (
                    <button
                      onClick={() => {
                        logout();
                        setShowRoleMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAuthModal(true);
                        setShowRoleMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-amber-600 hover:bg-amber-50 flex items-center gap-2 font-medium"
                    >
                      <UserIcon className="w-3.5 h-3.5" /> Quick Login
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setActivePage('shop')}
            className="relative p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all text-slate-700"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 text-slate-700" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl shadow-md transition-all group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left border-l border-slate-700 pl-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cart</div>
              <div className="text-xs font-black text-amber-400">₹{cartSubtotal.toLocaleString('en-IN')}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
          <input
            type="text"
            placeholder="Search home safety products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-3 text-xs text-slate-800 focus:outline-hidden"
          />
          <button type="submit" className="bg-amber-400 px-3 py-2 text-slate-900">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Login Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative border border-slate-200 animate-scale-up">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Sign in to SAFTY MART</h3>
              <p className="text-xs text-slate-500 mt-1">Access saved addresses, tracked orders & exclusive coupons</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-3 rounded-xl shadow-md transition-all text-xs"
              >
                Send Login OTP / Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
