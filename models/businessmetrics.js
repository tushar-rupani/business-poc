'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessMetrics extends Model {
    static associate(models) {
      // define association here
      BusinessMetrics.belongsTo(models.Business, {
        foreignKey: 'placeId',
        as: 'businessMs'
      });
    }
  }
  BusinessMetrics.init({
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    popularity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    placeId: {
      type: DataTypes.STRING
    },
    totalPhotosCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'BusinessMetrics',
  });
  return BusinessMetrics;
};