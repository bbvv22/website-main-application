import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // Import axios

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || status === 'sending') return;

    setStatus('sending');
    setResponseMsg('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/contact`, {
        ...formData,
        type: 'contact_us', // Specify the type for the backend
      });
      setStatus('success');
      setResponseMsg(response.data.message || 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      setStatus('error');
      setResponseMsg(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dwapor-museum pt-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-light text-dwapor-amber mb-10 tracking-tight">
            Contact Us
          </h1>
          <div className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></div>
          <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed max-w-3xl mx-auto">
            We'd love to hear from you! Reach out to us with any questions, feedback, or inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl text-dwapor-amber mb-4">Get in Touch</h2>
            <div className="space-y-3">
              <p className="font-sans text-dwapor-soft-gray text-lg">
                <strong>Email:</strong> team.dwapor@gmail.com
              </p>
              <p className="font-sans text-dwapor-soft-gray text-lg">
                <strong>Mob:</strong> +916301946813
              </p>
              <p className="font-sans text-dwapor-soft-gray text-lg">
                <strong>Opening Hours:</strong> Mon to Sat: 10:30 AM - 5:30 PM
              </p>
            </div>
          </motion.div>

          {/* Send Us a Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl text-dwapor-amber mb-4">Send Us a Message</h2>
            
            {/* Response Message */}
            {status !== 'idle' && responseMsg && (
              <div className={`px-4 py-3 rounded mb-6 ${
                status === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : ''
              } ${
                status === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : ''
              }`}>
                {responseMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-dwapor-soft-gray text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                    errors.name ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-dwapor-soft-gray text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                    errors.email ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                  }`}
                  placeholder="Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-dwapor-soft-gray text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                    errors.message ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                  }`}
                  placeholder="Your Message"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
                className="w-full bg-dwapor-amber text-dwapor-museum py-3 px-6 rounded-lg font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
