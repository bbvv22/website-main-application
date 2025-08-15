import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
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
          Frequently Asked Questions
        </motion.h1>
        <motion.div variants={itemVariants} className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></motion.div>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          How can I check my order information?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          To view the details of your purchase, log in to your account on dwapor.com and visit the "My Orders" section. There, you’ll find your current and past orders with all the necessary information.
          <br />
          Right after you place your order, we’ll also send you a confirmation to your registered email and WhatsApp number so you can keep it handy.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Can I update my shipping address after I’ve ordered?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          If your order hasn’t been dispatched yet, we can update your delivery address for you. Once it has left our warehouse, we can’t make changes to the address.
          <br />
          Switching to an international address from an Indian one may involve extra delivery charges. If you move from an international address to a domestic one, we’ll refund any difference in shipping costs to your original payment method. Please get in touch with us quickly at support@dwapor.com if you need to make changes.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Why does the print look slightly different or uneven?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Our clothing is handcrafted by skilled artisans in small batches, not mass-produced. This human touch means each piece may have subtle variations in its print — these aren’t flaws, but marks of authenticity and craftsmanship that make your item truly unique.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Why is the colour not exactly like the pictures?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We photograph our products in lighting conditions that aim to match the actual item as closely as possible. Even so, slight differences can happen due to screen settings, lighting, and the limitations of cameras. Since our garments are handmade in batches, small shade variations are natural.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          When will I receive my tracking link?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          As soon as your order ships from our warehouse, we’ll send your tracking information to you via email, SMS, or WhatsApp. If you can’t find the email, don’t forget to check your spam or junk folder.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Do you arrange reverse pickups for returns?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We do offer reverse pickups for most returns within India, provided the item meets our return conditions. However, in some areas where reverse pickup is not possible, you’ll need to send the product back yourself.
          <br />
          For orders shipped outside India, reverse pickup is not available — customers will need to arrange and cover the return shipping.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Can I cancel my order?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Yes — as long as the order has not yet been shipped, you can request a cancellation by contacting our team. Once the parcel is dispatched, cancellations cannot be processed.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          How long does delivery take?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Delivery times vary by product and location. Clothing items usually arrive within 3 to 15 working days, not counting weekends or public holidays. Each product page includes the estimated shipping time.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Do you ship overseas?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Yes, we deliver to several countries worldwide. International shipping costs and timelines will be displayed during checkout based on your location.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Do you provide gift wrapping?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We offer eco-friendly gift wrapping upon request. Simply select this option while placing your order at checkout.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          What kind of packaging do you use?
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          All our packaging is 100% paper-based — no plastic. It’s sturdy enough to protect your order and kind to the planet.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FAQ;
