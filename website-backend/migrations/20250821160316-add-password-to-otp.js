// migrations/XXXXXX-add-password-to-otp.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('otps', 'hashedPassword', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''  // ✅ Specify default value
    });
    
    await queryInterface.addColumn('otps', 'username', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('otps', 'hashedPassword');
    await queryInterface.removeColumn('otps', 'username');
  }
};
