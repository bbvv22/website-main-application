const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {}
  ProductImage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: true, // Assuming sort_order can be null
    },
  }, {
    sequelize,
    modelName: 'ProductImage',
    tableName: 'product_images',
    timestamps: false, // Assuming no createdAt/updatedAt for product_images
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return ProductImage;
};