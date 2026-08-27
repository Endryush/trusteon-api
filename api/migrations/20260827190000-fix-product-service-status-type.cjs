'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('products')
    const current = columns.service_status

    if (current && current.type === 'INTEGER') {
      // A coluna ficou como INTEGER com FK para services_status, mas a aplicação
      // grava o status como texto. Remover descarta a constraint junto.
      await queryInterface.removeColumn('products', 'service_status')
    }

    if (!current || current.type === 'INTEGER') {
      await queryInterface.addColumn('products', 'service_status', {
        type: Sequelize.STRING,
        allowNull: true
      })
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'service_status')
    await queryInterface.addColumn('products', 'service_status', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'services_status',
        key: 'id'
      }
    })
  }
};
