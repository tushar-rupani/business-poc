'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      // Define associations here if needed
      Business.hasMany(models.CategoryBusiness, {
        foreignKey: 'businessId',
        as: 'catBusiness'
      });
    }
  }

  Business.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    link: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    rating: {
      allowNull: true,
      defaultValue: 0,
      type: DataTypes.FLOAT,
    },
    contactNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    totalRatings: {
      allowNull: true,
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    photos: {
      allowNull: true,
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    popularity: {
      allowNull: true,
      type: DataTypes.FLOAT
    },
    region: {
      allowNull: false,
      type: DataTypes.STRING
    },
    platform: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Business',
  });

  return Business;
};
