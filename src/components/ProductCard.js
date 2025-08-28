import React from 'react'; // Removed useState
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { FiHeart } from 'react-icons/fi';

const ProductCard = ({ product, featured = false, showDescription = true, showPrice = true }) => {
  // Removed currentImageIndex state
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wished = isInWishlist(product.id);

  // Removed handleImageChange function

  const discount = product.discount_percent;

  return (
    <motion.div
      className="group relative overflow-hidden flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full aspect-w-1 aspect-h-1 overflow-hidden">
        <img
          src={product.image} // Changed from product.images[currentImageIndex]
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-75"
        />

        {/* Removed product.images.length > 1 conditional rendering block */}

        
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        {showDescription && <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>}
        
        {showPrice && <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
            {product.is_on_sale && <p className="text-lg text-gray-500 line-through">₹{product.original_price.toLocaleString()}</p>}
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
        </div>}
      </div>
    </motion.div>
  );
};

export default ProductCard;
