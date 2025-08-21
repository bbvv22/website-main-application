import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order ${orderId}?`)) {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
      alert(`Order ${orderId} has been cancelled.`);
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
    setReturnImage(null);
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
    if (e.target.value !== 'Other' && otherReason !== '') {
      setOtherReason(''); // Clear other reason if not 'Other'
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReturnImage(e.target.files[0]);
    }
  };

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
      image: returnImage ? returnImage.name : 'No image',
    };
    alert(`Initiating Return for Order ${selectedOrderId}:\n\nDetails: ${JSON.stringify(returnDetails, null, 2)}\n\n(In a real application, this would send data to a backend API.)`);
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
      image: returnImage ? returnImage.name : 'No image',
    };
    alert(`Initiating Exchange for Order ${selectedOrderId}:\n\nDetails: ${JSON.stringify(exchangeDetails, null, 2)}\n\n(In a real application, this would send data to a backend API.)`);
    handleCloseReturnModal();
  };

  return (
    <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">My Orders</h1>
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-bold text-lg">Order {order.id}</h2>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
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
                <p className="font-semibold">Total: {order.total}</p>
                <Link to={`/orders/${order.id}`}
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  View Details
                </Link>
                {order.status !== 'Shipped' && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="mt-2 ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Cancel Order
                  </button>
                )}
                {order.status === 'Delivered' && isReturnEligible(order.date) ? (
                  <button
                    onClick={() => handleReturnExchange(order.id)}
                    className="mt-2 ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Return / Exchange
                  </button>
                ) : order.status === 'Delivered' && !isReturnEligible(order.date) && (
                  <span className="mt-2 ml-4 text-sm text-gray-500">Order is not under the return timeline.</span>
                )}
              </div>
            </div>
          ))}
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
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                ></textarea>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">Upload Image (Optional):</label>
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseReturnModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReturn}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Initiate Return
              </button>
              <button
                onClick={handleSubmitExchange}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
