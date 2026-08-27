'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('products')

    // A migration anterior criou service_status como INTEGER com FK para
    // services_status; remover a coluna descarta a constraint junto.
    if (columns.service_status) {
      await queryInterface.removeColumn('products', 'service_status')
    }

    await queryInterface.addColumn('products', 'service_status', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'service_status')
  }
};
