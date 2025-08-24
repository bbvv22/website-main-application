import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Added
import Notification from '../components/Notification';
import { AnimatePresence } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const [notification, setNotification] = useState({ show: false, message: '' }); // Added notification state
  const showNotification = (message) => {
    setNotification({ show: true, message });
  };
  const { user, isAuthenticated } = useAuth(); // Get user and isAuthenticated

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !user?.id) { // Check if user is authenticated
        setLoading(false);
        setError('Please log in to view your orders.');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/${user.id}`); // Added userId
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, user]); // Depend on isAuthenticated and user

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [returnReason, setReturnReason] = useState(''); // Added
  const [otherReason, setOtherReason] = useState(''); // Added
  // const [returnImage, setReturnImage] = useState(null); // Removed image upload functionality

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
      showNotification(`Order ${orderId} has been cancelled.`);
    }
  };

  const isReturnEligible = (orderDateString) => {
    const orderDate = new Date(orderDateString);
    const today = new Date();
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
    return orderDate >= sevenDaysAgo;
  };

  const handleReturnExchange = (orderId) => {
    setSelectedOrderId(orderId);
    setShowReturnModal(true);
  };

  const handleCloseReturnModal = () => {
    setShowReturnModal(false);
    setSelectedOrderId(null);
    setReturnReason('');
    setOtherReason('');
    // setReturnImage(null); // Removed image upload functionality
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
    if (e.target.value !== 'Other' && otherReason !== '') {
      setOtherReason(''); // Clear other reason if not 'Other'
    }
  };

  // const handleImageChange = (e) => { // Removed image upload functionality
  //   if (e.target.files && e.target.files[0]) {
  //     setReturnImage(e.target.files[0]);
  //   }
  // };

  const handleSubmitReturn = () => {
    if (!returnReason) {
      alert('Please select a reason for return.');
      return;
    }
    if (returnReason === 'Other' && !otherReason) {
      alert('Please explain the reason.');
      return;
    }

    const returnDetails = {
      orderId: selectedOrderId,
      reason: returnReason,
      otherReason: returnReason === 'Other' ? otherReason : null,
      // image: returnImage ? returnImage.name : 'No image', // Removed image upload functionality
    };
    showNotification(`Initiating Return for Order ${selectedOrderId}:\n\nDetails: ${JSON.stringify(returnDetails, null, 2)}`);
    handleCloseReturnModal();
  };

  const handleSubmitExchange = () => {
    if (!returnReason) {
      alert('Please select a reason for exchange.');
      return;
    }
    if (returnReason === 'Other' && !otherReason) {
      alert('Please explain the reason.');
      return;
    }

    const exchangeDetails = {
      orderId: selectedOrderId,
      reason: returnReason,
      otherReason: returnReason === 'Other' ? otherReason : null,
      // image: returnImage ? returnImage.name : 'No image', // Removed image upload functionality
    };
    showNotification(`Initiating Exchange for Order ${selectedOrderId}:\n\nDetails: ${JSON.stringify(exchangeDetails, null, 2)}`);
    handleCloseReturnModal();
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-4">Loading Orders...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-4">Error: {error}</h1>
      </div>
    );
  }

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">My Orders</h1>
        <div className="space-y-8">
          {orders.length === 0 ? (
            <div className="text-center text-gray-600">No orders found.</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="font-bold text-lg">Order {order.id}</h2>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.order_date).toLocaleDateString()}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${ 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex space-x-4 overflow-x-auto py-2">
                  {order.items.map((item, index) => (
                    <img key={index} src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  ))}
                </div>
                <div className="text-right mt-4">
                  <Link to={`/orders/${order.id}`}
                    className="mt-2 px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    View Details
                  </Link>
                  {/* Removed Return / Exchange button from here */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showReturnModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Return / Exchange for Order {selectedOrderId}</h2>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">Reason:</label>
              <select
                id="reason"
                name="reason"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:focus:border-indigo-500 sm:text-sm rounded-md"
                value={returnReason}
                onChange={handleReturnReasonChange}
              >
                <option value="">Select a reason</option>
                <option value="Defective">Defective</option>
                <option value="Damaged">Damaged</option>
                <option value="Wrong Size">Wrong Size</option>
                <option value="Wrong Item">Wrong Item</option>
                <option value="Changed Mind">Changed Mind</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {returnReason === 'Other' && (
              <div className="mb-4">
                <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700 mb-2">Please explain:</label>
                <textarea
                  id="otherReason"
                  name="otherReason"
                  rows="3"
                  className="shadow-sm focus:ring-indigo-500 focus:focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                ></textarea>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseReturnModal}
                className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReturn}
                className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                Initiate Return
              </button>
              <button
                onClick={handleSubmitExchange}
                className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                Initiate Exchange
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default Orders;