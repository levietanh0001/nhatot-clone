'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { QueryTypes } = require('sequelize');
const { randomOption } = require('../src/utils/random.util');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const productIds = await queryInterface.sequelize.query(`
        SELECT id from nhatot.product order by RAND()
      `, { type: QueryTypes.SELECT });
    const productIdList = productIds.map(item => item.id);
    console.log(productIdList);

    const productImageUrls = [...Array(100000)].map(() => {
      return {
        imageUrl: faker.image.urlLoremFlickr({ category: 'city' }),
        productId: randomOption(productIdList),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    await queryInterface.bulkInsert('product_image', productImageUrls, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_image', null, {});
  }
};
