const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {}

  Cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID, // Should also be UUID to match User model
      allowNull: false,
      references: {
        model: 'users', // Use string for model name here
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID, // ✅ CHANGE FROM INTEGER to UUID
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'carts',
    timestamps: true,
    sequelize
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return Cart;
};