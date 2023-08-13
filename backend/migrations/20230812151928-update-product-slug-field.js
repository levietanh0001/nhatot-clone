'use strict';

const { kebabCase } = require('lodash');
const Product = require('../src/models/product.model');
const { toLowerCaseNonAccentVietnamese } = require('../src/utils/text.util');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up (queryInterface, Sequelize) {

    // const productProps = {
    //   slug
    // }
    
    const products = await Product.findAll();

    const updatedProducts = products.map(product => {
      return {
        ...product.dataValues,
        slug: kebabCase(toLowerCaseNonAccentVietnamese(product.postTitle))
      }
    })

    console.log({ updatedProducts });

    // throw new Error();

    await Product.bulkCreate(updatedProducts, { updateOnDuplicate: ['slug'] });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
