import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems: wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    // Assuming the first size and color are the default
    const defaultSize = item.product.sizes[0];
    const defaultColor = item.product.colors[0];
    addToCart(item.product, defaultSize, defaultColor, 1);
  };

  return (
    <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 flex items-center">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-md mr-6" />
                <div>
                  <h2 className="font-bold text-lg">{item.product.name}</h2>
                  <p className="text-gray-600">₹{item.product.price}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => removeFromWishlist(item.productId)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                    <button onClick={() => handleAddToCart(item)} className="ml-4 px-4 py-2 bg-dwapor-amber text-white rounded-md hover:bg-dwapor-gold focus:outline-none focus:ring-2 focus:ring-dwapor-amber focus:ring-opacity-50 text-sm">Add to Cart</button>
                  </div>
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
