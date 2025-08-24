import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('dwapor_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        return Array.isArray(parsed) ? parsed.filter(item => item && item.id) : [];
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const { user, isAuthenticated } = useAuth();
  const wasAuthenticated = useRef(isAuthenticated);

  useEffect(() => {
    if (wasAuthenticated.current && !isAuthenticated) {
        // User has just logged out
        setCartItems([]);
        setDiscount(0);
        setCouponCode('');
        localStorage.removeItem('dwapor_cart');
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  const loadCartFromBackend = async (userId) => {
    try {
      setLoading(true);
      const { data: backendCart } = await axios.get(`http://localhost:8000/api/cart/${userId}`);
      setCartItems(backendCart);
    } catch (error) {
      console.error('Error loading cart from backend:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const syncCart = async () => {
      if (user && isAuthenticated) {
        const localCart = JSON.parse(localStorage.getItem('dwapor_cart') || '[]');
        await loadCartFromBackend(user.id);

        if(localCart.length > 0){
            const { data: backendCart } = await axios.get(`http://localhost:8000/api/cart/${user.id}`);
            const mergedCart = [...backendCart];
            localCart.forEach(localItem => {
              const backendItem = mergedCart.find(item => item.productId === localItem.productId && item.size === localItem.selectedSize && item.color === localItem.selectedColor);
              if (!backendItem) {
                mergedCart.push({
                  userId: user.id,
                  productId: localItem.id,
                  quantity: localItem.quantity,
                  size: localItem.selectedSize,
                  color: localItem.selectedColor,
                });
                axios.post(`http://localhost:8000/api/cart/${user.id}`, {
                  productId: localItem.id,
                  quantity: localItem.quantity,
                  size: localItem.selectedSize,
                  color: localItem.selectedColor,
                });
              }
            });
    
            setCartItems(mergedCart);
            localStorage.removeItem('dwapor_cart');
        }

      } else {
      }
    };
    syncCart();
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('dwapor_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, selectedSize, selectedColor, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }

    try {
      setLoading(true);
      
      if (isAuthenticated && user?.id) {
        const response = await axios.post(`http://localhost:8000/api/cart/${user.id}`, {
          productId: product.id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        });
  
        if (response.data) {
          await loadCartFromBackend(user.id);
        }
      } else {
        const cartId = `${product.id}-${selectedSize}-${selectedColor}`;
        
        setCartItems(prevItems => {
          const validItems = (prevItems || []).filter(item => item && item.id);
          const existingItem = validItems.find(item => item.cartId === cartId);
      
          if (existingItem) {
            return validItems.map(item =>
              item.cartId === cartId
                ? { ...item, quantity: (item.quantity || 0) + quantity }
                : item
            );
          } else {
            return [...validItems, {
              ...product,
              selectedSize: selectedSize || 'One Size',
              selectedColor: selectedColor || 'Default',
              quantity: quantity || 1,
              cartId,
              images: product.images || [product.image] || ['/placeholder.jpg']
            }];
          }
        });
      }
  
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartId) => {
    if (user) {
      await axios.delete(`http://localhost:8000/api/cart/${user.id}/${cartId}`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartId));
    } else {
      setCartItems(prevItems =>
        prevItems.filter(item => item.cartId !== cartId)
      );
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (user) {
      const { data: updatedCartItem } = await axios.put(`http://localhost:8000/api/cart/${user.id}/${cartId}`, { quantity: newQuantity });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === cartId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      if (newQuantity <= 0) {
        removeFromCart(cartId);
        return;
      }

      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      await axios.delete(`http://localhost:8000/api/cart/${user.id}`);
    }
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
        const price = parseFloat(item.product ? (item.product.discounted_price || item.product.price) : (item.discounted_price || item.price));
        return total + (price * (item.quantity || 0));
      }, 0);
  }

  const applyCoupon = (code) => {
    const total = getSubtotal();
    if (code === 'YAYY250' && total >= 2500) {
        setDiscount(250);
        setCouponCode(code);
        return { type: 'success', text: 'Coupon applied successfully!' };
    } else if (code === 'YAYY500' && total >= 5000) {
        setDiscount(500);
        setCouponCode(code);
        return { type: 'success', text: 'Coupon applied successfully!' };
    } else {
        setDiscount(0);
        setCouponCode('');
        return { type: 'error', text: 'Invalid coupon code or cart total not met.' };
    }
  };

  const getTotalPrice = () => {
    return getSubtotal() - discount;
  };

  const isInCart = (productId, selectedSize, selectedColor) => {
    return cartItems.some(
      item =>
        (item.productId || item.id) === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotalPrice,
    isInCart,
    loading,
    discount,
    couponCode,
    setCouponCode,
    applyCoupon
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};