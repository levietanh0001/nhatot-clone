'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { randomInRange, randomOption } = require('../src/utils/random.util');
const { directions } = require('../src/utils/variables.util');


const products = [...Array(10000)].map((item) => {

  const randomCategory = randomOption(['canhochungcu', 'nhao', 'khac']);
  const randomType = randomOption(['canban', 'chothue']);
  const randomPrice = randomType === 'canban'? randomInRange(0.5*10**9, 100*10**9, 0.5*10**9):
                      randomType === 'chothue'? randomInRange(5*10**6, 30*10**6, 0.5*10**6):
                      randomInRange(1*10**9, 100*10**9, 0.5*10**9);
  const randomDeposit = randomType === 'canban'? randomInRange(50*10**6, 100*10**9, 10*10**6):
                      randomType === 'chothue'? randomInRange(1*10**6, 30*10**6, 0.5*10**6):
                      randomInRange(1*10**6, 100*10**9, 0.5*10**6);

  return {
    type: randomType,
    category: randomCategory,
    projectName: faker.lorem.lines(1),
    address: faker.location.streetAddress(true),
    numBedrooms: randomInRange(1, 5, 1),
    numBathrooms: randomInRange(1, 5, 1),
    mainDoorDirection: randomOption(directions),
    balconDirection: randomOption(directions),
    legalDocsStatus: randomOption(['dacoso', 'dangchoso', 'giaytokhac']),
    furnitureStatus: randomOption(['caocap', 'daydu', 'coban', 'khong']),
    area: randomInRange(25, 150),
    price: randomPrice,
    deposit: randomDeposit,
    postTitle: faker.lorem.lines(1),
    description: faker.lorem.lines({ min: 1, max: 5 }),
    userType: randomOption(['canhan', 'moigioi']),
    userId: faker.string.uuid(),
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
