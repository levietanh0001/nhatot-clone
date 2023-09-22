'use strict';

const { faker: fakerVn } = require('@faker-js/faker/locale/vi');
const { faker: fakerEn } = require('@faker-js/faker/locale/en');
const bcrypt = require('bcryptjs');
const { randomOption } = require('../src/utils/random.util');

const users = [...Array(1000)].map(() => {

  const email = fakerVn.internet.email();
  const username = email.split('@')[0];
  const realPassword = fakerEn.lorem.word({ length: { min: 6, max: 8 } });
  const password = bcrypt.hashSync(realPassword, 12);

  return {
    email,
    username,
    realPassword,
    password,
    isVerified: Math.round(Math.random()),
    role: randomOption(['canhan', 'moigioi']),
    createdAt: new Date(),
    updatedAt: new Date()
  };

})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
