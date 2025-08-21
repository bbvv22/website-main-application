import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { FiHeart } from 'react-icons/fi';

const ProductCard = ({ product, featured = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wished = isInWishlist(product.id);

  const handleImageChange = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const discount = product.price && product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      className="group relative overflow-hidden flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); handleImageChange('prev'); }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-90"
            >
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); handleImageChange('next'); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-90"
            >
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.preventDefault(); setCurrentImageIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-dwapor-amber' : 'bg-white bg-opacity-60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-dwapor-amber text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.shortDescription}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            {product && product.discountedPrice &&
              <p className="text-2xl font-bold text-gray-900">₹{product.discountedPrice.toLocaleString()}</p>
            }
            {product.price && (
              <p className="text-lg text-gray-500 line-through">₹{product.price.toLocaleString()}</p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              wished ? removeFromWishlist(product.id) : addToWishlist(product);
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
              wished ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-red-100'
            }`}
          >
            <FiHeart className={`w-5 h-5 ${wished ? '' : 'group-hover:text-red-500'}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;