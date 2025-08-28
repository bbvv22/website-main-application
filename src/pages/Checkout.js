import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Function to load Razorpay script
const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

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
    paymentMethod: 'online'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isFormPrefilled, setIsFormPrefilled] = useState(false);

  const { cartItems, clearCart, getTotalPrice, getTotalItems, discount, couponCode } = useCart();
  const { user, isAuthenticated, updateUserData, refreshUserData } = useAuth();
  const navigate = useNavigate();

  const calculatedSubtotal = cartItems.reduce((sum, item) => sum + ((item.product.discounted_price || item.product.price) * item.quantity), 0);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [isAuthenticated, navigate]);

  // Allow guest checkout; only redirect if cart empty
  useEffect(() => {
    if (orderPlaced) return;
    if (cartItems.length === 0) {
      navigate('/collections');
    }
  }, [cartItems.length, navigate, orderPlaced]);

  // ✅ Force refresh user data when checkout loads
  useEffect(() => {
    if (user) {
      refreshUserData();
    }
  }, []); // Run only once when component mounts

  // ✅ Pre-fill form with user data
  useEffect(() => {
    if (user && !isFormPrefilled) {
      console.log('👤 Pre-filling form with user data:', user);
      setFormData((prev) => ({
        ...prev,
        // ✅ Personal Information
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        
        // ✅ Shipping Address
        shippingAddress: user.streetAddress || '',
        shippingCity: user.city || '',
        shippingState: user.state || '',
        shippingPincode: user.zipCode || '',
        shippingCountry: 'India',
        
        // ✅ Billing Address 
        billingAddress: user.billingAddress || (prev.sameAsShipping ? (user.streetAddress || '') : ''),
        billingCity: user.billingCity || (prev.sameAsShipping ? (user.city || '') : ''),
        billingState: user.billingState || (prev.sameAsShipping ? (user.state || '') : ''),
        billingPincode: user.billingZipCode || (prev.sameAsShipping ? (user.zipCode || '') : ''),
        billingCountry: 'India',
      }));
      setIsFormPrefilled(true);
    }
  }, [user, isFormPrefilled]);

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

  const nextStep = async () => {
    if (validateStep(currentStep)) {
      // ✅ Save ALL user details on each step
      const completeUserData = {
        // Personal Information
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        
        // Shipping Address
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingState: formData.shippingState,
        shippingPincode: formData.shippingPincode,
        
        // Billing Address
        billingAddress: formData.sameAsShipping ? formData.shippingAddress : formData.billingAddress,
        billingCity: formData.sameAsShipping ? formData.shippingCity : formData.billingCity,
        billingState: formData.sameAsShipping ? formData.shippingState : formData.billingState,
        billingPincode: formData.sameAsShipping ? formData.shippingPincode : formData.billingPincode,
      };
      
      console.log('🚀 Saving user data on next step:', completeUserData);
      
      await updateUserData(completeUserData);
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateStep(currentStep)) return;
  
  setLoading(true);
  setPaymentError('');
  
  try {
    // Save user data first
    await updateUserData(formData);
    
    await processOnlinePayment();
    
  } catch (error) {
    console.error('Order processing error:', error);
    setErrors({ submit: error.message || 'Order processing failed' });
    setPaymentError(error.message);
  } finally {
    setLoading(false);
  }
};

