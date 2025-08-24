import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductGallery = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Thumbnails */}
      <div className="w-full lg:w-24 flex-shrink-0 lg:space-y-4 flex lg:block gap-4 overflow-x-auto">
        {images.map((image, index) => (
          <motion.div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`min-w-[72px] lg:min-w-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              index === currentImageIndex
                ? 'border-dwapor-amber'
                : 'border-transparent hover:border-dwapor-gold'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image}
              alt={`${productName} ${index + 1}`}
              className="w-full h-20 lg:h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-grow">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[60vh] md:h-[70vh] rounded-lg overflow-hidden border border-dwapor-soft-gray/20"
        >
          <img
            src={images[currentImageIndex]}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductGallery;
