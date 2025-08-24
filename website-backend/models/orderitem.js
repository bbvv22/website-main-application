const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {}
  OrderItem.init({
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false,
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    OrderItem.hasMany(models.ReturnRequest, { foreignKey: 'order_item_id', as: 'returnRequests' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' }); // Added Product association
  };

  return OrderItem;
};