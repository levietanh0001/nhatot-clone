'use strict';

const { QueryTypes } = require('sequelize');
const UserCollection = require('../src/models/user.collection');
const connectToMongoDB = require('../src/utils/database.mongo.util');
const mongoose = require('mongoose');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    try {
      const userIdList = await queryInterface.sequelize.query(`
        SELECT id from ${process.env.MYSQL_DATABASE_NAME}.user
      `, { type: QueryTypes.SELECT });
  
      const userIds = userIdList.map(userId => {
        return userId?.id;
      });
  
      // console.log({ userIds });
  
      await mongoose.connect(process.env.MONGO_URI_SEED);
      const connection = mongoose.connection;
  
      const createdUsers = await Promise.all(userIds.map(async (userId) => {
        
        const currentUser = await connection.collection('user').findOne({ id: userId });
        if (!currentUser) {
          const createdUser = await connection.collection('user').insertOne({ id: userId });
          return createdUser;
        }
      }));

      const updatedUsers = await connection.collection('user').updateMany({}, {
        $set: { createdAt: new Date(), updatedAt: new Date() }
      });
  
      console.log({ updatedUsers });
  
    } catch(error) {

      console.error(error);
      throw error;
    }
    
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
