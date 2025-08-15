import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = "", size = "default", showText = true }) => {
  const sizeClasses = {
    small: {
      container: "flex items-center",
      ornament: "w-12 h-16 mt-6",
      text: "text-xl -ml-2"
    },
    default: {
      container: "flex items-center",
      ornament: "w-20 h-24 mt-8",
      text: "text-3xl -ml-3"
    },
    large: {
      container: "flex items-center",
      ornament: "w-24 h-30 mt-10",
      text: "text-5xl -ml-4"
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`${currentSize.container} ${className}`}
    >
      {/* YOUR EXACT ORNAMENTAL EARRING - POSITIONED LOWER SO DWAPOR STARTS FROM MIDDLE */}
      <img 
        src="/dwapor-earring.png" 
        alt=""
        className={`${currentSize.ornament} object-contain`}
        style={{
          filter: 'brightness(1.05) contrast(1.05) saturate(1.1)'
        }}
      />
      
      {/* DWAPOR Text - STARTS FROM MIDDLE OF ORNAMENT POSITION */}
      {showText && (
        <div className={`font-serif ${currentSize.text} font-light tracking-widest text-dwapor-amber`}>
          DWAPOR
        </div>
      )}
    </motion.div>
  );
};

export default Logo;