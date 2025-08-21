import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);

  const location = useLocation();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setIsHidden(y > lastY && y > 120);
      setIsTransparent(y < 40 && location.pathname === '/');
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const navItems = ['Home', 'Collections', 'About'];

  const getNavPath = (item) => {
    switch(item) {
      case 'Home': return '/';
      case 'Collections': return '/collections';
      case 'About': return '/about';
      case 'Login': return '/login';
      default: return '/';
    }
  };

  const isActive = (item) => {
    const path = getNavPath(item);
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      navigate('/login');
    }
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <>
      <motion.header 
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isHidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`${isTransparent ? 'bg-transparent' : 'bg-dwapor-museum/95 backdrop-blur-sm'} fixed top-0 left-0 right-0 z-50 border-b border-dwapor-gold/20`}
      >
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <Logo size="default" className="cursor-pointer" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navItems.map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }}>
                  <Link
                    to={getNavPath(item)}
                    className={`font-sans text-sm uppercase tracking-widest transition-colors duration-300 ${
                      isActive(item) 
                        ? 'text-dwapor-gold' 
                        : 'text-dwapor-parchment hover:text-dwapor-gold'
                    }`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              {!isAuthenticated && (
                <motion.div whileHover={{ y: -2 }}>
                  <Link
                    to="/login"
                    className={`font-sans text-sm uppercase tracking-widest transition-colors duration-300 ${
                      location.pathname === '/login' 
                        ? 'text-dwapor-gold' 
                        : 'text-dwapor-parchment hover:text-dwapor-gold'
                    }`}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </nav>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Search */}
              <motion.button 
                whileHover={{ scale: 1.1, color: '#c19a6b' }}
                whileTap={{ scale: 0.95 }}
                className="text-dwapor-beige hover:text-dwapor-gold transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              
              {/* Cart */}
              <motion.button 
                whileHover={{ scale: 1.1, color: '#c19a6b' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="text-dwapor-beige hover:text-dwapor-gold transition-colors relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-dwapor-amber text-dwapor-museum text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </motion.button>
              
              {/* User Account */}
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#c19a6b' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAuthAction}
                  className="text-dwapor-beige hover:text-dwapor-gold transition-colors"
                  aria-label="User Account"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.button>

                {/* User Dropdown Menu */}
                {isAuthenticated && isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-dwapor-soft-gray/20">
                      <p className="text-dwapor-amber font-medium text-sm">Hello, {user?.name}</p>
                    </div>
                    <Link to="/profile" className="block w-full text-left px-4 py-2 text-dwapor-soft-gray hover:bg-dwapor-amber/10 hover:text-dwapor-amber transition-colors text-sm">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block w-full text-left px-4 py-2 text-dwapor-soft-gray hover:bg-dwapor-amber/10 hover:text-dwapor-amber transition-colors text-sm">
                      My Orders
                    </Link>
                    <Link to="/wishlist" className="block w-full text-left px-4 py-2 text-dwapor-soft-gray hover:bg-dwapor-amber/10 hover:text-dwapor-amber transition-colors text-sm">
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-dwapor-soft-gray hover:bg-dwapor-amber/10 hover:text-dwapor-amber transition-colors text-sm border-t border-dwapor-soft-gray/20"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-6 md:hidden">
              {/* Cart */}
              <motion.button 
                whileHover={{ scale: 1.1, color: '#c19a6b' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="text-dwapor-beige hover:text-dwapor-gold transition-colors relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-dwapor-amber text-dwapor-museum text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-dwapor-beige hover:text-dwapor-gold transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <nav className="py-8 space-y-6">
              {navItems.map((item) => (
                <motion.div key={item} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={getNavPath(item)}
                    className={`block text-sm font-sans uppercase tracking-widest transition-colors ${
                      isActive(item) 
                        ? 'text-dwapor-gold' 
                        : 'text-dwapor-parchment hover:text-dwapor-gold'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              {!isAuthenticated && (
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className={`block text-sm font-sans uppercase tracking-widest transition-colors ${
                      location.pathname === '/login' 
                        ? 'text-dwapor-gold' 
                        : 'text-dwapor-parchment hover:text-dwapor-gold'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        </div>

        {/* Click outside to close user menu */}
        {isUserMenuOpen && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsUserMenuOpen(false)}
          />
        )}
      </motion.header>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;