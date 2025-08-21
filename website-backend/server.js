const express = require('express');
const { DataTypes, Model } = require('sequelize');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Enable middleware
app.use(cors());
app.use(express.json());

console.log('✅ Middleware enabled and ready');

// Database connection
const sequelize = require('./models');

// Import Models
const User = require('./models/user');
const Otp = require('./models/otp');
const StatusCheck = require('./models/statuscheck');
const Order = require('./models/order');
const OrderItem = require('./models/orderitem');
const Review = require('./models/review');

// Associations
Order.hasMany(OrderItem, { as: 'items', onDelete: 'CASCADE', hooks: true });
OrderItem.belongsTo(Order);


// ===============================
// BASIC API ROUTES
// ===============================

// Test route
app.get("/test", (req, res) => {
  res.json({ msg: "Server is working!" });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: 'connected',
    server: 'running'
  });
});

// Get all users endpoint
app.get('/api/reviews/:productId', (req, res) => {
  res.json([]); // Return empty array for now
});

// ===============================
// USER ROUTES (SEPARATE FILE)
// ===============================

// Mount user routes from separate file
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ===============================
// ERROR HANDLING
// ===============================

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Global error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ===============================
// SERVER STARTUP
// ===============================

async function startServer() {
  try {
    console.log('🚀 Starting server...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('✅ All models synchronized successfully');

    // Start Express server
    app.listen(port, () => {
      console.log(`🌐 Server running on http://localhost:${port}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server gracefully...');
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

startServer();

module.exports = { sequelize };
