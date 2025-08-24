const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {}
  Review.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false,
  });

  return Review;
};