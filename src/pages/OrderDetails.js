
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { default as CustomNotification } from '../components/Notification';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReturnMode, setIsReturnMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '' }); // Added notification state

  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  const handleItemSelection = (itemId, requestType) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = { ...prevSelectedItems };
      if (newSelectedItems[itemId] && newSelectedItems[itemId].requestType === requestType) {
        delete newSelectedItems[itemId];
      } else {
        newSelectedItems[itemId] = { requestType, reason: '' };
      }
      console.log('Selected items:', newSelectedItems);
      return newSelectedItems;
    });
  };

  const handleReasonChange = (itemId, reason) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [itemId]: {
        ...prevSelectedItems[itemId],
        reason
      }
    }));
  };

  const { user, token, isAuthenticated } = useAuth();

  const handleSubmitRequest = async () => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('token:', token);
    if (!isAuthenticated || !token) {
      showNotification('You must be logged in to submit a request.');
      return;
    }

    const itemsToRequest = Object.keys(selectedItems).map(itemId => ({
      orderItemId: parseInt(itemId),
      requestType: selectedItems[itemId].requestType,
      reason: selectedItems[itemId].reason
    }));

    if (itemsToRequest.length === 0) {
      alert('Please select at least one item to return or exchange.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/returns`, {
        orderId: order.id,
        items: itemsToRequest
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      showNotification(response.data.message);
      setIsReturnMode(false);
      setSelectedItems({});
      fetchOrderDetails();
    } catch (error) {
      console.error('Error submitting request:', error);
      showNotification('Failed to submit request. Please try again.');
    }
  };

  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);
  const [confirmCancelMessage, setConfirmCancelMessage] = useState('');

  const handleCancelOrder = () => {
    if (!user || !user.id) {
      showNotification('You must be logged in to cancel an order.');
      return;
    }
    setShowConfirmCancelModal(true);
    setConfirmCancelMessage('Are you sure you want to cancel this order?');
  };

  const handleConfirmCancel = async () => {
    setShowConfirmCancelModal(false); // Close modal
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/orders/${order.id}/cancel-request`, {
        userId: user.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrder(response.data.order); // Update order state with new status
      showNotification(response.data.message);
    } catch (error) {
      console.error('Error cancelling order:', error);
      showNotification('Failed to cancel order. Please try again.');
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmCancelModal(false);
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders/single/${orderId}`);
      const orderData = response.data;
      // Simulate status for existing orders
      orderData.items.forEach(item => {
        if (!item.status) {
          item.status = 'delivered';
        }
      });
      setOrder(orderData);
      console.log('Order data received by frontend:', orderData);
    } catch (err) {
      setError('Failed to fetch order details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  

  if (loading) {
    return (
      <div className="min-h-screen bg-dwapor-museum flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-dwapor-amber mb-4">Loading Order Details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dwapor-museum flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-dwapor-amber mb-4">Error: {error}</h1>
          <Link to="/orders" className="mt-4 inline-block px-6 py-3 border border-dwapor-amber text-dwapor-amber rounded-lg hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors">Back to My Orders</Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-dwapor-museum flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-dwapor-amber mb-4">Order Not Found</h1>
          <p className="text-dwapor-soft-gray">The order you are looking for does not exist.</p>
          <Link to="/orders" className="mt-4 inline-block px-6 py-3 border border-dwapor-amber text-dwapor-amber rounded-lg hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors">Back to My Orders</Link>
        </div>
      </div>
    );
  }

  const formattedOrderDate = new Date(order.order_date).toLocaleDateString();
  const formattedDeliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A';

  console.log('Order object in frontend:', order);
  console.log('order.updatedAt:', order.updatedAt);

  return (
    <div className="min-h-screen bg-dwapor-museum pt-48 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {notification.show && <CustomNotification message={notification.message} onClose={() => setNotification({ show: false, message: '' })} />}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-light text-dwapor-amber mb-4 tracking-tight">Order Details</h1>
            <p className="font-sans text-dwapor-soft-gray text-lg">Order ID: {order.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="font-serif text-3xl text-dwapor-amber mb-6">Status</h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-2 text-sm rounded-full font-medium ${
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                  {(order.status === 'pending' || order.status === 'confirmed') && (
                    <button
                      onClick={handleCancelOrder}
                      className="ml-4 px-4 py-2 text-sm rounded-full font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  <div className="font-sans text-dwapor-soft-gray">
                    <p>Ordered on: {formattedOrderDate}</p>
                    <p>Delivered on: {formattedDeliveryDate}</p>
                    {order.status === 'cancel_requested' && (
                      <p>Cancellation Requested on: {new Date(order.updatedAt).toLocaleDateString()}</p>
                    )}
                    {order.status === 'Order cancelled' && (
                      <p>Order Cancelled on: {new Date(order.updatedAt).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-3xl text-dwapor-amber">Items</h2>
                  {order.status === 'Delivered' && !isReturnMode && (
                    <button
                      onClick={() => setIsReturnMode(true)}
                      className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Select Items for Return/Exchange
                    </button>
                  )}
                </div>
                <div className="space-y-6">
                  {order.items && order.items.map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg ${selectedItems[item.id] ? 'bg-gray-100' : ''}`}>
                      <div className="flex items-center space-x-6">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                        <div>
                          <p className="font-sans text-lg font-medium text-dwapor-parchment">{item.name}</p>
                          <p className="font-sans text-dwapor-soft-gray">Quantity: {item.quantity}</p>
                          <p className="font-sans text-dwapor-soft-gray">Price: ₹{item.price.toFixed(2)}</p>
                          
                          {item.returnRequests && item.returnRequests.length > 0 && (
                            <p className="font-sans text-dwapor-soft-gray">
                              {item.returnRequests[0].request_type === 'return' ? 'Return' : 'Exchange'} Requested on: {new Date(item.returnRequests[0].created_at).toLocaleDateString()}
                              {item.returnRequests[0].status === 'successful' && (
                                <> ({item.returnRequests[0].request_type === 'return' ? 'Return' : 'Exchange'} Approved on: {new Date(item.returnRequests[0].updated_at).toLocaleDateString()})</>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      {console.log('Item status for', item.name, ':', item.status)}
                      {isReturnMode && item.status && (item.status.toLowerCase() === 'delivered' || item.status.toLowerCase() === 'confirmed') && (
                        <div className="mt-4">
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`action-${item.id}`}
                                checked={selectedItems[item.id]?.requestType === 'return'}
                                onChange={() => handleItemSelection(item.id, 'return')}
                                className="h-4 w-4 text-dwapor-amber focus:ring-dwapor-amber border-dwapor-soft-gray/50"
                              />
                              <span className="ml-2">Return</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`action-${item.id}`}
                                checked={selectedItems[item.id]?.requestType === 'exchange'}
                                onChange={() => handleItemSelection(item.id, 'exchange')}
                                className="h-4 w-4 text-dwapor-amber focus:ring-dwapor-amber border-dwapor-soft-gray/50"
                              />
                              <span className="ml-2">Exchange</span>
                            </label>
                          </div>
                          {selectedItems[item.id] && (
                            <div className="mt-4">
                              <label htmlFor={`reason-${item.id}`} className="block text-sm font-medium text-gray-700 mb-2">Reason:</label>
                              <select
                                id={`reason-${item.id}`}
                                name={`reason-${item.id}`}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:focus:border-indigo-500 sm:text-sm rounded-md"
                                value={selectedItems[item.id].reason}
                                onChange={(e) => handleReasonChange(item.id, e.target.value)}
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
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="font-serif text-3xl text-dwapor-amber mb-6">Shipping</h2>
                {order.shipping_address && (
                  <div className="font-sans text-dwapor-soft-gray">
                    <p>{order.shipping_address.address}</p>
                    <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                    <p>{order.shipping_address.country}</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="font-serif text-3xl text-dwapor-amber mb-6">Summary</h2>
                <div className="space-y-3 font-sans text-dwapor-soft-gray">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{(order.total_amount + (order.discount_amount || 0)).toFixed(2)}</span>
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-₹{order.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  {order.coupon_code && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon:</span>
                      <span>{order.coupon_code}</span>
                    </div>
                  )}
                  <div className="border-t border-dwapor-soft-gray/20 my-4"></div>
                  <div className="flex justify-between font-bold text-dwapor-parchment text-xl">
                    <span>Total:</span>
                    <span>₹{order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {isReturnMode && (
                <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
                  <h2 className="font-serif text-3xl text-dwapor-amber mb-6">Return/Exchange Summary</h2>
                  <div className="space-y-4">
                    {Object.keys(selectedItems).length === 0 ? (
                      <p className="text-dwapor-soft-gray">No items selected.</p>
                    ) : (
                      Object.keys(selectedItems).map(itemId => {
                        const item = order.items.find(i => i.id === parseInt(itemId));
                        return (
                          <div key={itemId} className="flex justify-between items-center">
                            <p className="text-dwapor-parchment">{item.name}</p>
                            <p className="text-dwapor-soft-gray">{selectedItems[itemId].requestType}</p>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="border-t border-dwapor-soft-gray/20 my-4"></div>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setIsReturnMode(false);
                        setSelectedItems({});
                      }}
                      className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitRequest}
                      className="px-6 py-3 bg-white text-black rounded-lg hover:bg-black hover:text-white transition-colors disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed"
                      disabled={Object.keys(selectedItems).length === 0 || !isAuthenticated}
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/orders" className="inline-block px-8 py-4 border border-dwapor-amber text-dwapor-amber rounded-lg hover:bg-dwapor-amber hover:text-dwapor-museum transition-colors">
              Back to My Orders
            </Link>
          </div>
        </motion.div>
      </div>
      
      {showConfirmCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">{confirmCancelMessage}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmCancel}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
              <button
                onClick={handleCancelConfirm}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                No, Keep Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
