import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Address = () => {
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUserData } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    if (!formData.streetAddress || !formData.city || !formData.state || !formData.zipCode) {
      setError('Please fill out all address fields.');
      return;
    }

    const result = await updateUserData(formData);

    if (result.success) {
      navigate('/', { state: { message: 'Account created and logged in successfully!' } });
    } else {
      setError(result.error || 'Failed to save address.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-dwapor-museum pt-48">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="font-serif text-3xl text-dwapor-amber text-center mb-8">Address Page</h1>
            <p className="text-center text-dwapor-soft-gray mb-6">
              Add or update your address details below.
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">Street Address</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                  placeholder="123 Main St"
                />
              </div>
              <div>
                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                  placeholder="ZIP Code"
                />
              </div>
              <div>
                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                  placeholder="Enter your phone number"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-dwapor-amber text-dwapor-museum py-3 px-6 rounded-lg font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Address;