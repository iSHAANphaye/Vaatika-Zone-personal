import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useAuth();
  const currentUserId = user?._id || 'anonymous';
  const [loadedUserId, setLoadedUserId] = useState(null);
  const justLoadedRef = useRef(false);

  // Load and merge cart items on user change
  useEffect(() => {
    if (currentUserId === loadedUserId) {
      return;
    }

    const fetchUserCart = async () => {
      if (currentUserId === 'anonymous') {
        let loadedCart = [];
        const storedCart = localStorage.getItem('cart_anonymous');
        if (storedCart) {
          try {
            loadedCart = JSON.parse(storedCart);
          } catch (e) {
            console.error('Failed to parse anonymous cart storage:', e);
          }
        }
        setCart(loadedCart);
        setLoadedUserId('anonymous');
        justLoadedRef.current = true;
      } else {
        try {
          // Fetch user cart from database
          const res = await fetch('/api/cart', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch cart');
          }

          let loadedCart = data.data || [];

          // Check if guest cart needs to be merged
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

                // Save merged cart to the backend immediately
                const itemsToSave = loadedCart.map(item => ({
                  product: item.product._id,
                  quantity: item.quantity,
                }));
                await fetch('/api/cart', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                  body: JSON.stringify({ items: itemsToSave }),
                });

                // Clear guest cart from localStorage
                localStorage.removeItem('cart_anonymous');
              }
            } catch (e) {
              console.error('Failed to merge guest cart:', e);
            }
          }

          setCart(loadedCart);
          setLoadedUserId(currentUserId);
          justLoadedRef.current = true;
        } catch (err) {
          console.error('Failed to load user cart:', err);
          // Fallback to empty if error loading from backend
          setCart([]);
          setLoadedUserId(currentUserId);
          justLoadedRef.current = true;
        }
      }
    };

    fetchUserCart();
  }, [currentUserId, loadedUserId, token]);

  // Save cart items on cart change, but only if loaded matches current
  useEffect(() => {
    if (loadedUserId !== currentUserId) {
      return;
    }
    if (justLoadedRef.current) {
      justLoadedRef.current = false;
      return;
    }

    if (currentUserId === 'anonymous') {
      localStorage.setItem('cart_anonymous', JSON.stringify(cart));
    } else if (token) {
      const saveUserCart = async () => {
        try {
          const itemsToSave = cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          }));
          await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ items: itemsToSave }),
          });
        } catch (err) {
          console.error('Failed to save cart to backend:', err);
        }
      };
      saveUserCart();
    }
  }, [cart, currentUserId, loadedUserId, token]);

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
