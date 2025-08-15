import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();

  // Mock data - in a real app, you'd fetch this from an API
  const mockOrders = [
    {
      id: '#12346',
      date: '2024-08-10',
      status: 'Processing',
      total: '₹5,000.00',
      items: [{ name: 'New Arrival', image: '/products/product-4.1.jpg' }],
    },
    {
      id: '#12345',
      date: '2024-08-12',
      status: 'Shipped',
      total: '₹11,500.00',
      items: [
        { name: 'Aurora', image: '/products/product-1.1.jpg' },
        { name: 'Mirage', image: '/products/product-2.1.jpg' },
      ],
    },
    {
      id: '#12344',
      date: '2024-08-08',
      status: 'Delivered',
      total: '₹8,200.00',
      items: [{ name: 'Daisy', image: '/products/product-3.1.jpg' }],
    },
    {
      id: '#12343',
      date: '2024-08-01',
      status: 'Delivered',
      total: '₹6,000.00',
      items: [{ name: 'Old Item', image: '/products/product-5.1.jpg' }],
    },
  ];

  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="bg-white min-h-screen py-32 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-black mb-4">Order Not Found</h1>
        <p className="text-gray-600">The order you are looking for does not exist.</p>
        <Link to="/orders" className="mt-4 inline-block text-blue-600 hover:underline">Back to My Orders</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">Order Details: {order.id}</h1>
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
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
          <div className="flex space-x-4 overflow-x-auto py-2 mb-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <p className="text-sm text-gray-700 mt-1">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="font-semibold">Total: {order.total}</p>
          </div>
        </div>
        <Link to="/orders" className="mt-4 inline-block text-blue-600 hover:underline">Back to My Orders</Link>
      </div>
    </div>
  );
};

export default OrderDetails;
