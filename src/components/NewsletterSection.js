import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-30 bg-dwapor-warm-brown">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-8">
            <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest">
              Newsletter
            </div>
            
            <h2 className="font-serif text-display text-dwapor-amber font-light">
              Get Dwapor in your inbox
            </h2>
            
            <p className="font-sans text-dwapor-beige text-lg max-w-2xl mx-auto">
              — quietly curated —
            </p>
            
            <p className="font-sans text-dwapor-beige max-w-3xl mx-auto text-sm leading-relaxed">
              Receive updates on new collections, stories from our artisans, exclusive events, and the philosophy that shapes each carefully crafted piece.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-dwapor-museum border border-dwapor-gold/30 text-dwapor-amber px-6 py-4 font-sans placeholder-dwapor-beige/60 focus:outline-none focus:border-dwapor-gold transition-all duration-300"
                required
              />
              
              <motion.button
                type="submit"
                whileHover={{ 
                  backgroundColor: '#c19a6b',
                  color: '#0a0a0a'
                }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitted}
                className="bg-transparent border-2 border-dwapor-gold text-dwapor-gold px-8 py-4 font-sans text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitted ? 'Thank You' : 'Subscribe'}
              </motion.button>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isSubmitted ? 1 : 0 }}
            className="font-sans text-dwapor-gold text-sm"
          >
            Welcome to the Dwapor community. You'll hear from us soon.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;