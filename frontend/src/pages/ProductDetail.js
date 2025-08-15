import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

import ProductGallery from '../components/ProductGallery';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleAddToWishlist = () => {
    addToWishlist(product);
    alert(`${product.name} has been added to your wishlist!`);
  };

  if (!product) {
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
      alert('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, quantity);
    
    // Show success message
    alert(`Added ${quantity} x ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) to cart!`);
  };

  // urgency signals (mocked)
  const lowStock = useMemo(() => Math.random() < 0.5 ? Math.floor(Math.random() * 4) + 1 : null, []);
  const recentViews = useMemo(() => 8 + Math.floor(Math.random() * 12), []);

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-dwapor-museum pt-24">
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
            <ProductGallery images={product.images} productName={product.name} />
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
              <div className="flex items-center space-x-4 mb-8">
                <span className="font-sans text-3xl text-dwapor-gold font-medium">
                  ₹{product.price}
                </span>
                <span className="text-dwapor-soft-gray text-sm">
                  (Inclusive of all taxes)
                </span>
              </div>
              <p className="text-dwapor-soft-gray text-lg leading-relaxed">
                {product.shortDescription}
              </p>
              {/* urgency */}
              <div className="flex flex-wrap gap-6 mt-6">
                {lowStock && (
                  <div className="text-red-500 text-sm">Only {lowStock} left in stock</div>
                )}
                <div className="text-dwapor-soft-gray text-sm">{recentViews} people viewed this item in the last hour</div>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-4">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
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
              <button onClick={() => setShowSizeGuide(true)} className="text-dwapor-soft-gray hover:text-dwapor-amber underline underline-offset-4">Size Guide</button>
              <span className="text-dwapor-soft-gray">Free returns within 14 days</span>
            </div>

            {/* Quick question form */}
            <div className="mt-8 p-6 border border-dwapor-soft-gray/20 rounded-lg bg-white">
              <h3 className="font-sans text-dwapor-amber text-sm uppercase tracking-wider mb-4">Have a question about this item?</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thanks! We will get back to you shortly.'); e.target.reset(); }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {product.features.split(' • ').map((feature, index) => (
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
              <p className="text-dwapor-soft-gray text-sm">{product.care}</p>
            </div>
          </motion.div>
        </div>

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6" onClick={() => setShowSizeGuide(false)}>
            <div className="bg-white rounded-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-serif text-2xl text-dwapor-museum mb-4">Size Guide</h3>
              <p className="text-sm text-dwapor-museum/70 mb-4">Measurements in inches. Choose your usual size; this style has a tailored fit.</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="font-medium">Size</div>
                <div className="font-medium">Bust</div>
                <div className="font-medium">Waist</div>
                <div>XS</div><div>31–32</div><div>24–25</div>
                <div>S</div><div>33–34</div><div>26–27</div>
                <div>M</div><div>35–36</div><div>28–29</div>
                <div>L</div><div>37–38</div><div>30–31</div>
                <div>XL</div><div>39–40</div><div>32–33</div>
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
                {product.fullDescription}
              </p>
            </div>
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
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-xl text-dwapor-amber mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-dwapor-soft-gray text-sm mb-3">
                        {relatedProduct.shortDescription}
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