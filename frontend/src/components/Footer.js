import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    support: ['Size Guide', 'About Us', 'Contact Us', 'FAQ'],
    policies: ['Privacy Policy', 'Shipping and Delivery Policy', 'Return and Exchange Policy', 'Terms of Service'],
  };

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { name: 'Facebook', href: '#', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    { name: 'Pinterest', href: '#', icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001 12.017.001z' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="bg-dwapor-charcoal text-dwapor-ivory">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Logo size="default" className="justify-start" />
            <p className="font-sans text-dwapor-soft-gray leading-relaxed max-w-xs">
              Minimal cuts. Honest fabrics. For the soft rebel who whispers power through timeless elegance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.1, color: '#dcd3c1' }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  className="text-dwapor-soft-gray hover:text-dwapor-beige transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants} className="space-y-6 pt-8">
            <h3 className="font-sans text-sm uppercase tracking-wide text-dwapor-beige font-medium">
              Support
            </h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <motion.a
                    whileHover={{ x: 5, color: '#dcd3c1' }}
                    href={link === 'FAQ' ? '/faq' : '#'}
                    className="font-sans text-dwapor-soft-gray hover:text-dwapor-beige transition-all duration-300"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policies Links */}
          <motion.div variants={itemVariants} className="space-y-6 pt-8">
            <h3 className="font-sans text-sm uppercase tracking-wide text-dwapor-beige font-medium">
              Policies
            </h3>
            <ul className="space-y-4">
              {footerLinks.policies.map((link) => (
                <li key={link}>
                  <motion.a
                    whileHover={{ x: 5, color: '#dcd3c1' }}
                    href={link === 'Privacy Policy' ? '/privacy-policy' : link === 'Shipping and Delivery Policy' ? '/shipping-delivery' : link === 'Return and Exchange Policy' ? '/return-exchange' : link === 'Terms of Service' ? '/terms-of-service' : '#'}
                    className="font-sans text-dwapor-soft-gray hover:text-dwapor-beige transition-all duration-300"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          

          

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-sans text-sm uppercase tracking-wide text-dwapor-beige font-medium">
              Stay Connected
            </h3>
            <p className="font-sans text-dwapor-soft-gray text-sm leading-relaxed">
              Receive updates on new collections, stories from our artisans, and exclusive events.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-dwapor-espresso text-dwapor-ivory px-4 py-3 font-sans text-sm placeholder-dwapor-soft-gray/60 focus:outline-none focus:ring-1 focus:ring-dwapor-beige transition-all"
              />
              <motion.button
                whileHover={{ backgroundColor: '#dcd3c1', color: '#1a1a1a' }}
                whileTap={{ scale: 0.98 }}
                className="bg-dwapor-beige text-dwapor-charcoal px-4 py-3 font-sans text-sm uppercase tracking-wide font-medium transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="border-t border-dwapor-espresso"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-serif text-dwapor-soft-gray text-center md:text-left">
              © {currentYear} Dwapor. Designed with restraint in India.
            </p>
            <div className="flex space-x-8">
              <motion.a
                whileHover={{ color: '#dcd3c1' }}
                href="/privacy-policy"
                className="font-sans text-sm text-dwapor-soft-gray hover:text-dwapor-beige transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                whileHover={{ color: '#dcd3c1' }}
                href="/shipping-delivery"
                className="font-sans text-sm text-dwapor-soft-gray hover:text-dwapor-beige transition-colors"
              >
                Shipping and Delivery Policy
              </motion.a>
              <motion.a
                whileHover={{ color: '#dcd3c1' }}
                href="/return-exchange"
                className="font-sans text-sm text-dwapor-soft-gray hover:text-dwapor-beige transition-colors"
              >
                Return and Exchange Policy
              </motion.a>
              <motion.a
                whileHover={{ color: '#dcd3c1' }}
                href="/terms-of-service"
                className="font-sans text-sm text-dwapor-soft-gray hover:text-dwapor-beige transition-colors"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;