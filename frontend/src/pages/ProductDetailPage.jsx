import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, RefreshCw, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export default function ProductDetailPage({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Product retrieval failed');
        }

        setProduct(data.data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <RefreshCw className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
        <p className="text-sm font-medium text-stone-500">Retrieving details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-3xl p-8 shadow-sm">
          <p className="text-lg font-bold mb-2">Error loading product</p>
          <p className="text-sm mb-6">{error || 'Product not found.'}</p>
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-555 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/10 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Shop</span>
          </button>
        </div>
      </div>
    );
  }

  const { name, price, description, category, stockCount, images, attributes } = product;

  const imageUrl = images && images.length > 0 && !images[0].includes('example.com')
    ? images[0]
    : 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?w=800&q=80';

  const isOutOfStock = stockCount <= 0;
  const isLowStock = stockCount > 0 && stockCount <= 10;

  const handleIncrement = () => {
    setQty(prev => Math.min(prev + 1, stockCount));
  };

  const handleDecrement = () => {
    setQty(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    // Visual indicator of successful add
    alert(`Added ${qty} x ${name} to your cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-stone-550 hover:text-emerald-700 font-semibold mb-6 transition-all group cursor-pointer hover:scale-102 active:scale-98"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to catalog</span>
      </button>

      {/* Two-Column Details Layout */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* LEFT: Product Image Frame */}
          <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-emerald-50/20 rounded-2xl overflow-hidden border border-stone-100">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-xs flex items-center justify-center">
                <span className="bg-stone-900 text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-xl">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* RIGHT: Product Information Area */}
          <div className="flex flex-col">
            <div className="border-b border-stone-100 pb-6 mb-6">
              {/* Category */}
              <span className="bg-emerald-50 text-emerald-800 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-emerald-100 inline-block mb-3">
                {category}
              </span>

              {/* Title */}
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-stone-900 mb-2 leading-tight">
                {name}
              </h1>

              {/* Price Tag */}
              <div className="flex items-baseline space-x-2 mt-3">
                <span className="text-3xl font-display font-black text-emerald-950">
                  ₹{price.toLocaleString('en-IN')}
                </span>
                <span className="text-stone-400 text-sm">/ pack</span>
              </div>
            </div>

            {/* Stock alert */}
            <div className="mb-6">
              {isOutOfStock ? (
                <span className="text-red-600 bg-red-50 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-100">
                  Currently Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="text-amber-700 bg-amber-50 text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-100">
                  Hurry! Only {stockCount} packs left in stock
                </span>
              ) : (
                <span className="text-emerald-700 bg-emerald-50 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-100">
                  Freshly Stocked ({stockCount} units available)
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-display font-bold text-stone-800 text-base mb-2">Description</h3>
              <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Flexible Attributes Grid */}
            {attributes && Object.keys(attributes).length > 0 && (
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5 mb-8">
                <h3 className="font-display font-bold text-stone-800 text-sm mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(attributes).map(([key, val]) => (
                    <div key={key} className="border-b border-stone-100/50 pb-2">
                      <span className="text-stone-400 text-xs block capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-stone-700 text-sm font-semibold">
                        {typeof val === 'boolean' ? (val ? 'Yes' : 'No') : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            {!isOutOfStock && (
              <div className="flex flex-col sm:flex-row gap-4 items-stretch mt-auto">
                {/* Quantity selector */}
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden h-12 bg-stone-50 shrink-0">
                  <button
                    onClick={handleDecrement}
                    className="w-12 h-full hover:bg-emerald-50 hover:text-emerald-700 text-stone-600 font-bold transition-colors cursor-pointer active:bg-emerald-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-stone-800">
                    {qty}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-12 h-full hover:bg-emerald-50 hover:text-emerald-700 text-stone-600 font-bold transition-colors cursor-pointer active:bg-emerald-100"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold h-12 transition-all shadow-md shadow-emerald-600/10 hover:shadow-lg active:scale-98 cursor-pointer hover:scale-102"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Shopping Cart</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
