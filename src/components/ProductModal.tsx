import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
  MapPin,
  HelpCircle,
  FileText
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCartOpen,
    setIsCheckoutOpen
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'faqs'>('specs');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const discountPercent = Math.round(
    ((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100
  );

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus('Available! Standard delivery in 2-4 business days. Cash on Delivery available.');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian pincode.');
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border border-slate-200 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 cursor-zoom-in"
              />
              <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs">
                Hover / Touch to Zoom
              </span>
            </div>

            {/* Thumbnail Row */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Safety Certifications Box */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 text-xs text-amber-950 space-y-2">
              <div className="font-extrabold flex items-center gap-1.5 text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>SAFTY MART Certified Product</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                Lab tested for safety, non-toxic materials (BPA Free), and baby-grade durability standards.
              </p>
            </div>
          </div>

          {/* Right Column - Product Overview */}
          <div className="space-y-5">
            <div>
              <div className="inline-block bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider mb-2">
                {selectedProduct.category}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {selectedProduct.name}
              </h1>
              {selectedProduct.tagline && (
                <p className="text-xs text-slate-500 font-semibold mt-1">{selectedProduct.tagline}</p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/50">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="ml-1 text-xs font-black text-slate-900">{selectedProduct.rating}</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">({selectedProduct.reviewsCount} Verified Customer Reviews)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline gap-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </div>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <div className="text-sm text-slate-400 line-through font-medium">
                  ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                </div>
              )}
              {discountPercent > 0 && (
                <span className="bg-rose-500 text-white text-xs font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  Save {discountPercent}%
                </span>
              )}
              <div className="ml-auto text-[10px] text-slate-500 font-bold">
                Incl. {selectedProduct.gstPercent}% GST (HSN: {selectedProduct.hsnCode})
              </div>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Key Highlights</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedProduct.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pincode Availability Checker */}
            <form onSubmit={handleCheckPincode} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Check Delivery & COD Availability
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  Check
                </button>
              </div>
              {pincodeStatus && (
                <p className={`text-xs font-semibold mt-1 ${pincodeStatus.includes('Available') ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {pincodeStatus}
                </p>
              )}
            </form>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="px-3 font-extrabold text-xs text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(selectedProduct, quantity)}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <span>BUY NOW</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs (Specifications, Reviews, FAQs) */}
        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-4 border-b border-slate-200 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'specs' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'reviews' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500'
              }`}
            >
              Reviews ({selectedProduct.reviewsCount})
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'faqs' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500'
              }`}
            >
              Product FAQs
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                <div key={key} className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between text-xs">
                  <span className="font-bold text-slate-500">{key}:</span>
                  <span className="font-extrabold text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className="text-3xl font-black text-slate-900">{selectedProduct.rating}</div>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Based on {selectedProduct.reviewsCount} customer ratings</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {selectedProduct.faqs && selectedProduct.faqs.length > 0 ? (
                selectedProduct.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
                    <h4 className="text-xs font-black text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      {faq.question}
                    </h4>
                    <p className="text-xs text-slate-600 pl-6">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">No specific FAQs for this product yet. Ask our safety team!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
