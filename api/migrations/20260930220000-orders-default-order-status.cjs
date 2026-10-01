'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(`
      UPDATE orders
      SET order_status = 1
      WHERE order_status IS NULL
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE orders
      ALTER COLUMN order_status SET DEFAULT 1,
      ALTER COLUMN order_status SET NOT NULL
    `)
  },

  async down (queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE orders
      ALTER COLUMN order_status DROP NOT NULL,
      ALTER COLUMN order_status DROP DEFAULT
    `)
  }
};
