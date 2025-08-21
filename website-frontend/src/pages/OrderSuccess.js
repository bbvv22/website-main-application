import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="min-h-screen bg-dwapor-museum pt-24">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-3xl text-dwapor-amber mb-8">Order Not Found</h1>
          <Link
            to="/collections"
            className="inline-block bg-dwapor-amber text-dwapor-museum px-6 py-3 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dwapor-museum pt-24">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="font-serif text-4xl text-dwapor-amber mb-4">
              Order Confirmed!
            </h1>
            <p className="text-dwapor-soft-gray text-lg mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-lg text-left mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-serif text-xl text-dwapor-amber mb-4">Order Details</h3>
                <div className="space-y-2">
                  <p className="text-dwapor-soft-gray">
                    <span className="font-medium">Order ID:</span> {orderData.id}
                  </p>
                  <p className="text-dwapor-soft-gray">
                    <span className="font-medium">Date:</span> {new Date(orderData.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-dwapor-soft-gray">
                    <span className="font-medium">Total:</span> <span className="text-dwapor-gold font-medium">₹{orderData.total.toFixed(2)}</span>
                  </p>
                  <p className="text-dwapor-soft-gray">
                    <span className="font-medium">Payment:</span> {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl text-dwapor-amber mb-4">Shipping Address</h3>
                <div className="text-dwapor-soft-gray text-sm space-y-1">
                  <p className="font-medium">
                    {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                  </p>
                  <p>{orderData.shippingAddress.address}</p>
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state}
                  </p>
                  <p>
                    {orderData.shippingAddress.pincode}, {orderData.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-dwapor-soft-gray/20">
              <h3 className="font-serif text-xl text-dwapor-amber mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-serif text-dwapor-amber">
                        {item.product.name}
                      </h4>
                      <p className="text-dwapor-soft-gray text-sm">
                        Size: {item.size} | Color: {item.color} | Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="text-dwapor-gold font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-dwapor-amber/10 p-6 rounded-lg mb-8"
          >
            <h3 className="font-serif text-xl text-dwapor-amber mb-3">What happens next?</h3>
            <div className="text-dwapor-soft-gray text-sm space-y-2 text-left">
              <p>• You will receive an order confirmation email shortly</p>
              <p>• We will process your order within 1-2 business days</p>
              <p>• You will receive tracking information once your order ships</p>
              <p>• Expected delivery: 5-7 business days</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-x-4"
          >
            <Link
              to="/collections"
              className="inline-block bg-dwapor-amber text-dwapor-museum px-6 py-3 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-block border border-dwapor-amber text-dwapor-amber px-6 py-3 font-sans text-sm uppercase tracking-wider hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;