'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { randomInRange, randomBetween0And1, randomOption } = require('../src/utils/random.util');
const { QueryTypes } = require('sequelize');
const { getValueFromQueryResult } = require('../src/utils/query.util');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const numUsers = await queryInterface.sequelize.query(`
      SELECT count(*) from nhatot.user;
    `, { type: QueryTypes.SELECT} );
    
    const userCount = getValueFromQueryResult(numUsers);

    console.log(userCount);
    
    const userIds = await queryInterface.sequelize.query(`
        SELECT id from nhatot.user order by RAND()
      `, { type: QueryTypes.SELECT });
    const userIdList = userIds.map(item => item.id);
    console.log(userIdList);
    
    const userEmails = await queryInterface.sequelize.query(`
      SELECT email from nhatot.user  
    `, { type: QueryTypes.SELECT });

    const usernames = userEmails.map(item => { return item.email.split('@')[0] });
    console.log(usernames);

    // throw new Error();

    const userProfiles = [...Array(userIdList.length)].map(item => (
      {
        username: randomOption(usernames),
        gender: randomOption(['male', 'female', '']),
        rating: randomInRange(0, 5, 0.5),
        follower: randomInRange(0, userCount),
        following: randomInRange(0, userCount),
        respondToChat: randomInRange(0, 100, 1),
        isVerified: randomBetween0And1(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number('+82 ## ### ## ##'),
        updatedAt: new Date(),
        createdAt: new Date(),
        userId: randomOption(userIdList)
      }
    ))

    await queryInterface.bulkInsert('user_profile', userProfiles);

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
