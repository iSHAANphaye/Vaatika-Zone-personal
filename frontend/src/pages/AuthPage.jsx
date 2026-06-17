import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, ShieldCheck, Leaf } from 'lucide-react';

export default function AuthPage({ onAuthSuccess }) {
  const { login, register, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      onAuthSuccess(); // Redirect back to previous page
    } catch (err) {
      setFormError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
      <div className="bg-white rounded-3xl border border-stone-100 shadow-lg p-8">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Leaf className="h-6 w-6" />
          </div>
          <h2 className="font-display font-extrabold text-stone-900 text-2xl">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-stone-400 text-xs mt-1">
            {isLogin ? 'Log in to order fresh fruits and vegetables' : 'Register to start shopping in Chhattisgarh'}
          </p>
        </div>

        {/* Global Error Display */}
        {(formError || error) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center space-x-2 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formError || error}</span>
          </div>
        )}

        {/* Forms */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all outline-none"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. aarav.sharma@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Password</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold py-3 shadow-md shadow-emerald-600/10 hover:shadow-lg hover:scale-102 active:scale-98 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle between Register/Login */}
        <div className="text-center mt-6 pt-6 border-t border-stone-100">
          <p className="text-xs text-stone-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setFormError(null); }}
              className="text-emerald-700 font-bold hover:text-emerald-500 hover:underline cursor-pointer transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
