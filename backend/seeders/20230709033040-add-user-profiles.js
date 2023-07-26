'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { QueryTypes } = require('sequelize');

const { randomInRange, randomOption } = require('../src/utils/random.util');
const { getValueFromQueryResult } = require('../src/utils/query.util');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const numUsers = await queryInterface.sequelize.query(`
      SELECT count(*) from nhatot.user;
    `, { type: QueryTypes.SELECT} );
    
    const userCount = getValueFromQueryResult(numUsers);

    console.log(userCount);
    
    const userIds = await queryInterface.sequelize.query(`
        SELECT id, email from nhatot.user
      `, { type: QueryTypes.SELECT });
    const userList = userIds.map(item => {
      return {
        id: item.id,
        username: item.email.split('@')[0]
      }
    });
    console.log(userList);

    // throw new Error();

    const userProfiles = userList.map(user => (
      {
        username: user.username,
        gender: randomOption(['male', 'female', '']),
        rating: randomInRange(0, 5, 0.5),
        follower: randomInRange(0, userCount),
        following: randomInRange(0, userCount),
        respondToChat: randomInRange(0, 100, 1),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number('+82 ## ### ## ##'),
        updatedAt: new Date(),
        createdAt: new Date(),
        userId: user.id
      }
    ))

    await queryInterface.bulkInsert('user_profile', userProfiles);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_profile', null, {});
  }
};
