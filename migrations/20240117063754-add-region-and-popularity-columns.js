"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Businesses", "popularity", {
      allowNull: true,
      type: Sequelize.FLOAT,
    });

    await queryInterface.addColumn("Businesses", "region", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Businesses', 'popularity');
    await queryInterface.removeColumn('Businesses', 'region');
  },
};
