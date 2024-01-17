'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Businesses", "platform", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Businesses", "platform", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  }
};
