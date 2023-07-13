'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { randomBetween0And1, randomInRange, randomOption } = require('../src/utils/random.util');
const { directions } = require('../src/utils/variables.util');




const products = [...Array(10000)].map((product) => {

  const randomCategory = randomOption(['muaban', 'chothue', 'duan']);
  const randomPrice = randomCategory === 'muaban'? randomInRange(1*10**9, 100*10**9, 0.5*10**9):
                      randomCategory === 'chothue'? randomInRange(5*10**6, 30*10**6, 0.5*10**6):
                      randomInRange(1*10**9, 100*10**9, 0.5*10**9);

  return {
    title: faker.title,
    category: randomCategory,
    price: randomPrice,
    address: faker.location.address,
    imageUrl: faker.image.url(),
    description: faker.lorem.lines({ min: 1, max: 5 }),
    isVerified: randomBetween0And1(),
    area: randomInRange(25, 150),
    numBedrooms: randomInRange(1, 5, 1),
    numBathrooms: randomInRange(1, 5, 1),
    mainDoorDirection: randomOption(directions),
    balconDirection: randomOption(directions),
    hasLegalDocs: randomBetween0And1(),
    deposit: randomInRange(0, 1*10**9, 0.5*10**6),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product', null, {});
  }
};
