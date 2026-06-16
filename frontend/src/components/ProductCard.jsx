import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, AlertTriangle } from 'lucide-react';

export default function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();
  const { name, price, category, stockCount, images, description } = product;

  // Sane image fallback if unsplash/external links fail
  const imageUrl = images && images.length > 0 && !images[0].includes('example.com')
    ? images[0]
    : 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?w=500&q=80'; // fallback fresh fruits picture

  const isOutOfStock = stockCount <= 0;
  const isLowStock = stockCount > 0 && stockCount <= 10;

  return (
    <div className="hover-card-trigger bg-white rounded-2xl border border-stone-100 overflow-hidden flex flex-col h-full shadow-sm">
      {/* Product Image Area */}
      <div 
        onClick={() => onViewDetails(product._id)}
        className="relative aspect-video bg-emerald-50/20 overflow-hidden cursor-pointer group"
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full">
          {category}
        </span>
        
        {/* Out of Stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-stone-800 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(product._id)}
            className="font-display font-bold text-stone-800 text-base mb-1 cursor-pointer hover:text-emerald-700 transition-colors line-clamp-1"
          >
            {name}
          </h3>
          
          {/* Product Description */}
          <p className="text-xs text-stone-500 mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stock alerts and status info */}
        <div className="mb-4">
          {isLowStock && (
            <div className="flex items-center space-x-1 text-amber-600 text-[11px] font-semibold">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Only {stockCount} left in stock!</span>
            </div>
          )}
          {!isOutOfStock && !isLowStock && (
            <span className="text-emerald-700 text-[11px] font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
              In Stock ({stockCount} units)
            </span>
          )}
        </div>

        {/* Price & Cart Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-50 mt-auto">
          <div>
            <span className="text-xs text-stone-400 block">Price</span>
            <span className="text-lg font-display font-extrabold text-stone-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/10 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