// 🆕 PROCESS ONLINE PAYMENT
const processOnlinePayment = async () => {
  try {
    setPaymentLoading(true);
    
    // Step 1: Create Razorpay order
    console.log('Creating payment order...');
    console.log('Items being sent to backend:', cartItems); // Added log
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/orders/create-payment-order`,
      {
        userId: user.id,
        items: cartItems,
        couponCode: couponCode,
        discount: discount
      }
    );
    
    if (!response.data.success) {
      throw new Error(response.data.error);
    }
    
    const { razorpayOrderId, amount } = response.data;
    
    // Step 2: Open Razorpay Checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'DWAPOR',
      description: 'Premium Fashion Collection',
      order_id: razorpayOrderId,
      handler: async (paymentResponse) => {
        // Payment successful - verify it
        await verifyPaymentAndCreateOrder(paymentResponse);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#1a1a1a'
      },
      modal: {
        ondismiss: () => {
          setPaymentLoading(false);
          setLoading(false);
          setPaymentError('Payment was cancelled');
        }
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
    
  } catch (error) {
    setPaymentLoading(false);
    throw error;
  }
};

// 🆕 VERIFY PAYMENT
const verifyPaymentAndCreateOrder = async (paymentResponse) => {
  try {
    const orderData = {
      userId: user.id,
      items: cartItems,
      total: getTotalPrice(),
      discount: discount,
      couponCode: couponCode,
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
      }
    };
    
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/orders/verify-payment`,
      {
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        orderData: orderData
      }
    );
    
    if (!response.data.success) {
      throw new Error(response.data.error);
    }
    
    // Success!
    setOrderPlaced(true);
    clearCart();
    console.log('Order data before navigation:', response.data.order); // Added log
    navigate('/order-success', {
      state: { orderData: response.data.order }
    });
    
  } catch (error) {
    setPaymentLoading(false);
    throw new Error('Payment verification failed');
  }
};



  if (!isAuthenticated || cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Shipping & Billing' },
    { number: 3, title: 'Payment & Review' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-8 pt-48">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-stone-900 text-white border-stone-900' 
                    : 'bg-white text-stone-400 border-stone-300'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-stone-900' : 'text-stone-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-stone-900' : 'bg-stone-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-6">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                            errors.firstName ? 'border-red-500' : ''
                          }`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                            errors.lastName ? 'border-red-500' : ''
                          }`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                          placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                            errors.phone ? 'border-red-500' : ''
                          }`}
                          placeholder="Enter your 10-digit phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping & Billing */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-6">Shipping & Billing Address</h2>
                    
                    {/* Shipping Address */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-stone-800 mb-4">Shipping Address</h3>
                      <div className="grid gap-6">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            name="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                              errors.shippingAddress ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter your street address"
                          />
                          {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>}
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              name="shippingCity"
                              value={formData.shippingCity}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                                errors.shippingCity ? 'border-red-500' : ''
                              }`}
                              placeholder="Enter city"
                            />
                            {errors.shippingCity && <p className="text-red-500 text-sm mt-1">{errors.shippingCity}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">
                              State *
                            </label>
                            <input
                              type="text"
                              name="shippingState"
                              value={formData.shippingState}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                                errors.shippingState ? 'border-red-500' : ''
                              }`}
                              placeholder="Enter state"
                            />
                            {errors.shippingState && <p className="text-red-500 text-sm mt-1">{errors.shippingState}</p>}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">
                              Pincode *
                            </label>
                            <input
                              type="text"
                              name="shippingPincode"
                              value={formData.shippingPincode}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                                errors.shippingPincode ? 'border-red-500' : ''
                              }`}
                              placeholder="Enter 6-digit pincode"
                            />
                            {errors.shippingPincode && <p className="text-red-500 text-sm mt-1">{errors.shippingPincode}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          name="sameAsShipping"
                          checked={formData.sameAsShipping}
                          onChange={handleChange}
                          className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-stone-700">
                          Billing address is the same as shipping address
                        </label>
                      </div>

                      {!formData.sameAsShipping && (
                        <div>
                          <h3 className="text-lg font-semibold text-stone-800 mb-4">Billing Address</h3>
                          <div className="grid gap-6">
                            <div>
                              <label className="block text-sm font-medium text-stone-700 mb-2">
                                Street Address *
                              </label>
                              <input
                                type="text"
                                name="billingAddress"
                                value={formData.billingAddress}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                                  errors.billingAddress ? 'border-red-500' : ''
                                }`}
                                placeholder="Enter billing street address"
                              />
                              {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                  City *
                                </label>
                                <input
                                  type="text"
                                  name="billingCity"
                                  value={formData.billingCity}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                                    errors.billingCity ? 'border-red-500' : ''
                                  }`}
                                  placeholder="Enter city"
                                />
                                {errors.billingCity && <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                  State *
                                </label>
                                <input
                                  type="text"
                                  name="billingState"
                                  value={formData.billingState}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                                    errors.billingState ? 'border-red-500' : ''
                                  }`}
                                  placeholder="Enter state"
                                />
                                {errors.billingState && <p className="text-red-500 text-sm mt-1">{errors.billingState}</p>}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                  Pincode *
                                </label>
                                <input
                                  type="text"
                                  name="billingPincode"
                                  value={formData.billingPincode}
                                  onChange={handleChange}
                                  className={`w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent ${
                                    errors.billingPincode ? 'border-red-500' : ''
                                  }`}
                                  placeholder="Enter 6-digit pincode"
                                />
                                {errors.billingPincode && <p className="text-red-500 text-sm mt-1">{errors.billingPincode}</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Payment & Review */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Choose Payment Method</h3>
                    
                    {paymentError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {paymentError}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {/* Online Payment */}
                      <label className="flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={formData.paymentMethod === 'online'}
                          onChange={handleChange}
                          className="w-5 h-5"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Online Payment</div>
                          <div className="text-sm text-gray-500">Cards, UPI, Net Banking, Wallets</div>
                          <div className="text-xs text-green-600 mt-1">✓ Instant Confirmation</div>
                        </div>
                        <div className="font-semibold text-blue-600">Razorpay</div>
                      </label>
                    </div>
                  </div>
                )}

                {/* ✅ Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading || paymentLoading}
                        className="px-8 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading || paymentLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Pay Now</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                

                {/* ✅ Error Display */}
                {errors.submit && (
                  <p className="text-red-500 text-sm mt-4 text-center">{errors.submit}</p>
                )}
              </form>
            </motion.div>
          </div>

          {/* ✅ Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-900 text-sm">{item.product.name}</h4>
                      <p className="text-stone-500 text-xs">
                        {item.size} | {item.color} | Qty: {item.quantity}
                      </p>
                      <p className="font-semibold text-stone-900">₹{((item.product.discounted_price || item.product.price) * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{calculatedSubtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
