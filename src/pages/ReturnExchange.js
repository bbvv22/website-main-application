import React from 'react';
import { motion } from 'framer-motion';

const ReturnExchange = () => {
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
          Return & Exchange Policy
        </motion.h1>
        <motion.div variants={itemVariants} className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></motion.div>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Return & Exchange Eligibility
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          At Dwapor, we accept returns or exchanges for clothing items that are defective, damaged, or do not fit correctly. To qualify, items must be unused, unwashed, undamaged, and in their original condition with all tags and labels attached. The product should also be returned in its original packaging along with the purchase receipt. Any item showing signs of wear, alterations, stains, or missing tags will not be accepted.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Return Window
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          All return or exchange requests must be made within 7 days of delivery. Requests submitted after this period cannot be processed, so we recommend contacting us as soon as possible if you encounter any issues.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          How to Initiate a Return or Exchange
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          To start the process, you can either contact our Customer Service team directly or visit your order page on our website and select the return or exchange option. Provide the required details along with photographs of the item and a brief explanation of the issue.
        </motion.p>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Once your request is approved, we will issue a Return Merchandise Authorization (RMA) or return code. Pack the item securely in its original packaging, include all tags and accessories, and display the RMA or return code clearly on the outside of the package. Follow the instructions provided for shipping or arranging a pickup.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Domestic Returns & Reverse Pickup
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          For most domestic returns, we offer a free reverse pickup service. A courier will collect the package from your address at no cost to you. In certain cases—such as remote delivery locations or unforeseen logistical challenges—we may be unable to arrange a reverse pickup. If this happens, you will need to ship the item back at your own cost.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          International Returns
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Reverse pickup is not available for international orders. Customers outside India must arrange and pay for shipping to our returns center using a reliable courier with tracking.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Return Shipping Costs
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Return postage and shipping fees are non-refundable unless the return is due to a mistake on our part, such as a defective or incorrect item being sent. Original order delivery charges are also non-refundable.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Refunds
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Once the returned product arrives and passes our quality check, we will process your refund. Refunds are issued to the original payment method—we do not offer store credit or gift vouchers. Processing typically begins within a few business days of approval, but the time it takes for the funds to appear in your account may vary depending on your bank or payment provider.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Exchanges
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          If you request an exchange, we will dispatch the replacement item after your return is approved. No additional shipping charges apply for the exchange item, though original delivery fees (if applicable) are not refunded.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Non-Returnable Items
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Items marked as Final Sale or purchased on clearance cannot be returned or exchanged. We also reserve the right to refuse returns that do not meet our eligibility criteria.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Defective or Damaged Items
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          For items confirmed as defective or damaged upon inspection, we will provide a full refund or exchange and reimburse any pre-paid return shipping costs.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          Confirmation
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Once your return or exchange is approved, you will receive an email confirmation. If you have any questions during the process, our Customer Service team is here to help.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ReturnExchange;
