const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Otp } = require('../models');
const transporter = require('../utils/mailer');

// Function to send OTP email
async function sendOtpEmail(email, otp) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Your OTP for Dwapor Verification',
        html: `<div style="font-family: sans-serif; text-align: center; padding: 20px;">
                 <h2>Welcome to Dwapor!</h2>
                 <p>Thank you for signing up. Please use the following One-Time Password (OTP) to verify your email address.</p>
                 <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">${otp}</p>
                 <p>This OTP is valid for 10 minutes.</p>
                 <p>If you did not request this, please ignore this email.</p>
               </div>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent to ${email}`);
    } catch (error) {
        console.error(`❌ Error sending OTP email to ${email}:`, error);
        throw new Error('Failed to send OTP email.'); // Propagate error to be caught by the route handler
    }
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

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Rate Limiting Logic
    const existingOtp = await Otp.findOne({ where: { email } });
    if (existingOtp && existingOtp.sent_at) {
        const now = new Date();
        const lastSent = new Date(existingOtp.sent_at);
        const secondsDiff = (now.getTime() - lastSent.getTime()) / 1000;
        if (secondsDiff < 60) {
            return res.status(429).json({ 
                success: false, 
                message: 'Please wait a minute before requesting another OTP.' 
            });
        }
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const sent_at = new Date();

    // Store OTP with hashed password and sent_at timestamp
    await Otp.upsert({
      email: email,
      otp: otp,
      username: username,
      hashedPassword: hashedPassword,
      expiresAt: expiresAt,
      sent_at: sent_at
    });

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: `OTP sent to ${email}`,
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup'
    });
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
// routes/auth.js - Fix the verify-otp route

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('🔐 OTP verification for:', email);

    // Find OTP record
    const otpRecord = await Otp.findOne({
      where: {
        email: email,
        otp: otp
      }
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or email'
      });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user with hashed password from OTP record
    const newUser = await User.create({
      username: otpRecord.username,
      email: otpRecord.email,
      password: otpRecord.hashedPassword,  // ✅ KEY FIX: Use hashedPassword from OTP
      isEmailVerified: true
    });

    // Clean up - remove OTP record after successful verification
    await otpRecord.destroy();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ User created successfully:', newUser.email);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token: token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        isEmailVerified: newUser.isEmailVerified
      }
    });

  } catch (error) {
    console.error('❌ OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during verification'
    });
  }
});


module.exports = router;
