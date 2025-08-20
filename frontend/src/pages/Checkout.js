import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    shippingCountry: 'India',
    
    // Billing Address
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    billingCountry: 'India',
    
    // Payment
    paymentMethod: 'cod'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const { cart, clearCart, getCartTotal, getCartItemsCount, discount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const originalTotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Allow guest checkout; only redirect if cart empty
  useEffect(() => {
    if (orderPlaced) return;
    
    if (cart.items.length === 0) {
      navigate('/collections');
    }
  }, [cart.items.length, navigate, orderPlaced]);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name ? user.name.split(' ').slice(1).join(' ') : ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    }

    if (step === 2) {
      if (!formData.shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required';
      if (!formData.shippingCity.trim()) newErrors.shippingCity = 'City is required';
      if (!formData.shippingState.trim()) newErrors.shippingState = 'State is required';
      if (!formData.shippingPincode.trim()) newErrors.shippingPincode = 'Pincode is required';
      if (!/^\d{6}$/.test(formData.shippingPincode)) newErrors.shippingPincode = 'Pincode must be 6 digits';
      
      if (!formData.sameAsShipping) {
        if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Billing address is required';
        if (!formData.billingCity.trim()) newErrors.billingCity = 'Billing city is required';
        if (!formData.billingState.trim()) newErrors.billingState = 'Billing state is required';
        if (!formData.billingPincode.trim()) newErrors.billingPincode = 'Billing pincode is required';
        if (!/^\d{6}$/.test(formData.billingPincode)) newErrors.billingPincode = 'Billing pincode must be 6 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setLoading(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order data
      const orderData = {
        id: `ORDER-${Date.now()}`,
        items: cart.items,
        total: getCartTotal(),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          pincode: formData.shippingPincode,
          country: formData.shippingCountry
        },
        billingAddress: formData.sameAsShipping ? {
          address: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          pincode: formData.shippingPincode,
          country: formData.shippingCountry
        } : {
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          pincode: formData.billingPincode,
          country: formData.billingCountry
        },
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'confirmed'
      };

      // Clear cart and navigate to success page
      setOrderPlaced(true);
      clearCart();
      navigate('/order-success', { state: { orderData } });
      
    } catch (error) {
      setErrors({ submit: 'Order processing failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || cart.items.length === 0) {
    return null; // Will redirect via useEffect
  }

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Shipping & Billing' },
    { number: 3, title: 'Payment & Review' }
  ];

  return (
    <div className="min-h-screen bg-dwapor-museum pt-24">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl text-dwapor-amber text-center mb-12">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    currentStep >= step.number
                      ? 'bg-dwapor-amber text-dwapor-museum'
                      : 'bg-dwapor-soft-gray/20 text-dwapor-soft-gray'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`ml-2 font-sans text-sm ${
                    currentStep >= step.number ? 'text-dwapor-amber' : 'text-dwapor-soft-gray'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-16 h-0.5 bg-dwapor-soft-gray/20 mx-4"></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {errors.submit}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="font-serif text-2xl text-dwapor-amber mb-6">
                        Personal Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                              errors.firstName ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                            }`}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                              errors.lastName ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                            }`}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                            errors.email ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                            errors.phone ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                          }`}
                          placeholder="10-digit mobile number"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Shipping & Billing */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="font-serif text-2xl text-dwapor-amber mb-6">
                        Shipping Address
                      </h2>

                      <div>
                        <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                          Street Address *
                        </label>
                        <textarea
                          name="shippingAddress"
                          value={formData.shippingAddress}
                          onChange={handleChange}
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                            errors.shippingAddress ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                          }`}
                        />
                        {errors.shippingAddress && (
                          <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="shippingCity"
                            value={formData.shippingCity}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                              errors.shippingCity ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                            }`}
                          />
                          {errors.shippingCity && (
                            <p className="text-red-500 text-sm mt-1">{errors.shippingCity}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            name="shippingState"
                            value={formData.shippingState}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                              errors.shippingState ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                            }`}
                          />
                          {errors.shippingState && (
                            <p className="text-red-500 text-sm mt-1">{errors.shippingState}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                            Pincode *
                          </label>
                          <input
                            type="text"
                            name="shippingPincode"
                            value={formData.shippingPincode}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                              errors.shippingPincode ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                            }`}
                            placeholder="6-digit pincode"
                          />
                          {errors.shippingPincode && (
                            <p className="text-red-500 text-sm mt-1">{errors.shippingPincode}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                            Country
                          </label>
                          <select
                            name="shippingCountry"
                            value={formData.shippingCountry}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-dwapor-soft-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                          >
                            <option value="India">India</option>
                          </select>
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div className="mt-8">
                        <div className="flex items-center mb-4">
                          <input
                            type="checkbox"
                            name="sameAsShipping"
                            checked={formData.sameAsShipping}
                            onChange={handleChange}
                            className="w-4 h-4 text-dwapor-amber"
                          />
                          <label className="ml-2 text-dwapor-soft-gray text-sm">
                            Billing address is same as shipping address
                          </label>
                        </div>

                        {!formData.sameAsShipping && (
                          <div className="space-y-4">
                            <h3 className="font-serif text-xl text-dwapor-amber">
                              Billing Address
                            </h3>
                            
                            <div>
                              <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                                Street Address *
                              </label>
                              <textarea
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                                  errors.billingAddress ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                                }`}
                              />
                              {errors.billingAddress && (
                                <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                                  City *
                                </label>
                                <input
                                  type="text"
                                  name="billingCity"
                                  value={formData.billingCity}
                                  onChange={handleChange}
                                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                                    errors.billingCity ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                                  }`}
                                />
                                {errors.billingCity && (
                                  <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                                  State *
                                </label>
                                <input
                                  type="text"
                                  name="billingState"
                                  value={formData.billingState}
                                  onChange={handleChange}
                                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                                    errors.billingState ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                                  }`}
                                />
                                {errors.billingState && (
                                  <p className="text-red-500 text-sm mt-1">{errors.billingState}</p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                                  Pincode *
                                </label>
                                <input
                                  type="text"
                                  name="billingPincode"
                                  value={formData.billingPincode}
                                  onChange={handleChange}
                                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                                    errors.billingPincode ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                                  }`}
                                  placeholder="6-digit pincode"
                                />
                                {errors.billingPincode && (
                                  <p className="text-red-500 text-sm mt-1">{errors.billingPincode}</p>
                                )}
                              </div>

                              <div>
                                <label className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                                  Country
                                </label>
                                <select
                                  name="billingCountry"
                                  value={formData.billingCountry}
                                  onChange={handleChange}
                                  className="w-full px-3 py-2 border border-dwapor-soft-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber"
                                >
                                  <option value="India">India</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment & Review */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="font-serif text-2xl text-dwapor-amber mb-6">
                        Payment Method
                      </h2>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleChange}
                            className="w-4 h-4 text-dwapor-amber"
                          />
                          <label className="ml-2 text-dwapor-soft-gray">
                            Cash on Delivery (COD)
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="online"
                            checked={formData.paymentMethod === 'online'}
                            onChange={handleChange}
                            className="w-4 h-4 text-dwapor-amber"
                          />
                          <label className="ml-2 text-dwapor-soft-gray">
                            Online Payment (Coming Soon)
                          </label>
                        </div>
                      </div>

                      {formData.paymentMethod === 'cod' && (
                        <div className="bg-dwapor-amber/10 p-4 rounded-lg">
                          <p className="text-dwapor-soft-gray text-sm">
                            You will pay ₹{getCartTotal().toFixed(2)} in cash when your order is delivered.
                          </p>
                        </div>
                      )}

                      <div className="mt-8 pt-6 border-t border-dwapor-soft-gray/20">
                        <h3 className="font-serif text-xl text-dwapor-amber mb-4">
                          Order Summary
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-dwapor-soft-gray">Items ({getCartItemsCount()})</span>
                            <span className="text-dwapor-amber">₹{getCartTotal().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dwapor-soft-gray">Shipping</span>
                            <span className="text-dwapor-amber">Free</span>
                          </div>
                          <div className="flex justify-between font-serif text-lg">
                            <span className="text-dwapor-amber">Total</span>
                            <span className="text-dwapor-gold">₹{getCartTotal().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-dwapor-amber text-dwapor-amber rounded-lg hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    
                    <div className="ml-auto">
                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-3 bg-dwapor-amber text-dwapor-museum rounded-lg hover:bg-dwapor-gold transition-colors"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-3 bg-dwapor-amber text-dwapor-museum rounded-lg hover:bg-dwapor-gold transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Place Order'}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
                <h3 className="font-serif text-xl text-dwapor-amber mb-4">
                  Your Order
                </h3>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-serif text-dwapor-amber text-sm">
                          {item.product.name}
                        </h4>
                        <p className="text-dwapor-soft-gray text-xs">
                          {item.size} | {item.color} | Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-dwapor-gold text-sm">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-dwapor-soft-gray/20 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-dwapor-soft-gray">Subtotal</span>
                    <span className="text-dwapor-amber">₹{originalTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-dwapor-soft-gray">Coupon Discount</span>
                      <span className="text-red-500">- ₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-lg">
                    <span className="text-dwapor-amber">Total</span>
                    <span className="text-dwapor-gold">₹{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;