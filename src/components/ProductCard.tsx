import React from 'react';
import { Product } from '../types.js';
import { useStore } from '../context/StoreContext.js';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col overflow-hidden group relative">
      {/* Discount Badge & Wishlist Button */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discountPercent > 0 && (
          <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
            {discountPercent}% OFF
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
            NEW
          </span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-500 hover:bg-white shadow-md transition-all"
        title="Save to Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="w-full aspect-square bg-slate-100 relative overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5 text-amber-600" /> Quick View
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category Tag */}
          <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
            {product.category}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2 hover:text-amber-600 transition-colors cursor-pointer leading-tight"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="ml-1 text-[11px] font-black text-slate-800">{product.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-semibold">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <div className="text-[11px] text-slate-400 line-through font-medium">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] px-3.5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 uppercase tracking-wider shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
