import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [returnImage, setReturnImage] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch order details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const isReturnEligible = (deliveryDateString) => {
    if (!deliveryDateString) return false; // Cannot return if not delivered
    const deliveryDate = new Date(deliveryDateString);
    const today = new Date();
    const sevenDaysAfterDelivery = new Date(deliveryDate);
    sevenDaysAfterDelivery.setDate(deliveryDate.getDate() + 7);
    return today <= sevenDaysAfterDelivery;
  };

  const isRefundEligible = (deliveryDateString) => {
    if (!deliveryDateString) return false; // Cannot refund if not delivered
    const deliveryDate = new Date(deliveryDateString);
    const today = new Date();
    const threeDaysAfterDelivery = new Date(deliveryDate);
    threeDaysAfterDelivery.setDate(deliveryDate.getDate() + 3);
    return today <= threeDaysAfterDelivery;
  };

  const handleReturnExchange = () => {
    setShowReturnModal(true);
  };

  const handleCloseReturnModal = () => {
    setShowReturnModal(false);
    setReturnReason('');
    setOtherReason('');
    setReturnImage(null);
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
    if (e.target.value !== 'Other' && otherReason !== '') {
      setOtherReason('');
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
      orderId: orderId,
      reason: returnReason,
      otherReason: returnReason === 'Other' ? otherReason : null,
      image: returnImage ? returnImage.name : 'No image',
    };
    alert(`Initiating Return for Order ${orderId}:\n\nDetails: ${JSON.stringify(returnDetails, null, 2)}\n\n(In a real application, this would send data to a backend API.)`);
    handleCloseReturnModal();
  };

  const handleSubmitRefund = () => {
    if (!returnReason) {
      alert('Please select a reason for refund.');
      return;
    }
    if (returnReason === 'Other' && !otherReason) {
      alert('Please explain the reason.');
      return;
    }

    const refundDetails = {
      orderId: orderId,
      reason: returnReason,
      otherReason: returnReason === 'Other' ? otherReason : null,
    };
    alert(`Initiating Refund for Order ${orderId}:\n\nDetails: ${JSON.stringify(refundDetails, null, 2)}\n\n(In a real application, this would send data to a backend API.)`);
    handleCloseReturnModal();
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen py-32 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-4">Loading Order Details...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen py-32 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-4">Error: {error}</h1>
        <Link to="/orders" className="mt-4 inline-block text-blue-600 hover:underline">Back to My Orders</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white min-h-screen py-32 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-4">Order Not Found</h1>
        <p className="text-gray-600">The order you are looking for does not exist.</p>
        <Link to="/orders" className="mt-4 inline-block text-blue-600 hover:underline">Back to My Orders</Link>
      </div>
    );
  }

  const formattedOrderDate = new Date(order.order_date).toLocaleDateString();
  const formattedDeliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A';

  return (
    <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">Order Details: {order.id}</h1>
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-bold text-lg">Order {order.id}</h2>
              <p className="text-sm text-gray-500">Placed on {formattedOrderDate}</p>
              <p className="text-sm text-gray-500">Delivery Date: {formattedDeliveryDate}</p>
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
          <div className="flex flex-col space-y-4 py-2 mb-4">
            {order.items.map((item) => (
              <div key={item.product_id} className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="font-semibold text-xl">Total: ₹{order.total_amount.toFixed(2)}</p>
            <div className="mt-4 space-x-4">
              {order.status === 'Delivered' && isRefundEligible(order.delivery_date) && (
                <button
                  onClick={handleReturnExchange}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Initiate Refund
                </button>
              )}
              {order.status === 'Delivered' && isReturnEligible(order.delivery_date) && (
                <button
                  onClick={handleReturnExchange}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Initiate Return
                </button>
              )}
              {order.status === 'Delivered' && !isRefundEligible(order.delivery_date) && !isReturnEligible(order.delivery_date) && (
                <span className="text-sm text-gray-500">Return/Refund window closed.</span>
              )}
            </div>
          </div>
        </div>
        <Link to="/orders" className="mt-4 inline-block text-blue-600 hover:underline">Back to My Orders</Link>
      </div>

      {showReturnModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Return / Refund for Order {order.id}</h2>
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
                onClick={handleSubmitRefund}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Initiate Refund
              </button>
              <button
                onClick={handleSubmitReturn}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Initiate Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
