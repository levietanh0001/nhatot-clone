'use strict';

const { faker } = require('@faker-js/faker');
const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const idList = await queryInterface.sequelize.query(`
      SELECT id from ${process.env.MYSQL_DATABASE_NAME}.user_profile;
    `, { type: QueryTypes.SELECT });

    const ids = idList.map(item => item.id);

    await Promise.all(ids.map(async (id) => {

      const sql = `
        UPDATE ${process.env.MYSQL_DATABASE_NAME}.user_profile
        SET avatarUrl = '${faker.image.urlLoremFlickr({ category: 'people' })}'
        WHERE id = :id
      `;
      console.log(sql);
      await queryInterface.sequelize.query(sql, { 
        replacements: { id }, type: QueryTypes.UPDATE 
      });
    }));

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
