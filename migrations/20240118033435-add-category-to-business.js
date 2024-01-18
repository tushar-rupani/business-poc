'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Businesses", "categories", {
      allowNull: true,
      type: Sequelize.JSONB,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Businesses", "categories", {
      allowNull: true,
      type: Sequelize.JSONB,
    });
  }
};
