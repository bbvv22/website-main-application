// models/otp.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Otp = sequelize.define('Otp', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 6]  // Ensure 6-digit OTP
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''  // ✅ Prevents SQLite error
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''  // ✅ Prevents SQLite error
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  },
}, {
  tableName: 'otps',
  timestamps: true,  // Add createdAt for tracking
  indexes: [
    { fields: ['email'] },
    { fields: ['expiresAt'] }
  ]
});

module.exports = Otp;
