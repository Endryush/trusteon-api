'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('author_feedbacks', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false, 
      references: {
        model: 'orders',
        key: 'id',
      },
    });
    await queryInterface.changeColumn('client_feedbacks', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false, 
      references: {
        model: 'orders',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('author_feedbacks', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    });
    await queryInterface.changeColumn('client_feedbacks', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    });
  }
};
