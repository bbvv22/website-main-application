const express = require('express');
const { DataTypes, Model } = require('sequelize');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Debug info
console.log('🚀 STARTING SERVER.JS - VERSION 2025-08-22-FIXED');
console.log('📁 Working Directory:', process.cwd());
console.log('📁 Script Directory:', __dirname);

// Request logging
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// Core middleware
app.use(cors());
app.use(express.json());



console.log('✅ Core middleware initialized');

// Database setup
const db = require('./models');
const sequelize = db.sequelize;

console.log('✅ Models and associations configured');

// Import routes
console.log('📡 Loading route modules...');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews'); // New: Import review routes
console.log('✅ All route modules loaded successfully');

// Health check routes
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/test', (req, res) => {
  console.log('🧪 Test endpoint hit');
  res.json({
    message: 'Server is running correctly',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API is operational',
    timestamp: new Date().toISOString()
  });
});

// Removed: app.get('/api/reviews/:productId', (req, res) => { res.json([]); }); // Removed placeholder

// Mount API routes
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes mounted at /api/auth');

app.use('/api/user', userRoutes);
console.log('✅ User routes mounted at /api/user');

app.use('/api/products', productRoutes);
console.log('✅ Products routes mounted at /api/products');

app.use('/api/cart', cartRoutes);
console.log('✅ Cart routes mounted at /api/cart');

app.use('/api/wishlist', wishlistRoutes);
console.log('✅ Wishlist routes mounted at /api/wishlist');

app.use('/api/orders', orderRoutes);
console.log('✅ Orders routes mounted at /api/orders');

app.use('/api/reviews', reviewRoutes); // New: Mount review routes
console.log('✅ Review routes mounted at /api/reviews'); // New: Log review routes

// ✅ SAFE 404 handler - NO WILDCARDS
app.use((req, res) => {
  console.log(`❌ 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err);
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Server startup
async function initializeServer() {
  try {
    console.log('⚡ Initializing server...');

    await sequelize.authenticate();
    console.log('✅ Database connection verified');

    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized');

    const server = app.listen(port, () => {
      console.log(`
🎉 SERVER READY!
`);
      console.log(`🌐 Listening on: http://localhost:${port}`);
      console.log(`🕒 Started at: ${new Date().toISOString()}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      
      console.log(`
🧪 Test these endpoints:
`);
      console.log(`   curl http://localhost:${port}/test`);
      console.log(`   curl http://localhost:${port}/api/status`);
      console.log(`   curl http://localhost:${port}/api/products`);
      console.log(`
👀 Watch for "📥" logs for incoming requests
`);
    });

    return server;
    
  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received shutdown signal...');
  try {
    await sequelize.close();
    console.log('✅ Database connections closed');
    console.log('✅ Server shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
initializeServer();

module.exports = { app, sequelize };