import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';

const CollectionSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        setFeaturedProducts(response.data.slice(0, 4)); // Show first 4 products
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  if (loading) {
    return <div className="loading">Loading featured products...</div>;
  }

  return (
    <section className="py-30 bg-dwapor-museum">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest mb-8">
            Featured Collection
          </div>
          <h2 className="font-serif text-display text-dwapor-amber font-light mb-8">
            Signature Pieces
          </h2>
          <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed max-w-2xl mx-auto">
            Discover our most beloved creations, each piece carefully crafted to embody 
            timeless elegance and contemporary sophistication.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-16"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
            >
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} featured={index === 0} showDescription={false} showPrice={true} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Collection Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/collections"
              className="inline-flex items-center space-x-3 bg-transparent border border-dwapor-amber text-dwapor-amber px-8 py-4 font-sans text-sm uppercase tracking-widest hover:bg-dwapor-amber hover:text-dwapor-museum transition-all duration-300"
            >
              <span>View Full Collection</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
          
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="w-12 h-px bg-dwapor-gold"></div>
            <span className="text-dwapor-soft-gray font-sans text-xs tracking-wider">
              Luxury Products
            </span>
            <div className="w-12 h-px bg-dwapor-gold"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollectionSection;
