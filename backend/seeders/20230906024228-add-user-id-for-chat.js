'use strict';

const { QueryTypes } = require('sequelize');
const { databaseName } = require('../src/utils/variables.util');
const UserCollection = require('../src/models/user.collection');
const connectToMongoDB = require('../src/utils/database.mongo.util');
const mongoose = require('mongoose');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    try {
      const userIdList = await queryInterface.sequelize.query(`
        SELECT id from ${databaseName}.user
      `, { type: QueryTypes.SELECT });
  
      const userIds = userIdList.map(userId => {
        return userId?.id;
      });
  
      // console.log({ userIds });
  
      mongoose.connect(process.env.MONGO_URI || 'mongodb://root:123321@localhost:27017/nhatot?authSource=admin');
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
