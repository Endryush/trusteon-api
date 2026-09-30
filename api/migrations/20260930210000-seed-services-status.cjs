'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    // IDs precisam bater com api/enums/status.enum.js (ALL_STATUS_ID)
    await queryInterface.bulkInsert('services_status', [
      { id: 1, status: 'Aberto' },
      { id: 2, status: 'Lista de espera' },
      { id: 3, status: 'Fechado' },
      { id: 4, status: 'Não listado' },
      { id: 5, status: 'Em andamento' },
      { id: 6, status: 'Aguardando aprovação' },
      { id: 7, status: 'Revisão pendente' },
      { id: 8, status: 'Aprovado' }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('services_status', {
      id: [1, 2, 3, 4, 5, 6, 7, 8]
    })
  }
};
