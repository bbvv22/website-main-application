import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import DwaporLanding from './components/DwaporLanding';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import OtpVerification from './pages/OtpVerification'; // New import
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';

import AboutSection from './components/AboutSection';
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingDelivery from './pages/ShippingDelivery';
import ReturnExchange from './pages/ReturnExchange';
import FAQ from './pages/FAQ';
import OrderDetails from './pages/OrderDetails';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import SizeGuide from './pages/SizeGuide';
import Address from './pages/Address'; // Import Address component

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
        onAnimationComplete={() => window.scrollTo(0, 0)}
      >
        <Routes location={location}>
          <Route path="/" element={<DwaporLanding />} />
          <Route path="/collections" element={
            <Layout>
              <Collections />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout>
              <AboutSection />
            </Layout>
          } />
          <Route path="/product/:id" element={
            <Layout>
              <ProductDetail />
            </Layout>
          } />
          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          <Route path="/otp-verification" element={ // New route
            <Layout>
              <OtpVerification />
            </Layout>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Layout>
                <Checkout />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/order-success" element={
            <ProtectedRoute>
              <Layout>
                <OrderSuccess />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/orders/:orderId" element={
            <ProtectedRoute>
              <Layout>
                <OrderDetails />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Layout>
                <Wishlist />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/privacy-policy" element={
            <Layout>
              <PrivacyPolicy />
            </Layout>
          } />
          <Route path="/shipping-delivery" element={
            <Layout>
              <ShippingDelivery />
            </Layout>
          } />
          <Route path="/return-exchange" element={
            <Layout>
              <ReturnExchange />
            </Layout>
          } />
          <Route path="/faq" element={
            <Layout>
              <FAQ />
            </Layout>
          } />
          <Route path="/terms-of-service" element={
            <Layout>
              <TermsOfService />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <ContactUs />
            </Layout>
          } />
          <Route path="/size-guide" element={
            <Layout>
              <SizeGuide />
            </Layout>
          } />
          <Route path="/address" element={
            <Layout>
              <Address />
            </Layout>
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