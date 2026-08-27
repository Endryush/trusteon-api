'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('wallet')

    // A migration de criação declarou author_id duas vezes, então order_id
    // nunca chegou a ser criada apesar de o model exigir a coluna.
    if (columns.order_id) return

    await queryInterface.addColumn('wallet', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('wallet', 'order_id')
  }
};
