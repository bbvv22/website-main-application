import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems: wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    // Use optional chaining and provide fallback values
    const defaultSize = item.Product.sizes?.[0] || 'One Size';
    const defaultColor = item.Product.colors?.[0] || 'Default';
    addToCart(item.Product, defaultSize, defaultColor, 1);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading wishlist...</p>
      </div>
    );
  }

  // Add this check:
  if (!loading && wishlist.length === 0) {
    return (
      <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif text-center text-black mb-12">My Wishlist</h1>
          <div className="text-center">
            <p className="text-gray-600 mb-4">No items added to your wishlist yet.</p>
            <Link to="/collections" className="text-dwapor-amber hover:underline">Explore products</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif text-center text-black mb-12">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6 flex items-center">
                <img src={item.Product && item.Product.images && item.Product.images.length > 0 ? item.Product.images[0] : 'placeholder.jpg'} alt={item.Product ? item.Product.name : 'Unknown Product'} className="w-32 h-32 object-cover rounded-md mr-6" />
                <div>
                  <h2 className="font-bold text-lg">{item.Product ? item.Product.name : 'Unknown Product'}</h2>
                  <p className="text-gray-600">₹{item.Product ? item.Product.price : 'N/A'}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={() => removeFromWishlist(item.productId)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                    <button onClick={() => handleAddToCart(item)} className="ml-4 px-4 py-2 bg-dwapor-museum text-dwapor-gold rounded-md hover:bg-dwapor-gold hover:text-dwapor-museum focus:outline-none focus:ring-2 focus:ring-dwapor-amber focus:ring-opacity-50 text-sm">Add to Cart</button>
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
