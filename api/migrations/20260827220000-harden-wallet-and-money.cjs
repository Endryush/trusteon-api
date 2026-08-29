'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const decimal = {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }

    await queryInterface.changeColumn('wallet', 'total_amount', decimal)
    await queryInterface.changeColumn('trusteon_comissioned', 'total_amount', decimal)
    await queryInterface.changeColumn('orders', 'total_amount', decimal)
    await queryInterface.changeColumn('products', 'total_amount', decimal)

    const commissioned = await queryInterface.describeTable('trusteon_comissioned')
    if (!commissioned.commission_rate) {
      await queryInterface.addColumn('trusteon_comissioned', 'commission_rate', {
        type: Sequelize.DECIMAL(5, 4),
        allowNull: false,
        defaultValue: 0.15
      })
    }

    await queryInterface.addIndex('wallet', ['order_id'], {
      unique: true,
      name: 'wallet_order_id_unique'
    })
    await queryInterface.addIndex('trusteon_comissioned', ['order_id'], {
      unique: true,
      name: 'trusteon_comissioned_order_id_unique'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('wallet', 'wallet_order_id_unique')
    await queryInterface.removeIndex('trusteon_comissioned', 'trusteon_comissioned_order_id_unique')
    await queryInterface.removeColumn('trusteon_comissioned', 'commission_rate')

    const dbl = {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
    await queryInterface.changeColumn('wallet', 'total_amount', dbl)
    await queryInterface.changeColumn('trusteon_comissioned', 'total_amount', dbl)
    await queryInterface.changeColumn('orders', 'total_amount', dbl)
    await queryInterface.changeColumn('products', 'total_amount', dbl)
  }
};
