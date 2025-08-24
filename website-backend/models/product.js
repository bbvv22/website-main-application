const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    features: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    care: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    discount_percent: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00,
      allowNull: true
    },
    is_on_sale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sizes: {
      type: DataTypes.JSON, // Storing as JSON to hold an array of strings
      allowNull: true,
      defaultValue: [],
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true, // Keep this as true
  });

  Product.associate = (models) => {
    Product.hasMany(models.ProductImage, { foreignKey: 'product_id', as: 'images' });
  };

  return Product;
};