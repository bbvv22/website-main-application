const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

class Order extends Model {}
Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Processing',
  },
  delivery_date: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;