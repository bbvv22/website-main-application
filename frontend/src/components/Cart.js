import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleClose}
          />
          
          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-dwapor-museum z-50 shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dwapor-soft-gray/20">
                <h2 className="font-serif text-2xl text-dwapor-amber">
                  Shopping Cart ({getCartItemsCount()})
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-dwapor-soft-gray/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-dwapor-soft-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.items.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-dwapor-soft-gray/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-dwapor-soft-gray text-lg mb-4">Your cart is empty</p>
                    <Link
                      to="/collections"
                      onClick={handleClose}
                      className="inline-block bg-dwapor-amber text-dwapor-museum px-6 py-2 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors"
                    >
                      Continue Shopping
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={handleClose}
                      className="inline-block mt-4 bg-transparent border border-dwapor-amber text-dwapor-amber px-6 py-2 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors"
                    >
                      View Wishlist
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-4 p-4 border border-dwapor-soft-gray/20 rounded-lg"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-serif text-dwapor-amber text-sm">
                            {item.product.name}
                          </h3>
                          <p className="text-dwapor-soft-gray text-xs">
                            Size: {item.size} | Color: {item.color}
                          </p>
                          <p className="text-dwapor-gold text-sm font-medium">
                            ₹{item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-dwapor-soft-gray text-dwapor-soft-gray hover:border-dwapor-amber hover:text-dwapor-amber transition-all text-sm"
                          >
                            -
                          </button>
                          <span className="text-dwapor-amber text-sm w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-dwapor-soft-gray text-dwapor-soft-gray hover:border-dwapor-amber hover:text-dwapor-amber transition-all text-sm"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-dwapor-soft-gray hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.items.length > 0 && (
                <div className="p-6 border-t border-dwapor-soft-gray/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl text-dwapor-amber">Total:</span>
                    <span className="font-serif text-xl text-dwapor-gold">₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  {isAuthenticated ? (
                    <Link
                      to="/checkout"
                      onClick={handleClose}
                      className="block w-full bg-dwapor-amber text-dwapor-museum text-center py-3 px-6 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/checkout"
                        onClick={handleClose}
                        className="block w-full bg-dwapor-amber text-dwapor-museum text-center py-3 px-6 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors"
                      >
                        Checkout as Guest
                      </Link>
                      <div className="text-center">
                        <Link to="/login" onClick={handleClose} className="text-dwapor-soft-gray text-sm hover:text-dwapor-amber">
                          or Sign In
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  <Link
                    to="/collections"
                    onClick={handleClose}
                    className="block w-full border border-dwapor-amber text-dwapor-amber text-center py-2 px-6 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={handleClose}
                    className="block w-full border border-dwapor-amber text-dwapor-amber text-center py-2 px-6 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors"
                  >
                    View Wishlist
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;