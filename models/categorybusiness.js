"use strict";
const { Model } = require("sequelize");
const db = require("./index");
const { Category, Business } = db;
module.exports = (sequelize, DataTypes) => {
  class CategoryBusiness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryBusiness.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });

      CategoryBusiness.belongsTo(models.Business, {
        foreignKey: "businessId",
        as: "business",
      });
    }
  }
  CategoryBusiness.init(
    {
      categoryId: {
        type: DataTypes.STRING,
        references: { model: Category, key: "name" },
      },
      businessId: {
        type: DataTypes.INTEGER,
        references: { model: Category, key: "id" },
      },
    },
    {
      sequelize,
      modelName: "CategoryBusiness",
    }
  );
  return CategoryBusiness;
};
