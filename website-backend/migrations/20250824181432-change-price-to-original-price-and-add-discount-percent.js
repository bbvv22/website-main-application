'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'original_price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
    await queryInterface.addColumn('products', 'discount_percent', {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0.00,
      allowNull: true,
    });
    await queryInterface.addColumn('products', 'is_on_sale', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'original_price');
    await queryInterface.removeColumn('products', 'discount_percent');
    await queryInterface.removeColumn('products', 'is_on_sale');
  }
};
