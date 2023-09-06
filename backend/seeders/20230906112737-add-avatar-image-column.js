'use strict';

const { databaseName } = require('../src/utils/variables.util');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.sequelize.query(`
      ALTER TABLE ${databaseName}.user_profile
      ADD COLUMN avatarUrl TEXT
      AFTER phoneNumber
    `);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
