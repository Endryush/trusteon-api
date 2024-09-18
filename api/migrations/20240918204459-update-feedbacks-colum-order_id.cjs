'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('client_feedbacks', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references:{
        model: 'orders',
        key: 'id'
      }
    })
    await queryInterface.addColumn('author_feedbacks', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references:{
        model: 'orders',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('author_feedbacks', 'order_id')
    await queryInterface.removeColumn('client_feedbacks', 'order_id')
  }
};
