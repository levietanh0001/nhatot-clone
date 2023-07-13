// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
    
//     const userProfiles = [...Array(userIdList.length)].map(item => (
//       {
//         username: randomOption(usernames),
//         gender: randomOption(['male', 'female', '']),
//         rating: randomInRange(0, 5, 0.5),
//         follower: randomInRange(0, userCount),
//         following: randomInRange(0, userCount),
//         respondToChat: randomInRange(0, 100, 1),
//         isVerified: randomBetween0And1(),
//         address: faker.location.streetAddress(),
//         phoneNumber: faker.phone.number('+82 ## ### ## ##'),
//         updatedAt: new Date(),
//         createdAt: new Date(),
//         userId: randomOption(userIdList)
//       }
//     ))

//     await queryInterface.bulkInsert('user_profile', userProfiles);
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
