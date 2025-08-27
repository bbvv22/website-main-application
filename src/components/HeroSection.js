import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HeroSection = () => {
  const [featured, setFeatured] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        setFeatured(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(id);
  }, [featured.length]);

  if (loading) return <div className="hero-loading">Loading...</div>;
  if (featured.length === 0) return <div>No products available</div>;

  const product = featured[index];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dwapor-museum">
      {/* Clean Black Background with Subtle Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dwapor-museum" />
        <div className="absolute inset-0 bg-gradient-to-r from-dwapor-museum via-dwapor-espresso/30 to-dwapor-museum" />
      </div>

      {/* Content: single featured product */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Large product image (50-60% viewport) */}
          <motion.div
            key={`image-${product.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative w-full h-[50vh] md:h-[60vh] rounded-xl overflow-hidden border border-dwapor-soft-gray/20">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Minimal copy and CTA */}
          <motion.div
            key={`copy-${product.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="text-dwapor-gold font-sans text-xs uppercase tracking-[0.2em] mb-8">Limited Collection</div>
            <h1 className="font-serif text-5xl md:text-6xl font-light text-dwapor-amber mb-8 leading-tight">
              {product.name}
            </h1>
            <p className="font-sans text-dwapor-beige text-lg leading-relaxed max-w-md mb-10">
              {product.short_description}
            </p>
            <div className="flex space-x-4">
              <Link to={`/product/${product.id}`} className="bg-dwapor-amber text-dwapor-museum px-8 py-4 font-sans text-sm uppercase tracking-widest hover:bg-dwapor-gold transition-colors">
                Shop Now
              </Link>
              <Link to="/collections" className="border border-dwapor-amber text-dwapor-amber px-8 py-4 font-sans text-sm uppercase tracking-widest hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors">
                Explore Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side Text */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
      >
        <div className="text-dwapor-beige font-sans text-xs uppercase tracking-widest transform rotate-90 origin-center">
          HYDERABAD
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-dwapor-gold"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
