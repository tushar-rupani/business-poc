'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rating: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      contactNumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      totalRatings: {
        allowNull: true,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      photos: {
        allowNull: true,
        type: Sequelize.JSONB,
        defaultValue: []
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Businesses');
  }
};