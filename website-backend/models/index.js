const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Initialize Sequelize instance
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
      },
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: path.resolve(__dirname, '../db.sqlite'),
      logging: false,
    });

module.exports = sequelize;