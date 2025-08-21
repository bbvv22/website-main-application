import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth provides verifyOtp and resendOtp

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, resendOtp } = useAuth(); // Assuming these functions exist in AuthContext

  const email = location.state?.email; // Get email from navigation state

  if (!email) {
    // If email is not present, redirect to signup or home
    navigate('/login', { replace: true });
    return null; // Don't render anything
  }

  const handleChange = (e) => {
    setOtp(e.target.value);
    if (error) setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResendMessage('');

    if (otp.length !== 6 || !/\d{6}/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp(email, otp);
      if (result.success) {
        navigate('/address', { state: { message: 'Email verified successfully!' } });
      } else {
        setError(result.error || 'OTP verification failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred during OTP verification.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setResendMessage('');
    setError('');
    try {
      const result = await resendOtp(email); // Assuming resendOtp takes email
      if (result.success) {
        setResendMessage('New OTP sent to your email.');
      } else {
        setError(result.error || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred while resending OTP.');
      console.error('Resend OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dwapor-museum pt-48">
      <div className="max-w-md mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="font-serif text-3xl text-dwapor-amber text-center mb-8">
            Verify Your Email
          </h1>

          <p className="text-center text-dwapor-soft-gray mb-6">
            An OTP has been sent to <strong>{email}</strong>. Please enter it below to verify your email address.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {resendMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
              {resendMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-dwapor-soft-gray text-sm font-medium mb-2">
                One-Time Password (OTP)
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleChange}
                maxLength="6"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dwapor-amber ${
                  error ? 'border-red-500' : 'border-dwapor-soft-gray/30'
                }`}
                placeholder="Enter 6-digit OTP"
                inputMode="numeric"
                pattern="[0-9]{6}"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-dwapor-amber text-dwapor-museum py-3 px-6 rounded-lg font-sans text-sm uppercase tracking-wider hover:bg-dwapor-gold transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-dwapor-soft-gray text-sm">
              Didn't receive the OTP?{' '}
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="text-dwapor-amber hover:text-dwapor-gold ml-1 font-medium disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OtpVerification;
