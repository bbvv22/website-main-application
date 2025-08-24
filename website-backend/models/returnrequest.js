const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReturnRequest extends Model {}

  ReturnRequest.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    request_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [['return', 'exchange']],
      },
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ReturnRequest',
    tableName: 'return_requests',
    timestamps: true, // created_at and updated_at are in your schema
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  // Define associations (assuming Order, OrderItem, User models exist)
  ReturnRequest.associate = (models) => {
    ReturnRequest.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    ReturnRequest.belongsTo(models.OrderItem, { foreignKey: 'order_item_id', as: 'orderItem' });
    ReturnRequest.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return ReturnRequest;
};