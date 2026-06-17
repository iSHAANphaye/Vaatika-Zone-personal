import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, AlertCircle, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';

export default function CartCheckoutPage({ onShopClick, onAuthRedirect }) {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { token, isAuthenticated } = useAuth();

  // Order submission states
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [error, setError] = useState(null);

  // Chhattisgarh scoped shipping form state
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Raipur'); // Default city
  const [postalCode, setPostalCode] = useState('');
  const [state] = useState('Chhattisgarh'); // Locked state
  const [country] = useState('India');      // Locked country

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onAuthRedirect();
      return;
    }

    if (!street || !postalCode) {
      setError('Please fill in all address fields.');
      return;
    }

    setLoading(true);
    setError(null);

    // Prepare payload
    const orderedItems = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const shippingAddress = {
      street,
      city,
      state,
      postalCode,
      country,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ orderedItems, shippingAddress }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      setSuccessOrder(data.data.order);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (successOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-8 sm:p-12">
          <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-10 w-10" />
          </div>
          
          <h2 className="font-display font-extrabold text-stone-900 text-2xl sm:text-3xl mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            Thank you for shopping with Vaatika Zone. Your fresh produce is being prepared for delivery.
          </p>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100 text-left space-y-3 mb-8">
            <div className="flex justify-between text-xs border-b border-stone-100 pb-2">
              <span className="text-stone-400">Order ID:</span>
              <span className="font-mono text-stone-700 font-semibold">{successOrder._id}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-stone-100 pb-2">
              <span className="text-stone-400">Shipping To:</span>
              <span className="text-stone-700 font-semibold">{successOrder.shippingAddress.city}, CG</span>
            </div>
            <div className="flex justify-between text-sm pt-1">
              <span className="text-stone-700 font-bold">Total Paid:</span>
              <span className="text-emerald-700 font-black">₹{successOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={onShopClick}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold py-3 transition-all shadow-md shadow-emerald-600/10 hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // EMPTY CART SCREEN
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="bg-white rounded-3xl border border-stone-100 p-10 shadow-xs">
          <div className="bg-stone-50 text-stone-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="font-display font-bold text-stone-850 text-lg mb-2">Your cart is empty</h2>
          <p className="text-sm text-stone-500 mb-8 max-w-xs mx-auto">
            Looks like you haven't added any fresh fruits or vegetables to your cart yet.
          </p>
          <button
            onClick={onShopClick}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold py-3 transition-all shadow-md shadow-emerald-600/10 hover:shadow-lg hover:scale-102 active:scale-98 cursor-pointer"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display font-extrabold text-stone-900 text-2xl sm:text-4xl mb-8">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Cart items list (8 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden p-6">
            <h2 className="font-display font-bold text-stone-800 text-lg mb-6 pb-3 border-b border-stone-100">
              Selected Items ({cart.length})
            </h2>

            <div className="divide-y divide-stone-100">
              {cart.map((item) => {
                const imageUrl = item.product.images && item.product.images.length > 0 && !item.product.images[0].includes('example.com')
                  ? item.product.images[0]
                  : 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?w=150&q=80';

                return (
                  <div key={item.product._id} className="py-4 flex gap-4 items-center">
                    {/* Thumbnail */}
                    <img
                      src={imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-100 bg-stone-50"
                    />

                    {/* Name & price */}
                    <div className="flex-grow">
                      <h4 className="font-display font-bold text-stone-800 text-sm leading-tight line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5">{item.product.category}</p>
                      <p className="text-emerald-800 text-xs font-semibold mt-1">₹{item.product.price} / pack</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden h-9 bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="w-8 h-full hover:bg-emerald-50 hover:text-emerald-700 text-stone-600 text-xs font-bold transition-colors cursor-pointer active:bg-emerald-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-8 h-full hover:bg-emerald-50 hover:text-emerald-700 text-stone-600 text-xs font-bold transition-colors cursor-pointer active:bg-emerald-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right pl-2 shrink-0">
                      <span className="text-sm font-display font-extrabold text-stone-800 block">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-stone-400 hover:text-red-650 mt-1 transition-all cursor-pointer hover:scale-115 active:scale-90 inline-block"
                      >
                        <Trash2 className="h-4 w-4 inline" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Checkout Billing/Shipping Form (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-display font-bold text-stone-800 text-lg mb-4 pb-3 border-b border-stone-100">
              Delivery Details
            </h2>

            {/* Error alerts */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center space-x-2 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 mb-6 space-y-2.5">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Cart Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Delivery (Raipur/Bhilai/Durg)</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-emerald-100/50">
                <span className="font-bold text-emerald-950">Total Bill</span>
                <span className="text-lg font-display font-black text-emerald-900">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Address Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                  Delivery Address (Street / Landmark)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 304, Shankar Nagar, Near Link Road"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all outline-none cursor-pointer hover:bg-stone-100"
                  >
                    <option value="Raipur">Raipur</option>
                    <option value="Bhilai">Bhilai</option>
                    <option value="Durg">Durg</option>
                    <option value="Bilaspur">Bilaspur</option>
                    <option value="Rajnandgaon">Rajnandgaon</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">PIN Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 492001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400/50 uppercase tracking-wider block">State</label>
                  <input
                    type="text"
                    disabled
                    value={state}
                    className="w-full bg-stone-100 text-stone-400 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-medium cursor-not-allowed outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400/50 uppercase tracking-wider block">Country</label>
                  <input
                    type="text"
                    disabled
                    value={country}
                    className="w-full bg-stone-100 text-stone-400 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs font-medium cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              {/* Scope notice */}
              <div className="flex items-center space-x-2 text-[10px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Locked to Chhattisgarh region for fresh daily shipping.</span>
              </div>

              {/* Submit CTA */}
              {isAuthenticated ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold py-3 shadow-md shadow-emerald-600/10 hover:shadow-lg hover:scale-102 active:scale-98 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Processing Order...' : 'Confirm & Place Order'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onAuthRedirect}
                  className="w-full bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold py-3 shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  Login to Complete Checkout
                </button>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
