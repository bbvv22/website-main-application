import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
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
          Terms of Service
        </motion.h1>
        <motion.div variants={itemVariants} className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></motion.div>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Last Updated: [Insert Date]
        </motion.p>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Welcome to Dwapor. These Terms of Service (“Terms”) outline the rules and guidelines for using our website, browsing our collections, and purchasing our clothing products. By accessing our site or placing an order, you agree to follow these Terms.
        </motion.p>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We are dedicated to delivering high-quality, fashionable apparel and an enjoyable online shopping experience. Please read this document carefully before using our services.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          1. Eligibility to Use Our Services
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          You may use our website only if you are of legal age in your place of residence or have permission from a parent or legal guardian. Our products are sold strictly for personal, non-commercial use. Misuse, unauthorized resale, or violation of these Terms may result in account suspension or termination.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          2. Account Registration
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          To shop with us, you may be required to create a customer account. You agree to:
        </motion.p>
        <motion.ul className="list-disc list-inside font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8 pl-4"
          variants={itemVariants}
        >
          <li>Provide accurate, up-to-date information.</li>
          <li>Keep your login credentials confidential.</li>
          <li>Accept full responsibility for all actions under your account.</li>
        </motion.ul>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Dwapor reserves the right to suspend or terminate accounts that engage in fraudulent, abusive, or unauthorized activities.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          3. Product Information & Availability
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          We only sell clothing items.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          Product descriptions, sizing details, and images are displayed as accurately as possible, but variations in color or texture may occur due to screen settings or fabric dyeing processes.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Availability can change at any time, and we may limit purchase quantities to ensure fair access for all customers.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          4. Pricing & Payment
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          All prices are listed in Indian Rupees (INR) and include applicable taxes.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          Accepted payment methods:
        </motion.p>
        <motion.ul className="list-disc list-inside font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8 pl-4"
          variants={itemVariants}
        >
          <li>Credit/Debit Cards (Visa, MasterCard, etc.)</li>
          <li>UPI (Google Pay, PhonePe, etc.)</li>
          <li>Digital Wallets (Paytm, Mobikwik, etc.)</li>
          <li>Cash on Delivery (COD)</li>
        </motion.ul>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          Payments are processed securely using SSL encryption.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Prices may change without notice. If there is a pricing error, we will contact you before processing your order.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          5. Shipping & Delivery
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          We ship across India and select international destinations.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          Delivery timelines depend on your location and shipping method chosen.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          Once shipped, you’ll receive tracking details via email.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          While we aim for timely delivery, delays may occur due to courier issues or unforeseen events.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          6. Order Cancellation & Returns
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          <span className="font-medium">Cancellations:</span>
        </motion.p>
        <motion.ul className="list-disc list-inside font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4 pl-4"
          variants={itemVariants}
        >
          <li>Orders can be canceled only before dispatch.</li>
          <li>Once shipped, cancellations are not possible.</li>
        </motion.ul>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          <span className="font-medium">Returns & Exchanges:</span>
        </motion.p>
        <motion.ul className="list-disc list-inside font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8 pl-4"
          variants={itemVariants}
        >
          <li>We accept returns for damaged items, manufacturing defects, or size mismatches only.</li>
          <li>The product must be unused, in its original condition, with tags intact and original packaging.</li>
          <li>Return requests must be initiated within 7 days of delivery.</li>
          <li>We offer refunds or exchanges—no store credit.</li>
          <li>Customers cover return shipping unless a reverse pickup is available.</li>
          <li>Reverse pickup is not offered for international orders, and in rare domestic cases, it may be unavailable due to logistical issues.</li>
          <li>Refunds are processed only after a quality check confirms eligibility.</li>
        </motion.ul>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          7. Reviews & Feedback
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          We actively monitor and value your reviews to improve our products and service.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          Your feedback may be displayed on our website or social media.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We reserve the right to remove reviews that contain offensive, false, or misleading content.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          8. Privacy & Security
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          We collect and process your personal data in accordance with our Privacy Policy.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4"
          variants={itemVariants}
        >
          All payment details are encrypted for security.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          No online system can be guaranteed 100% secure, but we take all reasonable measures to protect your data.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          9. Third-Party Services
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Our site may link to third-party platforms (e.g., payment gateways, courier tracking sites). Dwapor is not responsible for their content, policies, or security. Please review their terms before using their services.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          10. Intellectual Property
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          All text, graphics, images, and branding on the Dwapor site are protected under copyright and trademark laws.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          You may not copy, reproduce, or use them without prior written consent.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          11. Limitation of Liability
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Dwapor will not be liable for indirect, incidental, or consequential damages arising from your use of our services or products.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Our maximum liability is limited to the amount you paid for the specific product in dispute.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          12. Governing Law & Dispute Resolution
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          These Terms are governed by the laws of India. Any disputes will be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with proceedings in Delhi, India, unless otherwise agreed.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          13. Updates to These Terms
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We may revise these Terms periodically. Updates will be posted on our website, and continued use of our services means you accept the changes.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          14. Contact Us
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          For any queries about these Terms, please contact:
          <br />
          Dwapor Customer Support
          <br />
          support@dwapor.com
        </motion.p>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
