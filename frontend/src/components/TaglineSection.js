import React from 'react';
import { motion } from 'framer-motion';

const TaglineSection = () => {

  const scrollToProducts = () => {
    const productsSection = document.getElementById('product-carousel-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-white text-black min-h-[calc(100vh-5rem)] flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        <p className="text-sm md:text-base text-gray-500 tracking-widest mb-4">
          March 25 — Present
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-black mb-6">
          Who better than you
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-800">
          Minimal cuts. Honest fabrics. For the soft rebel who whispers power through timeless elegance.
        </p>
      </motion.div>

      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToProducts}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default TaglineSection;
