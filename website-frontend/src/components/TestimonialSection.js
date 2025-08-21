import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Dwapor isn't just clothing—it's poetry you wear. Each piece tells a story of strength wrapped in softness.",
      author: "Priya Sharma",
      title: "Creative Director",
      location: "Mumbai"
    },
    {
      quote: "I've never felt more confident. These pieces speak to my soul and honor both tradition and modernity.",
      author: "Ananya Mehta",
      title: "Architect",
      location: "Delhi"
    },
    {
      quote: "The craftsmanship is extraordinary. You can feel the love and intention in every stitch.",
      author: "Kavya Reddy",
      title: "Writer",
      location: "Bangalore"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-30 bg-dwapor-museum">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest mb-8">
            Testimonials
          </div>
          <h2 className="font-serif text-display text-dwapor-amber font-light">
            Voices of Our Community
          </h2>
        </motion.div>

        <div className="relative h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-4xl"
            >
              <blockquote className="font-serif text-2xl md:text-3xl font-light text-dwapor-amber mb-12 leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="space-y-2">
                <p className="font-sans text-dwapor-gold font-medium text-lg uppercase tracking-widest">
                  {testimonials[currentIndex].author}
                </p>
                <p className="font-sans text-dwapor-beige text-sm">
                  {testimonials[currentIndex].title}, {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-4 mt-12">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 border transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-dwapor-gold border-dwapor-gold' 
                  : 'bg-transparent border-dwapor-beige hover:border-dwapor-gold'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;