import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';
import { AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, updateUserData, refreshUserData } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [notification, setNotification] = useState({ show: false, message: '' });

  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        streetAddress: user.streetAddress || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUserData(formData);
    if (result.success) {
      showNotification('Profile updated successfully!');
      refreshUserData();
    } else {
      showNotification(result.error || 'Failed to update profile');
    }
  };

  return (
    <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {notification.show && (
          <Notification
            message={notification.message}
            onClose={() => setNotification({ show: false, message: '' })}
          />
        )}
      </AnimatePresence>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">My Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
            />
          </div>
          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-dwapor-amber focus:border-dwapor-amber"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dwapor-amber hover:bg-dwapor-amber-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dwapor-amber"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
