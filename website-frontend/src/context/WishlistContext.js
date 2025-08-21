import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // TODO: For a production application, the wishlist should be integrated with the backend
  // to persist across user sessions and devices, and be associated with a user account.
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('dwapor-wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dwapor-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist; // Item already in wishlist
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const value = { 
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistItemsCount: () => wishlist.length 
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};