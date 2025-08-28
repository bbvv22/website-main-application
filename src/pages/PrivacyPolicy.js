import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
          Our Commitment to Your Privacy
        </motion.h1>
        <motion.div variants={itemVariants} className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></motion.div>

        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          At Dwapor, your trust is paramount. We are dedicated to safeguarding your personal information with the utmost care and transparency. This Privacy Policy outlines how we collect, utilize, share, and protect your data as you engage with Dwapor.com. By choosing to interact with our platform, you signify your agreement to the principles detailed below.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          1. Connect With Us
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Should you have any inquiries regarding this policy or your personal data, please do not hesitate to reach out:
          <br />
          <span className="font-medium">Email:</span> team.dwapor@gmail.com
          <br />
          <span className="font-medium">Address:</span> Delight Homes, Narsingi
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          2. Information We Gather
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We may collect the following categories of information:
          <br />
          <span className="font-medium">a. Personal Details You Provide:</span>
          <br />
          When you place an order or contact our team, we collect essential details such as your name, shipping address, email, and phone number.
          <br />
          <span className="font-medium">b. Automatically Collected Data:</span>
          <br />
          As you navigate our website, we automatically receive certain technical details, including your device’s IP address. This data helps us enhance your browsing experience and improve our digital offerings.
          <br />
          <span className="font-medium">c. Marketing Preferences:</span>
          <br />
          With your explicit consent, we may collect your email address to share exclusive updates, curated offers, and special promotions.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          3. Your Valued Consent
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          <span className="font-medium">Granting Consent:</span>
          <br />
          By providing your personal information for a purchase or direct communication, you grant us consent to collect and use that data for the specified purpose (e.g., order processing, customer support).
          <br />
          We will always seek your permission before sending any marketing communications.
          <br />
          <span className="font-medium">Withdrawing Consent:</span>
          <br />
          You retain the right to opt out of marketing messages or withdraw your consent at any time by:
          <br />
          Emailing team.dwapor@gmail.com
          <br />
          Writing to our registered address
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          4. Sharing Your Information Responsibly
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We uphold a strict policy: your personal information is never sold or traded. However, we may share it under specific, necessary circumstances:
          <br />
          <span className="font-medium">Legal Compliance:</span> When mandated by law or to protect our legitimate legal interests.
          <br />
          <span className="font-medium">Business Transitions:</span> In the event of a merger, acquisition, or sale of Dwapor, your data may be transferred as part of the business assets.
          <br />
          <span className="font-medium">Trusted Partners:</span> With reputable service providers who assist us with payment processing, order fulfillment, or marketing initiatives. These partners are contractually bound by stringent confidentiality agreements.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          5. Secure Payment Processing
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          All transactions are processed with the highest level of security through trusted payment gateways.
          <br />
          We do not store your financial information directly. All payment processes adhere to PCI-DSS standards, ensuring the utmost safety of your sensitive payment details.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          6. Engagement with Third-Party Services
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Certain trusted partners may access your personal data solely to provide their designated services. Their respective privacy policies will apply when you utilize their platforms.
          <br />
          Should you navigate away from Dwapor.com to a third-party website, their terms and privacy policies will govern your data interactions.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          7. Our Data Protection Measures
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We employ industry-leading security measures to prevent unauthorized access, misuse, or loss of your valuable data.
          <br />
          If you suspect any data breach or security concern, please contact team.dwapor@gmail.com immediately.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          8. Understanding Cookies
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          We utilize cookies to enhance your browsing experience and manage session data. While you have the option to disable cookies in your browser settings, please be aware that this may affect certain functionalities of our website.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          9. Age of Consent
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          By engaging with our website, you affirm that you are of legal age within your jurisdiction or have obtained the necessary consent from a parent or guardian.
        </motion.p>

        <motion.h2
          className="font-serif text-2xl text-dwapor-amber mb-4 mt-8 text-center"
          variants={itemVariants}
        >
          10. Updates to This Policy
        </motion.h2>
        <motion.p
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8"
          variants={itemVariants}
        >
          Dwapor may periodically update this Privacy Policy to reflect changes in our practices or legal requirements. Any revisions will be posted on this page, with the updated date clearly indicated at the top.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
