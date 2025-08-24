import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductGallery from '../components/ProductGallery';
import Reviews from '../components/Reviews';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';
import { getProductFeatures, getProductCare } from '../data/productData';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data);
        setSelectedColor(response.data.colors?.[0] || '');
        setSelectedSize('');
      } catch (err) {
        setError('Product not found');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      if (!product) return;
      
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        const related = response.data
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error loading related products:', error);
      }
    };

    loadRelatedProducts();
  }, [product]);

  const handleAddReview = async (review) => {
    if (!user) {
      alert('Please log in to submit a review.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/reviews', {
        ...review,
        product_id: product.id,
        user_id: user.id,
      });
      setReviews([...reviews, response.data]);
      showNotification('Review submitted successfully!');
    } catch (error) {
      console.error('Failed to submit review:', error);
      showNotification('Failed to submit review: ' + (error.response?.data?.message || error.message));
    }
  };

  const cmSizes = [
    { size: 'S', bust: 86.4, waist: 76.2, hip: 102 },
    { size: 'M', bust: 91.4, waist: 81.3, hip: 107 },
    { size: 'L', bust: 96.5, waist: 86.4, hip: 112 },
  ];

  const inchSizes = [
    { size: 'S', bust: 34, waist: 30, hip: 40 },
    { size: 'M', bust: 36, waist: 32, hip: 42 },
    { size: 'L', bust: 38, waist: 34, hip: 44 },
  ];

  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    showNotification(`${product.name} has been added to your wishlist!`);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/reviews/${product.id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    if (product) {
      fetchReviews();
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dwapor-museum flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-dwapor-amber mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-dwapor-museum flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-dwapor-amber mb-4">Product Not Found</h1>
          <Link to="/collections" className="text-dwapor-gold hover:text-dwapor-amber">
            Return to Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      showNotification('Please select a size');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    showNotification(`Added ${quantity} x ${product.name} to cart!`);
  };

  const discount = product.discount_percent;

  return (
    <div className="min-h-screen bg-dwapor-museum pt-48">
      <AnimatePresence>
        {notification.show && (
          <Notification
            message={notification.message}
            onClose={() => setNotification({ show: false, message: '' })}
          />
        )}
      </AnimatePresence>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex text-sm">
          <Link to="/" className="text-dwapor-soft-gray hover:text-dwapor-amber">Home</Link>
          <span className="mx-2 text-dwapor-soft-gray">/</span>
          <Link to="/collections" className="text-dwapor-soft-gray hover:text-dwapor-amber">Collections</Link>
          <span className="mx-2 text-dwapor-soft-gray">/</span>
          <span className="text-dwapor-amber">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="space-y-12">

          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProductGallery images={product.images || []} productName={product.name} />
          </motion.div>

          {/* Product Details (single column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Product Title & Price */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-dwapor-amber mb-4 font-light">
                {product.name}
              </h1>
              {product.price && (
                <div className="flex items-center space-x-4 mb-8">
                  <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                  {product.is_on_sale && (
                    <>
                      <p className="text-xl text-gray-500 line-through">₹{product.original_price.toLocaleString()}</p>
                      {product.discount_percent > 0 && (
                        <div className="bg-dwapor-amber text-white text-sm font-semibold px-3 py-1 rounded-full">
                          {product.discount_percent}% OFF
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Simplified Size Chart */}
            <div className="bg-white p-4 rounded-lg border border-dwapor-soft-gray/20">
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-2">Quick Size Guide (CM)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hip</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cmSizes.slice(0, 3).map((row) => (
                      <tr key={row.size}>
                        <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{row.size}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.bust}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.waist}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to="/size-guide" className="text-dwapor-soft-gray hover:text-dwapor-amber underline underline-offset-4 text-sm mt-2 block text-right">View Full Size Guide</Link>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-4">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {(product.sizes || []).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border font-sans text-sm transition-all ${
                      selectedSize === size
                        ? 'border-dwapor-amber bg-dwapor-amber text-dwapor-museum'
                        : 'border-dwapor-soft-gray text-dwapor-soft-gray hover:border-dwapor-amber hover:text-dwapor-amber'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>


            {/* Quantity */}
            <div>
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-4">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-dwapor-soft-gray text-dwapor-soft-gray hover:border-dwapor-amber hover:text-dwapor-amber transition-all"
                >
                  -
                </button>
                <span className="text-dwapor-amber text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-dwapor-soft-gray text-dwapor-soft-gray hover:border-dwapor-amber hover:text-dwapor-amber transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Offers */}
            <div className="mt-8 p-6 bg-dwapor-light-gold/10 border border-dwapor-gold/30 rounded-lg shadow-sm">
              <h3 className="font-sans text-dwapor-gold text-base uppercase tracking-wider mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v2H5V5zm0 4h10v2H5V9zm0 4h10v2H5v-2z" clipRule="evenodd" />
                </svg>
                Exclusive Offers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-800 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-dwapor-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Shop for Rs. 2500 and more and get Rs. 250 off - Code: <span className="font-bold text-dwapor-gold ml-1">YAYY250</span>
                </li>
                <li className="flex items-center text-gray-800 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-dwapor-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Shop for Rs. 5000 and more and get Rs. 500 off - Code: <span className="font-bold text-dwapor-gold ml-1">YAYY500</span>
                </li>
              </ul>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex space-x-4">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-dwapor-amber text-dwapor-museum py-4 px-8 font-sans text-sm uppercase tracking-widest hover:bg-dwapor-gold transition-colors duration-300"
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={handleAddToWishlist}
                disabled={isInWishlist(product.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-200 text-gray-800 py-4 px-8 font-sans text-sm uppercase tracking-widest hover:bg-gray-300 transition-colors duration-300 disabled:opacity-50"
              >
                {isInWishlist(product.id) ? 'Saved' : 'Save to Wishlist'}
              </motion.button>
            </div>
            <div className="flex items-center justify-between text-sm mt-3">
              <Link to="/size-guide" className="text-dwapor-soft-gray hover:text-dwapor-amber underline underline-offset-4">Size Guide</Link>
              <span className="text-dwapor-soft-gray">Free returns within 14 days</span>
            </div>

            {/* Quick question form */}
            <div className="mt-8 p-6 border border-dwapor-soft-gray/20 rounded-lg bg-white">
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-4">Have a question about this item?</h3>
              <form onSubmit={(e) => { e.preventDefault(); showNotification('Thanks! We will get back to you shortly.'); e.target.reset(); }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="name" required placeholder="Name" className="border border-dwapor-soft-gray/30 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dwapor-amber" />
                <input name="email" required type="email" placeholder="Email" className="border border-dwapor-soft-gray/30 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dwapor-amber" />
                <input name="question" required placeholder="Your question" className="border border-dwapor-soft-gray/30 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-dwapor-amber md:col-span-1" />
                <div className="md:col-span-3">
                  <button className="mt-2 px-6 py-3 bg-dwapor-amber text-dwapor-museum rounded-md text-sm">Send</button>
                </div>
              </form>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-4">
                Features
              </h3>
              <div className="space-y-2">
                {getProductFeatures(product.name).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-dwapor-gold rounded-full"></div>
                    <span className="text-dwapor-soft-gray text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Care Instructions */}
            <div>
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-4">
                Care Instructions
              </h3>
              <p className="text-dwapor-soft-gray text-sm whitespace-pre-line">{getProductCare(product.name)}</p>
            </div>
          </motion.div>
        </div>

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setShowSizeGuide(false)}>
            <div className="bg-white rounded-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-serif text-2xl text-dwapor-museum mb-4">Size Guide</h3>
              <p className="text-sm text-dwapor-museum/70 mb-4">Measurements in inches and centimeters.</p>
              
              {/* CM Sizes Table */}
              <h4 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-2 mt-4">Centimeters (CM)</h4>
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hip</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cmSizes.map((row) => (
                      <tr key={row.size}>
                        <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{row.size}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.bust}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.waist}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Inches Sizes Table */}
              <h4 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-2">Inches</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                      <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hip</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inchSizes.map((row) => (
                      <tr key={row.size}>
                        <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{row.size}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.bust}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.waist}</td>
                        <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-500">{row.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right mt-6">
                <button className="px-4 py-2 bg-dwapor-amber text-dwapor-museum rounded" onClick={() => setShowSizeGuide(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Product Description */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-dwapor-amber mb-8 text-center">
              About {product.name}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-dwapor-soft-gray leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
            <Reviews product={{...product, reviews}} onAddReview={handleAddReview} />
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <h2 className="font-serif text-3xl text-dwapor-amber mb-12 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-dwapor-museum rounded-lg overflow-hidden"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={relatedProduct.images && relatedProduct.images.length > 0 ? relatedProduct.images[0] : 'placeholder.jpg'} // Added check and placeholder
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-xl text-dwapor-amber mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-dwapor-soft-gray text-sm mb-3">
                        {relatedProduct.short_description}
                      </p>
                      <span className="text-dwapor-gold font-medium">
                        ₹{relatedProduct.price}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky Add to Cart (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-18 border-t border-dwapor-soft-gray/20 p-4 md:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="text-dwapor-museum font-serif">₹{product.price}</div>
          <button onClick={handleAddToCart} className="px-6 py-3 bg-dwapor-amber text-dwapor-museum rounded-md text-sm uppercase tracking-wider">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;