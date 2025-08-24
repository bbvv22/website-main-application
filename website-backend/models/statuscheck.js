const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusCheck extends Model {}
  StatusCheck.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'StatusCheck',
    tableName: 'status_checks',
    timestamps: false,
  });

  return StatusCheck;
};