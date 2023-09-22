'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { QueryTypes } = require('sequelize');
const { randomOption, randomInRange } = require('../src/utils/random.util');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const productIds = await queryInterface.sequelize.query(`
      SELECT id from nhatot.product order by RAND()
    `, { type: QueryTypes.SELECT });
    const productIdList = productIds.map(item => item.id);

    let productImages = [];
    productIdList.forEach(productId => {
      [...Array(randomInRange(1, 5, 1))].map(() => {
        productImages = [...productImages, {
          imageUrl: faker.image.urlLoremFlickr({ category: 'city' }),
          productId,
          createdAt: new Date(),
          updatedAt: new Date(),    
        }]
      })
    });

    await queryInterface.bulkInsert('product_image', productImages, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_image', null, {});
  }
};
