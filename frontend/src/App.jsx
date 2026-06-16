import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartCheckoutPage from './pages/CartCheckoutPage';
import AuthPage from './pages/AuthPage';

function AppContent() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [previousTab, setPreviousTab] = useState('home');

  const navigateToAuth = () => {
    setPreviousTab(currentTab);
    setCurrentTab('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentTab(previousTab);
  };

  const handleViewProductDetails = (id) => {
    setSelectedProductId(id);
    setCurrentTab('detail');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomePage onShopClick={() => setCurrentTab('shop')} />
        )}

        {currentTab === 'shop' && (
          <ProductListingPage onViewDetails={handleViewProductDetails} />
        )}
        
        {currentTab === 'detail' && (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => setCurrentTab('shop')}
          />
        )}
        
        {currentTab === 'cart' && (
          <CartCheckoutPage
            onShopClick={() => setCurrentTab('shop')}
            onAuthRedirect={navigateToAuth}
          />
        )}
        
        {currentTab === 'auth' && (
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-850 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:items-center">
          <p className="text-xs">
            &copy; 2026 Vaatika Zone. Sourced locally in Chhattisgarh. All rights reserved.
          </p>
          <p className="text-[10px] text-stone-500 mt-2 sm:mt-0">
            Powered by Mongoose Custom Indexes (category_1_price_1 & text indices)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
