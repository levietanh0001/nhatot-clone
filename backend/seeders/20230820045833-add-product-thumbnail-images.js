'use strict';

const { faker } = require('@faker-js/faker/locale/vi');
const { QueryTypes } = require('sequelize');
const { randomOption, randomInRange } = require('../src/utils/random.util');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const productIds = await queryInterface.sequelize.query(`
        SELECT id from ${process.env.MYSQL_DATABASE_NAME}.product order by RAND()
      `, { type: QueryTypes.SELECT });
    const productIdList = productIds.map(item => item.id);
    // console.log(productIdList);

    // let productThumbnails = [];
    // productIdList.forEach(productId => {
    //   productThumbnails = [...productThumbnails, {
    //     imageUrl: faker.image.urlLoremFlickr({ category: 'city' }),
    //     productId,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),    
    //   }]
    // })

    const productThumbnails = productIdList.map(productId => {
      return {
        imageUrl: faker.image.urlLoremFlickr({ category: 'city' }),
        productId,
        createdAt: new Date(),
        updatedAt: new Date(),    
      }
    })

    await Promise.all(productThumbnails.map(async (productThumbnail) => {
      
      await queryInterface.sequelize.query(`
        INSERT IGNORE INTO ${process.env.MYSQL_DATABASE_NAME}.product_thumbnail (
          imageUrl, productId, createdAt, updatedAt
        ) VALUES (
          :imageUrl, :productId, :createdAt, :updatedAt
        )
      `, { replacements: { ...productThumbnail }, type: QueryTypes.INSERT });

    }));


    // await queryInterface.bulkInsert('product_thumbnail', productThumbnails, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_thumbnail', null, {});
  }
};
