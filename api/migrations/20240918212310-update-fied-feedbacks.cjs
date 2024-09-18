'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('author_feedbacks', 'questionId', 'question_id')
    await queryInterface.renameColumn('author_feedbacks', 'userId', 'user_id')
    
    await queryInterface.renameColumn('client_feedbacks', 'questionId', 'question_id')
    await queryInterface.renameColumn('client_feedbacks', 'userId', 'user_id')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('author_feedbacks', 'question_id', 'questionId')
    await queryInterface.renameColumn('author_feedbacks', 'user_id', 'userId')
    
    await queryInterface.renameColumn('client_feedbacks', 'question_id', 'questionId')
    await queryInterface.renameColumn('client_feedbacks', 'user_id', 'userId')
  }
};
