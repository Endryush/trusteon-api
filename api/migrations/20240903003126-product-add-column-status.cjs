'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'service_status', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'services_status',
        key: 'id'
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'service_status')
  }
};
