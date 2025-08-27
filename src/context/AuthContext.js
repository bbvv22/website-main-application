import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Define your API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;

// Auth Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('dwapor-token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('dwapor-token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dwapor-user');
    console.log('Saved user from localStorage:', savedUser);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log('Parsed user:', parsedUser);
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
      const { token, user } = response.data;
      const nameParts = user.username ? user.username.split(' ') : ['', ''];
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      const userWithFullName = { ...user, firstName, lastName };
      localStorage.setItem('dwapor-token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setToken(token);
      setUser(userWithFullName);
      return { success: true, user: userWithFullName };
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
    setToken(null);
    localStorage.removeItem('dwapor-user');
    localStorage.removeItem('dwapor-cart'); // Clear cart on logout
    localStorage.removeItem('dwapor-token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/verify-otp`, { email, otp });
      const { token, user } = response.data;
      const nameParts = user.username ? user.username.split(' ') : ['', ''];
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      const userWithFullName = { ...user, firstName, lastName };
      localStorage.setItem('dwapor-token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setToken(token);
      setUser(userWithFullName);
      return { success: true, message: response.data.message, user: userWithFullName };
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
    setUser,
    token, // Expose token from context
    user, // Expose user from context
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