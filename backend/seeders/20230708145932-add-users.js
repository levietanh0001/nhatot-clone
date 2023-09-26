'use strict';

const { faker: fakerVn } = require('@faker-js/faker/locale/vi');
const { faker: fakerEn } = require('@faker-js/faker/locale/en');
const bcrypt = require('bcryptjs');
const { randomOption } = require('../src/utils/random.util');
const { QueryTypes } = require('sequelize');

const usersPromise = Promise.all([...Array(20)].map(async () => {

  const email = fakerVn.internet.email();
  const username = email.split('@')[0];
  const realPassword = fakerEn.lorem.word({ length: { min: 6, max: 8 } });
  const password = await bcrypt.hash(realPassword, 12);

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

}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = await usersPromise;
    let userList;
    const results = await queryInterface.sequelize.query(`
      SELECT * from ${process.env.MYSQL_DATABASE_NAME}.user
      WHERE email like '%admin@admin.com%'
    `, { type: QueryTypes.SELECT });
    if(results.length === 0) {
      userList = [...users, {
        email: 'admin@admin.com',
        username: 'admin_user',
        realPassword: 'admin_password',
        password: bcrypt.hashSync('admin_password', 12),
        isVerified: 1,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }];
    } else {
      userList = users;
    }

    await queryInterface.bulkInsert('user', userList, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
