import React from 'react';
import { motion } from 'framer-motion';

const FounderIntro = () => {
  return (
    <section className="py-20 bg-dwapor-museum border-t border-dwapor-gold/20">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest mb-8">
            Meet the Founder
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-dwapor-amber font-light">
            Where Passion Meets Purpose
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-serif text-2xl text-dwapor-amber">
              Keerthi Rao
            </h3>
            <div className="text-dwapor-gold font-sans text-sm uppercase tracking-wider mb-4">
              Founder & Creative Director
            </div>
            <p className="font-sans text-dwapor-soft-gray leading-relaxed">
              <span className="text-dwapor-amber font-medium">Keerthi embodies the spirit of fearless femininity</span>—a 24-year-old visionary who traded the courtroom for the cutting room, choosing passion over predictability.
            </p>
            <p className="font-sans text-dwapor-soft-gray leading-relaxed text-sm">
              With a law degree in hand but fashion in her heart, she embarked on an extraordinary journey to revolutionize how women experience ethnic wear, creating pieces that honor tradition while serving contemporary sensibilities...
            </p>
            
            <div className="border-l-2 border-dwapor-gold pl-6">
              <blockquote className="font-serif text-lg text-dwapor-amber italic leading-relaxed mb-3">
                "I realized that law taught me to advocate for others, but fashion allows me to empower them."
              </blockquote>
              <cite className="font-sans text-dwapor-soft-gray text-sm">— Keerthi Rao</cite>
            </div>
            
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 text-dwapor-gold hover:text-dwapor-amber transition-colors font-sans text-sm uppercase tracking-widest"
            >
              <span>Read Full Story</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="/founder-new.jpg?v=2"
                alt="Keerthi Rao - Founder of DWAPOR"
                className="w-full h-[500px] object-cover rounded-lg"
              />
              <div className="absolute bottom-6 left-6 bg-dwapor-museum/90 backdrop-blur-sm px-4 py-3 rounded">
                <div className="text-dwapor-amber font-serif text-lg mb-1">Keerthi Rao</div>
                <div className="text-dwapor-gold font-sans text-sm tracking-wider">Visionary & Founder</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderIntro;