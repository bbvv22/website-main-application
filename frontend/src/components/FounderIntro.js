import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FounderIntro = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-30 bg-dwapor-museum"
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest mb-8">
            Meet the Founder
          </div>
          <h2 className="font-serif text-display text-dwapor-amber font-light">
            Where Passion Meets Purpose
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 items-center justify-items-center">
          {/* Founder's image removed as per request */}
          <motion.div variants={itemVariants} className="lg:order-2">
            {/* Image section removed */}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8 flex flex-col items-center w-full">
            <div>
              <h3 className="font-serif text-xl text-dwapor-amber mb-4">Keerthi Rao</h3>
              <p className="font-sans text-dwapor-soft-gray text-sm uppercase tracking-widest mb-6">FOUNDER & CREATIVE DIRECTOR</p>
              <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-6 max-w-prose mx-auto">
                Keerthi embodies the spirit of fearless femininity—a 24-year-old visionary who traded the courtroom for the cutting room, choosing passion over predictability.
                With a law degree in hand but fashion in her heart, she embarked on an extraordinary journey to revolutionize how women experience ethnic wear, creating pieces that honor tradition while serving contemporary sensibilities...
              </p>
            </div>

            <div className="border-l-2 border-dwapor-gold mx-auto max-w-prose">
              <blockquote className="font-serif text-xl text-dwapor-amber italic leading-relaxed mb-4">
                "I realized that law taught me to advocate for others, but fashion allow's me to empower them."
              </blockquote>
              <cite className="font-sans text-dwapor-soft-gray text-sm block">— Keerthi Rao</cite>
            </div>

            <Link to="/about" className="mx-auto block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-3 bg-dwapor-gold text-dwapor-museum font-sans text-sm uppercase tracking-widest shadow-lg hover:bg-dwapor-amber transition-colors duration-300"
              >
                Read Full Story
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="text-center mt-20">
          <div className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></div>
          <p className="font-sans text-dwapor-soft-gray text-sm tracking-wider max-w-2xl mx-auto">
            We're not just creating clothes; we're curating experiences—transforming everyday moments into celebrations of feminine grace and cultural pride. Because when a woman feels beautiful in what she wears, she carries herself differently, and that confidence becomes her greatest accessory.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FounderIntro;
