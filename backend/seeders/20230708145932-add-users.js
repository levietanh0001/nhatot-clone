'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { randomOption } = require('../src/utils/random.util');

const users = [...Array(10000)].map((user) => (
  {
    email: faker.internet.email(),
    password: faker.internet.password(),
    isVerified: Math.round(Math.random()),
    role: randomOption(['canhan', 'moigioi']),
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
