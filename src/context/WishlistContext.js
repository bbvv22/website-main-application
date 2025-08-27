import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function syncWishlist() {
      if (user) {
        setLoading(true); // Set loading to true before fetching
        try {
          const { data: backendWishlist } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/wishlist/${user.id}`);
          setWishlistItems(backendWishlist);
        } catch (error) {
          console.error('Error loading wishlist from backend:', error);
          // Handle error state if needed
        } finally {
          setLoading(false); // Set loading to false after fetching (success or error)
        }
      } else {
        // User is not logged in, use local storage
        const savedWishlist = localStorage.getItem('dwapor_wishlist');
        setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
      }
    };
    syncWishlist();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('dwapor_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const addToWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      return;
    }

    if (user) {
      const { data: newWishlistItem } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/wishlist/${user.id}`, { productId: product.id });
      setWishlistItems(prevItems => [...prevItems, { ...newWishlistItem, Product: product }]);
    } else {
      setWishlistItems(prevItems => {
        if (prevItems.some(item => item.id === product.id)) {
          return prevItems; // Already in wishlist
        }
        return [...prevItems, product];
      });
    }
  };

  const removeFromWishlist = async (productId) => {
    if (user) {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/wishlist/${user.id}/${productId}`);
      setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
    } else {
      setWishlistItems(prevItems =>
        prevItems.filter(item => item.id !== productId)
      );
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item.productId || item.id) === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const contextValue = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};