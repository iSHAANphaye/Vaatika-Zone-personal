import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const currentUserId = user?._id || 'anonymous';
  const [loadedUserId, setLoadedUserId] = useState(null);

  // Load and merge cart items on user change
  useEffect(() => {
    const userKey = currentUserId === 'anonymous' ? 'cart_anonymous' : `cart_user_${currentUserId}`;
    let loadedCart = [];

    // Load current user's cart
    const storedUserCart = localStorage.getItem(userKey);
    if (storedUserCart) {
      try {
        loadedCart = JSON.parse(storedUserCart);
      } catch (e) {
        console.error('Failed to parse user cart storage:', e);
      }
    }

    // If logging in, merge guest cart into user cart
    if (currentUserId !== 'anonymous') {
      const storedGuestCart = localStorage.getItem('cart_anonymous');
      if (storedGuestCart) {
        try {
          const guestCart = JSON.parse(storedGuestCart);
          if (guestCart && guestCart.length > 0) {
            // Merge guest cart items into loadedCart
            guestCart.forEach((guestItem) => {
              const existingIndex = loadedCart.findIndex(
                (item) => item.product._id === guestItem.product._id
              );
              if (existingIndex > -1) {
                const newQty = loadedCart[existingIndex].quantity + guestItem.quantity;
                const stockLimit = guestItem.product.stockCount ?? 999;
                loadedCart[existingIndex].quantity = Math.min(newQty, stockLimit);
              } else {
                loadedCart.push(guestItem);
              }
            });
            // Clear the guest cart from localStorage
            localStorage.removeItem('cart_anonymous');
          }
        } catch (e) {
          console.error('Failed to parse guest cart storage during merge:', e);
        }
      }
    }

    setCart(loadedCart);
    setLoadedUserId(currentUserId);
  }, [currentUserId]);

  // Save cart items to localStorage on cart change, but only if loaded matches current
  useEffect(() => {
    if (loadedUserId === currentUserId) {
      const userKey = currentUserId === 'anonymous' ? 'cart_anonymous' : `cart_user_${currentUserId}`;
      localStorage.setItem(userKey, JSON.stringify(cart));
    }
  }, [cart, currentUserId, loadedUserId]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product._id === product._id);

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const newCart = [...prevCart];
        const newQty = newCart[existingItemIndex].quantity + quantity;
        
        // Prevent exceeding stock limit if product stock count is known
        const availableStock = product.stockCount ?? 999;
        newCart[existingItemIndex].quantity = Math.min(newQty, availableStock);
        
        return newCart;
      } else {
        // Item is new to cart
        return [...prevCart, { product, quantity: Math.min(quantity, product.stockCount ?? 999) }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stockCount ?? 999) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Helper derived values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
