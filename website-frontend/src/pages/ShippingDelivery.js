import React from 'react';
import { motion } from 'framer-motion';

const ShippingDelivery = () => {
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
    hidden: { y: 20, opacity: 0 },
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
    <div className="min-h-screen bg-dwapor-museum pt-48 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="font-serif text-display text-dwapor-amber font-light mb-10 tracking-tight text-center"
          variants={itemVariants}
        >
          Shipping & Delivery Policy
        </motion.h1>
        <motion.div variants={itemVariants} className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></motion.div>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We aim to ensure that your order reaches you safely and on time. Below is everything you need to know about our shipping process.
        </motion.p>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          At Dwapor, we work to ensure every order reaches you promptly and in perfect condition. Delivery timelines can vary depending on the product, and for clothing items, dispatch usually takes anywhere from three to fifteen working days. The exact timeframe for each product is mentioned in its description. Please note that working days are Monday to Friday, so weekends are not included in the timeline. Once your order is on its way, we will share tracking details through your registered email. We strongly advise refusing any parcel that appears damaged or tampered with, as we cannot take responsibility for such packages once accepted.
        </motion.p>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          For exchanges within India, we do provide a reverse pickup service for items that qualify. However, there may be certain addresses where this facility is unavailable, in which case we may request you to send the product back to us at your own expense and responsibility. Tracking information will also be sent to you via WhatsApp as soon as your shipment is dispatched from our warehouse.
        </motion.p>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          At present, we offer free shipping on all orders, and in line with our commitment to sustainability, every package is sent in eco-friendly paper-based packaging without the use of plastic.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ShippingDelivery;
