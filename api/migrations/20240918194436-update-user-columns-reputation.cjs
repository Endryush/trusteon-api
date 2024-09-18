'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'author_reputation', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    })
    await queryInterface.renameColumn('users', 'reputation', 'user_reputation')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'author_reputation')
    await queryInterface.renameColumn('users', 'user_reputation', 'reputation')
  }
};
