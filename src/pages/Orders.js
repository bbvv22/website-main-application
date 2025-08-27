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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;