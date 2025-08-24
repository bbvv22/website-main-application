const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 20,
        min: 5,
        acquire: 30000,
        idle: 10000,
      },
      retry: {
        match: [
          /ConnectionError/,
          /ConnectionRefusedError/,
          /ConnectionTimedOutError/,
          /TimeoutError/,
        ],
        max: 3,
      },
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: path.resolve(__dirname, '../db.sqlite'),
      logging: false,
    });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Order = require('./order')(sequelize, DataTypes);
db.OrderItem = require('./orderitem')(sequelize, DataTypes);
db.ReturnRequest = require('./returnrequest')(sequelize, DataTypes);
db.Review = require('./review')(sequelize, DataTypes);
db.Cart = require('./cart')(sequelize, DataTypes);
db.Wishlist = require('./wishlist')(sequelize, DataTypes);
db.Otp = require('./otp')(sequelize, DataTypes);
db.StatusCheck = require('./statuscheck')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes); // Added Product model
db.ProductImage = require('./productimage')(sequelize, DataTypes); // Added ProductImage model

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

if (process.env.NODE_ENV === 'development') {
  testConnection();
}

module.exports = db;