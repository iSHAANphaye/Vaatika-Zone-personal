import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, LogOut, MapPin, Leaf } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand Name */}
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center space-x-2 cursor-pointer group hover:scale-102 transition-transform duration-200"
          >
            <div className="bg-emerald-600 text-white p-2 rounded-xl group-hover:bg-emerald-500 transition-colors">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-emerald-950">
              Vaatika <span className="text-emerald-600">Zone</span>
            </span>
          </div>

          {/* Chhattisgarh Serving Area Badge */}
          <div className="hidden md:flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium border border-emerald-100">
            <MapPin className="h-3.5 w-3.5 text-emerald-600 animate-bounce" />
            <span>Serving Raipur, Bhilai & Durg</span>
          </div>

          {/* Action Navigation Items */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer hover:scale-105 hover:bg-emerald-50/50 active:scale-95 ${
                currentTab === 'home'
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-100 font-semibold'
                  : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentTab('shop')}
              className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all cursor-pointer hover:scale-105 hover:bg-emerald-50/50 active:scale-95 ${
                currentTab === 'shop' || currentTab === 'detail'
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-100 font-semibold'
                  : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              Shop
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setCurrentTab('cart')}
              className={`relative p-2.5 rounded-xl transition-all cursor-pointer hover:scale-110 hover:bg-emerald-50/50 active:scale-95 ${
                currentTab === 'cart'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                  : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-50'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Authentication Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-emerald-100">
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-stone-400">Welcome,</p>
                  <p className="text-xs font-semibold text-stone-700">{user?.name}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 p-2 rounded-xl text-stone-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer hover:scale-110 active:scale-95"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('auth')}
                className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium shadow-md shadow-emerald-600/10 hover:shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
