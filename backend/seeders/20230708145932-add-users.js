'use strict';

const { faker } = require('@faker-js/faker/locale/vi');

const users = [...Array(10000)].map((user) => (
  {
    // userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isVerified: Math.round(Math.random()),
    isBroker: Math.round(Math.random()),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
