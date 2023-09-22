'use strict';

const { QueryTypes } = require('sequelize');
const { randomOption } = require('../src/utils/random.util');
const { getValueFromQueryResult } = require('../src/utils/query.util');
const { shallowLength } = require('../src/utils/data-manipulation.util');
const Product = require('../src/models/product.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    const productCount = getValueFromQueryResult(
      await queryInterface
        .sequelize
        .query(`SELECT count(*) from nhatot.product`)
    );

    const userIds = await queryInterface.sequelize.query(`
        SELECT id from nhatot.user order by RAND() limit :productCount
      `, { replacements: { productCount }, type: QueryTypes.SELECT });

    let count = 10001;
    userIds.forEach((item) => {
      const userId = item.id;
      queryInterface.sequelize.query(
        `UPDATE product SET userId = :userId WHERE id = :id`,
        { replacements: { userId, id: count }}
      )
      count = count + 1;
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
