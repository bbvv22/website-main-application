import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Collections = () => {
  const [activeFilter, setActiveFilter] = useState('tops');

  const categories = [
    { id: 'all', name: 'All' },
  ];

  const filteredProducts = products;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-dwapor-museum pt-24 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Collections Header */}
        <motion.div
          className="text-center mb-16 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl font-light text-dwapor-amber mb-10 tracking-tight">
            Our Collections
          </h1>
          <div className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></div>
          <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed max-w-3xl mx-auto">
            Discover our carefully curated collection of luxury fashion pieces, each telling a story of 
            heritage craftsmanship and contemporary elegance. Every piece is designed for the discerning 
            individual who appreciates timeless beauty.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 font-sans text-sm tracking-wider transition-all duration-300 ${
                activeFilter === category.id
                  ? 'text-dwapor-amber border-b border-dwapor-amber'
                  : 'text-dwapor-soft-gray hover:text-dwapor-amber'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid - clean cards with info below */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="overflow-hidden rounded-lg bg-dwapor-museum h-96">
                  <img 
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-serif text-2xl text-dwapor-amber mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-dwapor-amber font-sans text-lg font-medium">
                      ₹{product.price}
                    </span>
                    <span className="text-dwapor-soft-gray text-xs tracking-wider">
                      {product.features.split(' • ')[0]}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Collections Footer */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></div>
          <p className="font-sans text-dwapor-soft-gray text-sm tracking-wider">
            Each piece represents our commitment to sustainable luxury and timeless elegance
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Collections;