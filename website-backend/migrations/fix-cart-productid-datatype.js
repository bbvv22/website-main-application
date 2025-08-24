'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Change productId from INTEGER to UUID
    await queryInterface.changeColumn('carts', 'productId', {
      type: Sequelize.UUID,
      allowNull: false
    });
    
    // Also ensure userId is UUID if it isn't already
    await queryInterface.changeColumn('carts', 'userId', {
      type: Sequelize.UUID,
      allowNull: false
    });
    
    console.log('✅ Cart productId and userId changed to UUID');
  },

  async down(queryInterface, Sequelize) {
    // Rollback - change back to INTEGER (only if you need to rollback)
    await queryInterface.changeColumn('carts', 'productId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};