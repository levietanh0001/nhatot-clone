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
    console.log(productIdList);

    let productThumbnails = [];
    productIdList.forEach(productId => {
      productThumbnails = [...productThumbnails, {
        imageUrl: faker.image.urlLoremFlickr({ category: 'city' }),
        productId,
        createdAt: new Date(),
        updatedAt: new Date(),    
      }]
    })

    // console.log({ productImagesLength: productImages.length });
    
    // throw new Error();

    await queryInterface.bulkInsert('product_thumbnail', productThumbnails, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_thumbnail', null, {});
  }
};
