import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ScrollToTop';
import DwaporLanding from './components/DwaporLanding';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutSection from './components/AboutSection';
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingDelivery from './pages/ShippingDelivery';
import ReturnExchange from './pages/ReturnExchange';
import FAQ from './pages/FAQ';
import OrderDetails from './pages/OrderDetails';
import TermsOfService from './pages/TermsOfService';

import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<DwaporLanding />} />
          <Route path="/collections" element={
            <>
              <Header />
              <Collections />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              <div className="pt-20">
                <AboutSection />
              </div>
              <Footer />
            </>
          } />
          <Route path="/product/:id" element={
            <>
              <Header />
              <ProductDetail />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <>
                <Header />
                <Checkout />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/order-success" element={
            <ProtectedRoute>
              <>
                <Header />
                <OrderSuccess />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <>
                <Header />
                <Orders />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/orders/:orderId" element={
            <ProtectedRoute>
              <>
                <Header />
                <OrderDetails />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <>
                <Header />
                <Wishlist />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            </ProtectedRoute>
          } />
          <Route path="/privacy-policy" element={
            <>
              <Header />
              <PrivacyPolicy />
              <Footer />
            </>
          } />
          <Route path="/shipping-delivery" element={
            <>
              <Header />
              <ShippingDelivery />
              <Footer />
            </>
          } />
          <Route path="/return-exchange" element={
            <>
              <Header />
              <ReturnExchange />
              <Footer />
            </>
          } />
          <Route path="/faq" element={
            <>
              <Header />
              <FAQ />
              <Footer />
            </>
          } />
          <Route path="/terms-of-service" element={
            <>
              <Header />
              <TermsOfService />
              <Footer />
            </>
          } />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="App bg-dwapor-museum min-h-screen">
            <AnimatedRoutes />
          </div>
        </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;