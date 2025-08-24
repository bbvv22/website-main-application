'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'features', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('products', 'care', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'features');
    await queryInterface.removeColumn('products', 'care');
  }
};