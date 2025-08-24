'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('otps', 'sent_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('otps', 'sent_at');
  }
};