const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {}
  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    coupon_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Processing',
    },
    delivery_date: {
      type: DataTypes.DATE,
    },
    customer_info: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    shipping_address: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    billing_address: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
    Order.hasMany(models.ReturnRequest, { foreignKey: 'order_id', as: 'returnRequests' });
    Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Order;
};