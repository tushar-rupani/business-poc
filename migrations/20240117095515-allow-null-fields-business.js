'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Businesses', 'link', {
      allowNull: true,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Businesses', 'description', {
      allowNull: true,
      type: Sequelize.TEXT,
    });    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Businesses', 'link', {
      allowNull: false,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Businesses', 'description', {
      allowNull: false,
      type: Sequelize.TEXT,
    });

  }
};
