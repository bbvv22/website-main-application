import React, { createContext, useContext, useState, useEffect } from 'react';

// Auth Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dwapor-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('dwapor-user');
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('dwapor-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dwapor-user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual authentication
      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Simulate API call - replace with actual registration
      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dwapor-user');
    localStorage.removeItem('dwapor-cart'); // Clear cart on logout
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};