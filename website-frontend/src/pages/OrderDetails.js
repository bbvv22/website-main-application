import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get user ID

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  const handleItemSelection = (itemId) => {
    setSelectedOrderItems(prevSelected => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter(id => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  // const [returnImage, setReturnImage] = useState(null); // Removed image upload functionality

  const { user } = useAuth(); // Get user from AuthContext

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/single/${orderId}`);
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

  const isRefundEligible = (deliveryDateString) => { // This function name is misleading now, but its logic is for refund eligibility
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
    // setReturnImage(null); // Removed image upload functionality
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
    if (e.target.value !== 'Other' && otherReason !== '') {
      setOtherReason('');
    }
  };

  // const handleImageChange = (e) => { // Removed image upload functionality
  //   if (e.target.files && e.target.files[0]) {
  //     setReturnImage(e.target.files[0]);
  //   }
  // };

  const handleSubmitReturn = async () => {
    if (selectedOrderItems.length === 0) {
      alert('Please select at least one item to return.');
      return;
    }
    if (!returnReason) {
      alert('Please select a reason for return.');
      return;
    }
    if (returnReason === 'Other' && !otherReason) {
      alert('Please explain the reason.');
      return;
    }

    try {
      const requestData = {
        orderId: order.id,
        requestType: 'return',
        reason: returnReason,
        otherReason: returnReason === 'Other' ? otherReason : null,
        userId: user.id,
        selectedItemIds: selectedOrderItems,
      };
      
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders/request-action`, requestData);
      
      alert(response.data.message);
      // Update order status locally from backend response
      setOrder(prevOrder => ({ ...prevOrder, status: response.data.order.status }));
      handleCloseReturnModal();
    } catch (apiError) {
      console.error('Error initiating return:', apiError);
      alert('Failed to initiate return. Please try again.');
    }
  };

  const handleSubmitExchange = async () => {
    if (selectedOrderItems.length === 0) {
      alert('Please select at least one item to exchange.');
      return;
    }
    if (!returnReason) {
      alert('Please select a reason for exchange.');
      return;
    }
    if (returnReason === 'Other' && !otherReason) {
      alert('Please explain the reason.');
      return;
    }

    try {
      const requestData = {
        orderId: order.id,
        requestType: 'exchange',
        reason: returnReason,
        otherReason: returnReason === 'Other' ? otherReason : null,
        userId: user.id,
        selectedItemIds: selectedOrderItems,
      };

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders/request-action`, requestData);

      alert(response.data.message);
      // Update order status locally from backend response
      setOrder(prevOrder => ({ ...prevOrder, status: response.data.order.status }));
      handleCloseReturnModal();
    } catch (apiError) {
      console.error('Error initiating exchange:', apiError);
      alert('Failed to initiate exchange. Please try again.');
    }
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
        <Link to="/orders" className="mt-4 inline-block px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">Back to My Orders</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white min-h-screen py-32 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-4">Order Not Found</h1>
        <p className="text-gray-600">The order you are looking for does not exist.</p>
        <Link to="/orders" className="mt-4 inline-block px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">Back to My Orders</Link>
      </div>
    );
  }

  const formattedOrderDate = new Date(order.order_date).toLocaleDateString();
  const formattedDeliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A';

  // Determine if return/exchange buttons should be shown
  const showActionButtons = order.status === 'Delivered' && (isRefundEligible(order.delivery_date) || isReturnEligible(order.delivery_date));

  return (
    <div className="bg-white min-h-screen pt-56 px-4 sm:px-6 lg:px-8">
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
                order.status === 'Return Initiated' ? 'bg-purple-100 text-purple-800' : // New status color
                order.status === 'Exchange Initiated' ? 'bg-orange-100 text-orange-800' : // New status color
                'bg-yellow-100 text-yellow-800'
              }`}>
              {order.status}
            </span>
          </div>

          {/* Shipping Address */}
          {order.shipping_address && (
            <div className="mb-4 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-md text-gray-800 mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-600">{order.shipping_address.address}</p>
              <p className="text-sm text-gray-600">{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
              <p className="text-sm text-gray-600">{order.shipping_address.country}</p>
            </div>
          )}

          <div className="flex flex-col space-y-4 py-2 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedOrderItems.includes(item.id)}
                  onChange={() => handleItemSelection(item.id)}
                  className="h-4 w-4 text-stone-600 focus:ring-stone-500 border-stone-300 rounded"
                />
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
            <p className="text-lg">Subtotal: ₹{(order.total_amount + (order.discount_amount || 0)).toFixed(2)}</p>
            {order.discount_amount > 0 && (
                <p className="text-lg text-green-600">Discount: -₹{order.discount_amount.toFixed(2)}</p>
            )}
            {order.coupon_code && (
                <p className="text-lg text-green-600">Coupon: {order.coupon_code}</p>
            )}
            {order.coupon_code && (
                <p className="text-lg text-green-600">Coupon: {order.coupon_code}</p>
            )}
            <p className="font-semibold text-xl">Total: ₹{order.total_amount.toFixed(2)}</p>
            <div className="mt-4 space-x-4">
              {showActionButtons && ( // Only show buttons if eligible and not already initiated
                <>
                  {isRefundEligible(order.delivery_date) && (
                    <button
                      onClick={handleReturnExchange}
                      disabled={selectedOrderItems.length === 0}
                      className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Initiate Return
                    </button>
                  )}
                  {isReturnEligible(order.delivery_date) && (
                    <button
                      onClick={handleReturnExchange}
                      disabled={selectedOrderItems.length === 0}
                      className="px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Initiate Exchange
                    </button>
                  )}
                </>
              )}
              {!showActionButtons && order.status === 'Delivered' && ( // Show window closed message if delivered but not eligible
                <span className="text-sm text-gray-500">Return/Refund window closed.</span>
              )}
              {order.status === 'Return Initiated' && ( // Show status if return initiated
                <span className="text-sm text-purple-800 font-semibold">Return Initiated</span>
              )}
              {order.status === 'Exchange Initiated' && ( // Show status if exchange initiated
                <span className="text-sm text-orange-800 font-semibold">Exchange Initiated</span>
              )}
            </div>
          </div>
        </div>
        <Link to="/orders" className="mt-4 inline-block px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">Back to My Orders</Link>
      </div>

      {showReturnModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Return / Exchange for Order {order.id}</h2>
            {selectedOrderItems.length > 0 && (
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold text-md text-gray-800 mb-2">Selected Items:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {selectedOrderItems.map(itemId => {
                    const item = order.items.find(i => i.id === itemId);
                    return item ? <li key={itemId}>{item.name} (Qty: {item.quantity})</li> : null;
                  })}
                </ul>
              </div>
            )}
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

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseReturnModal}
                className="w-full px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReturn}
                className="w-full px-6 py-3 bg-white text-black rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                Initiate Return
              </button>
              <button
                onClick={handleSubmitExchange}
                className="w-full px-6 py-3 bg-white text-black rounded-lg hover:bg-black hover:text-white transition-colors"
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

export default OrderDetails;