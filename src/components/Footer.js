import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Notification from './Notification';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === '' || !email.includes('@')) {
      setNotification({ show: true, message: 'Please enter a valid email address.' });
      return;
    }
    // Frontend only, no backend call
    setNotification({ show: true, message: 'Thank you for your subscription!' });
    setEmail('');
  };

  const getLinkPath = (linkText) => {
    switch (linkText) {
      case 'Size Guide': return '/size-guide';
      case 'About Us': return '/about';
      case 'Contact Us': return '/contact';
      case 'FAQ': return '/faq';
      case 'Privacy Policy': return '/privacy-policy';
      case 'Shipping and Delivery Policy': return '/shipping-delivery';
      case 'Return and Exchange Policy': return '/return-exchange';
      case 'Terms of Service': return '/terms-of-service';
      default: return '#';
    }
  };

  const footerLinks = {
    support: ['Size Guide', 'About Us', 'Contact Us', 'FAQ'],
    policies: ['Privacy Policy', 'Shipping and Delivery Policy', 'Return and Exchange Policy', 'Terms of Service'],
  };

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/the_dwapor/', 
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' 
    }
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
      <AnimatePresence>
        {notification.show && (
          <Notification
            message={notification.message}
            onClose={() => setNotification({ show: false, message: '' })}
          />
        )}
      </AnimatePresence>
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
                  whileHover={{ scale: 1.1, color: social.name === 'Instagram' ? '#ffffff' : '#dcd3c1' }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-dwapor-soft-gray transition-colors ${social.name === 'Instagram' ? 'hover:bg-black hover:text-white p-1 rounded' : 'hover:text-dwapor-beige'}`}
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
                    href={getLinkPath(link)}
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
                    href={getLinkPath(link)}
                    className="font-sans text-dwapor-soft-gray hover:text-dwapor-beige transition-all duration-300"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={itemVariants} className="space-y-6 pt-8">
            <h3 className="font-sans text-sm uppercase tracking-wide text-dwapor-beige font-medium">
              Stay Connected
            </h3>
            <p className="font-sans text-dwapor-soft-gray text-sm leading-relaxed">
              Receive updates on new collections and exclusive events.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-dwapor-espresso text-dwapor-parchment px-4 py-3 font-sans text-sm placeholder-dwapor-soft-gray/60 focus:outline-none focus:ring-1 focus:ring-dwapor-beige transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{ backgroundColor: '#dcd3c1', color: '#1a1a1a' }}
                whileTap={{ scale: 0.98 }}
                className="bg-dwapor-beige text-dwapor-charcoal px-4 py-3 font-sans text-sm uppercase tracking-wide font-medium transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </form>
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
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <motion.a
                whileHover={{ color: '#dcd3c1' }}
                href="/privacy-policy"
                className="font-sans text-dwapor-soft-gray hover:text-dwapor-beige transition-colors"
              >
                Privacy
              </motion.a>
              <motion.a
                whileHover={{ color: '#dcd3c1' }}
                href="/terms-of-service"
                className="font-sans text-dwapor-soft-gray hover:text-dwapor-beige transition-colors"
              >
                Terms
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
