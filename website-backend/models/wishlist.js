const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {}

  Wishlist.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', // Use string for model name here
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Wishlist',
    tableName: 'wishlists',
    timestamps: true,
  });

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Wishlist;
};