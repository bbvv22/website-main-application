import React from 'react';
import { motion } from 'framer-motion';

const QuoteSection = () => {
  return (
    <section className="py-30 bg-dwapor-espresso">
      <div className="max-w-5xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest">
              EN
            </div>
            
            <h2 className="font-serif text-display text-dwapor-amber font-light leading-tight">
              About Dwapor
            </h2>
            
            <div className="space-y-6">
              <p className="font-sans text-dwapor-beige leading-relaxed text-sm">
                Minimal cuts. Honest fabrics. For the soft rebel who whispers power through timeless elegance.
              </p>
            </div>

            <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest">
              March<br />2021
            </div>
          </motion.div>

          {/* Right - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516566170855-0bd76bd95250"
                alt="Behind the scenes"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="aspect-[3/4] overflow-hidden ml-12">
              <img
                src="https://images.pexels.com/photos/7871185/pexels-photo-7871185.jpeg"
                alt="Exhibition space"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;