import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-white/95 text-dwapor-museum shadow-xl rounded-lg px-6 py-4 border border-dwapor-soft-gray/20"
    >
      <p className="text-sm font-sans text-gray-800">{message}</p>
    </motion.div>
  );
};

export default Notification;