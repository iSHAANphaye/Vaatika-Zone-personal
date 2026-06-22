import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, RefreshCw, X, ShoppingBag } from 'lucide-react';

export default function ProductListingPage({ onViewDetails }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Sort States
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Trigger on enter/button click
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('-createdAt');
  
  // Pagination States (Local/In-Memory)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20); // Default to 20 per page

  // Retry trigger for temporary connection failures
  const [retryTrigger, setRetryTrigger] = useState(0);

  // Mobile filter sidebar toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Toggle Shopping Info banner
  const [showShoppingInfo, setShowShoppingInfo] = useState(true);

  // Reset page to 1 whenever filters or limit changes
  useEffect(() => {
    setPage(1);
  }, [category, sort, searchQuery, limit]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `/api/products?sort=${sort}`;
        if (category !== 'All') {
          url += `&category=${category}`;
        }
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch products');
        }

        setProducts(data.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sort, searchQuery, retryTrigger]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSearchQuery('');
    setCategory('All');
    setSort('-createdAt');
    setPage(1);
    setLimit(20);
  };

  // Derived in-memory pagination values
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(page * limit, totalItems);
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Header Area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 mb-8 shadow-xl">
        <div className="relative z-10 max-w-xl">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 inline-block">
            Chhattisgarh Local Delivery
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight mb-4 leading-tight">
            Fresh Fruits & Vegetables
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
            Sourced directly from local farmers in Raipur, Bhilai & Durg and delivered fresh to your doorstep.
          </p>
        </div>
        
        {/* Abstract leafy decorations */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C75 25 100 50 100 75 C100 100 75 100 50 100 C25 100 0 100 0 75 C0 50 25 25 50 0 Z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR: Desktop filters & Shopping Info */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Filter Panel */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <span className="font-display font-bold text-stone-800 flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-emerald-600" />
                  Filters
                </span>
                {(category !== 'All' || searchQuery || sort !== '-createdAt') && (
                  <button 
                    onClick={handleClearFilters}
                    className="text-xs text-red-500 hover:text-red-750 font-semibold transition-colors cursor-pointer hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Category</h3>
                <div className="space-y-2">
                  {['All', 'Fruits', 'Vegetables'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                        category === cat
                          ? 'bg-emerald-50 text-emerald-750 font-bold border border-emerald-100/50'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-emerald-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting Filter */}
              <div>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { value: '-createdAt', label: 'Newest First' },
                    { value: 'price', label: 'Price: Low to High' },
                    { value: '-price', label: 'Price: High to Low' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSort(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer hover:scale-102 active:scale-98 ${
                        sort === option.value
                          ? 'bg-emerald-50 text-emerald-755 font-bold border border-emerald-100/50'
                          : 'text-stone-600 hover:bg-stone-50 hover:text-emerald-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Shopping Info card */}
            <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-2xl p-5 border border-emerald-800/30 shadow-xs">
              <h3 className="font-display font-bold text-emerald-400 text-sm mb-3 flex items-center gap-1.5">
                <ShoppingBag className="h-4 w-4" />
                Shopping Info
              </h3>
              <ul className="space-y-3 text-[11px] text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-450 font-bold">•</span>
                  <span><strong>Delivery Scope:</strong> Serving Raipur, Bhilai, and Durg cities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-455 font-bold">•</span>
                  <span><strong>Daily Cutoff:</strong> Order by 10:00 PM for next-morning 7-10 AM delivery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-450 font-bold">•</span>
                  <span><strong>Pricing Policy:</strong> Free shipping above ₹200. Flat ₹30 below.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-450 font-bold">•</span>
                  <span><strong>Eco Program:</strong> Return previous cloth bag to get ₹10 cashback refund!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-450 font-bold">•</span>
                  <span><strong>Freshness:</strong> 100% organic guarantee, free return at doorstep.</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* MAIN CATALOG PANEL */}
        <div className="flex-grow">
          
          {/* Collapsible Shopping Info Alert/Banner */}
          {showShoppingInfo && (
            <div className="relative overflow-hidden bg-emerald-50 border border-emerald-150 rounded-2xl p-5 mb-6 shadow-xs flex justify-between items-start gap-4">
              <div className="flex gap-3.5 items-start">
                <div className="bg-emerald-600 text-white p-2 rounded-xl shrink-0 mt-0.5 shadow-sm">
                  <ShoppingBag className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-emerald-950 text-xs sm:text-sm mb-1.5">
                    Vaatika Zone Shopping & Delivery Guidelines
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-8 text-xs text-emerald-800/90 mt-2">
                    <div>
                      <strong>📍 Coverage:</strong> Raipur, Bhilai, and Durg.
                    </div>
                    <div>
                      <strong>⏰ Timing:</strong> Order by 10 PM for 7-10 AM next-day arrival.
                    </div>
                    <div>
                      <strong>🚚 Shipping:</strong> Free delivery above ₹200 (₹30 flat under).
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-700/85 mt-3">
                    ♻️ <strong>Eco Reward:</strong> Hand back your previous Vaatika delivery bag for a ₹10 cashback refund!
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowShoppingInfo(false)}
                className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer hover:scale-105"
                title="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Search bar, Info toggle & Mobile Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fresh mangoes, local tomatoes, potatoes..."
                className="w-full bg-white border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-2xl pl-11 pr-24 py-3 text-sm font-medium shadow-xs transition-all outline-none"
              />
              <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-stone-400" />
              <div className="absolute right-2 top-2 flex gap-1">
                {search && (
                  <button
                    type="button"
                    onClick={() => { setSearch(''); setSearchQuery(''); }}
                    className="p-1.5 text-stone-400 hover:text-stone-650 hover:bg-stone-100 rounded-lg cursor-pointer hover:scale-105"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md shadow-emerald-600/10"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex gap-2 shrink-0">
              {/* Shopping Info toggle */}
              <button
                onClick={() => setShowShoppingInfo(prev => !prev)}
                className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-2 bg-white border border-stone-200 hover:bg-stone-50 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-700 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Toggle Shopping Info"
              >
                <ShoppingBag className="h-4.5 w-4.5 text-emerald-600" />
                <span>Info</span>
              </button>

              {/* Mobile Filter Buttons */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center justify-center space-x-2 bg-white border border-stone-200 hover:bg-stone-50 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-700 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <SlidersHorizontal className="h-4.5 w-4.5 text-emerald-600" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Catalog grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <RefreshCw className="h-10 w-10 text-emerald-600 animate-spin mb-4" />
              <p className="text-sm font-medium text-stone-500">Loading fresh inventory...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center max-w-md mx-auto shadow-sm">
              <p className="font-semibold mb-2">Failed to load catalog</p>
              <p className="text-xs text-red-600 mb-6 leading-relaxed">
                Unable to load fresh inventory. Please check your network connection or try again.
              </p>
              <button
                onClick={() => setRetryTrigger(prev => prev + 1)}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-red-650/15 cursor-pointer hover:scale-105 active:scale-95"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-stone-50 rounded-3xl border border-dashed border-stone-200 p-16 text-center animate-fade-in">
              <span className="text-4xl">🥦</span>
              <h3 className="font-display font-bold text-stone-800 text-lg mt-4 mb-2">No products found</h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
                We couldn't find any items matching your current filters. Try resetting search parameters.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/10 cursor-pointer hover:scale-105 active:scale-95"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* PAGINATION PANEL */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-2xl border border-stone-100 p-4 mb-6 gap-4 shadow-xs">
                {/* Total Item Count and Page Size Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-stone-500 font-medium">
                    Showing <span className="text-stone-700 font-bold">{paginatedProducts.length}</span> of{' '}
                    <span className="text-stone-700 font-bold">{totalItems}</span> items
                  </span>
                  
                  {/* Items per page selector */}
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs text-stone-400">Show:</span>
                    <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      className="bg-stone-50 border border-stone-200 text-xs font-semibold px-2 py-1 rounded-lg outline-none cursor-pointer hover:bg-stone-100 transition-colors"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>

                {/* Page Navigation Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      page === 1
                        ? 'bg-stone-50 text-stone-300 cursor-not-allowed'
                        : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-750 hover:scale-105'
                    }`}
                  >
                    Previous
                  </button>

                  <span className="text-xs text-stone-500 font-semibold px-2">
                    Page <span className="text-stone-800 font-bold">{page}</span> of{' '}
                    <span className="text-stone-800 font-bold">{totalPages}</span>
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      page === totalPages
                        ? 'bg-stone-50 text-stone-300 cursor-not-allowed'
                        : 'bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-750 hover:scale-105'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* PRODUCTS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS SIDEBAR OVERLAY */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={() => setShowMobileFilters(false)} 
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs"
          />

          {/* Drawer body */}
          <div className="relative w-80 max-w-xs bg-white h-full flex flex-col p-6 shadow-2xl animate-slide-in ml-auto z-10">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <span className="font-display font-bold text-stone-800 flex items-center gap-2">
                <SlidersHorizontal className="h-4.5 w-4.5 text-emerald-600" />
                Filters
              </span>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-600 transition-all cursor-pointer hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Category</h3>
              <div className="space-y-2">
                {['All', 'Fruits', 'Vegetables'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setShowMobileFilters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer hover:bg-stone-50 ${
                      category === cat
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: '-createdAt', label: 'Newest First' },
                  { value: 'price', label: 'Price: Low to High' },
                  { value: '-price', label: 'Price: High to Low' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => { setSort(option.value); setShowMobileFilters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer hover:bg-stone-50 ${
                      sort === option.value
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All Trigger */}
            <button
              onClick={() => { handleClearFilters(); setShowMobileFilters(false); }}
              className="mt-auto w-full py-3 bg-stone-150 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-all cursor-pointer hover:text-emerald-700 hover:bg-emerald-50"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
