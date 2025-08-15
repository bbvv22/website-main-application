import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="bg-white min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex items-center">
                <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                <div>
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                  <button onClick={() => removeFromWishlist(item.id)} className="text-red-500 hover:text-red-700 text-sm mt-2">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No items added to your wishlist yet.</p>
            <Link to="/collections" className="text-dwapor-amber hover:underline">Explore products</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
