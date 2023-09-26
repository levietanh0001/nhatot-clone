'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { QueryTypes } = require('sequelize');

const { randomInRange, randomOption } = require('../src/utils/random.util');
const { getValueFromQueryResult } = require('../src/utils/query.util');
const { sequelize } = require('../src/utils/database.util');
// const UserProfile = require('../src/models/user-profile.model')(sequelize);


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const numUsers = await queryInterface.sequelize.query(`
      SELECT count(*) from ${process.env.MYSQL_DATABASE_NAME}.user;
    `, { type: QueryTypes.SELECT} );
    
    const userCount = getValueFromQueryResult(numUsers);

    console.log(userCount);
    
    const userIds = await queryInterface.sequelize.query(`
        SELECT id, email from ${process.env.MYSQL_DATABASE_NAME}.user
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
        // username: user.username,
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

    // console.log(queryInterface.sequelize.models);
    // throw new Error();

    await Promise.all(userProfiles.map(async (userProfile) => {
      await queryInterface.sequelize.query(`
        INSERT IGNORE INTO ${process.env.MYSQL_DATABASE_NAME}.user_profile (gender, rating, follower, following, respondToChat, address, phoneNumber, updatedAt, createdAt, userId)
        VALUES (:gender, :rating, :follower, :following, :respondToChat, :address, :phoneNumber, :updatedAt, :createdAt, :userId)
      `, { replacements: { ...userProfile }, type: QueryTypes.INSERT })
    }));

    await queryInterface.bulkInsert('user_profile', userProfiles);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_profile', null, {});
  }
};
