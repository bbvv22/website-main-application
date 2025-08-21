const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const Otp = require('../models/otp');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send OTP email
async function sendOtpEmail(email, otp) {
    console.log(`Mock OTP for ${email}: ${otp}`);
    // Replace the actual email sending logic with a console log for testing purposes
}


// Helper function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('📝 Signup request:', { username, email });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists (registered but not verified)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.isEmailVerified) {
      return res.status(409).json({ message: 'User already exists and is verified' });
    }

    // If user exists but not verified, we can update their password and resend OTP
    if (existingUser && !existingUser.isEmailVerified) {
      await existingUser.update({ password: hashedPassword });
      // Proceed to send new OTP
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save OTP and temporary user details to database
    await Otp.upsert({ email, otp: otpCode, expiresAt, username, password: hashedPassword }); // upsert will create or update

    // Send OTP email (or log for testing)
    await sendOtpEmail(email, otpCode);

    console.log(`✅ OTP sent to ${email}`);

    res.status(200).json({
      message: 'OTP sent successfully. Please verify your email.',
      otpSent: true // Indicate to frontend that OTP was sent
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Sign in route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔑 Login attempt for:', email);

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    ); // TODO: Remove 'your-secret-key' fallback in production

    console.log('✅ Login successful for:', email);

    res.json({
      message: 'Login successful',
      token,
      userId: user.id,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ Signin error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Verify OTP route (simplified for testing)
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('🔐 OTP verification for:', email);
    
    // Find the OTP in the database
    const storedOtp = await Otp.findOne({ where: { email, otp } });

    if (!storedOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (new Date() > storedOtp.expiresAt) {
      await Otp.destroy({ where: { email } }); // Clean up expired OTP
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // If OTP is valid, create the user (if not already created)
    let user = await User.findOne({ where: { email } });
    if (!user) {
      // Retrieve username and password from the stored OTP record
      const { username, password: hashedPassword } = storedOtp;

      user = await User.create({
        username,
        email,
        password: hashedPassword,
        isEmailVerified: true,
      });
    } else if (!user.isEmailVerified) {
      // If user exists but is not verified, update their status
      await user.update({ isEmailVerified: true });
    }

    // Delete the OTP from the database
    await Otp.destroy({ where: { email } });

    console.log('✅ Email verified for:', email);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('❌ OTP verification error:', error);
    res.status(500).json({ message: 'OTP verification failed' });
  }
});

module.exports = router;
