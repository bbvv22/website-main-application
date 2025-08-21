import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Define your API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL || 'http://localhost:8000/api/auth';

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

  const refreshUserData = async () => {
    if (user && user.id) {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${user.id}/details`);
        if (response.status === 200) {
          const fullDetails = response.data;
          setUser((prevUser) => ({ ...prevUser, ...fullDetails }));
          return fullDetails;
        }
      } catch (error) {
        console.error('Failed to refresh user details:', error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchFullUserDetails = async () => {
      if (user && user.id && !user.firstName) { // Only fetch if full details are missing
        await refreshUserData();
      }
    };

    fetchFullUserDetails();
  }, [user?.id]); // Depend only on user.id

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/signin`, { email, password });
      const { token, userId } = response.data;

      // In a real app, you'd decode the token or fetch user details
      // For now, we'll create a mock user object from the response
      const loggedInUser = {
        id: userId,
        email: email,
        // You might want to fetch username from backend if available
        name: email.split('@')[0],
      };

      setUser(loggedInUser);
      return { success: true, user: loggedInUser };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || 'Authentication failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/signup`, { username: name, email, password });
      // If signup is successful and OTP is sent, backend returns 201
      return { success: true, user: { email }, message: response.data.message, otpSent: true };
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      if (error.response && error.response.status === 409) {
        return { success: false, error: error.response.data.message };
      }
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dwapor-user');
    localStorage.removeItem('dwapor-cart'); // Clear cart on logout
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/verify-otp`, { email, otp });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('OTP verification error:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || 'OTP verification failed' };
    }
  };

  const resendOtp = async (email) => {
    try {
      // For resending OTP, we can reuse the signup endpoint if it handles sending OTPs for existing emails
      // Or create a dedicated /resend-otp endpoint in the backend
      const response = await axios.post(`${AUTH_API_URL}/signup`, { email, resend: true }); // Assuming backend can handle a 'resend' flag
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Resend OTP error:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || 'Failed to resend OTP' };
    }
  };

  const updateUserData = async (userData) => {
    if (user && user.id) {
      try {
        const response = await axios.post(`${API_BASE_URL}/user/${user.id}/details`, userData);
        if (response.status === 200) {
          const updatedUser = response.data;
          setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
          return { success: true, user: updatedUser };
        }
      } catch (error) {
        console.error('Failed to update user details:', error);
        return { success: false, error: 'Failed to update user details' };
      }
    }
    return { success: false, error: 'User not authenticated' };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    verifyOtp,
    resendOtp,
    refreshUserData, // Add refreshUserData to the context
    updateUserData,
    isAuthenticated: !!user,
    setUser
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