const path = require('path');
const { QueryTypes } = require("sequelize");
const UserProfile = require("../models/user-profile.model");
const { sequelize } = require("../utils/database.util");
const { databaseName } = require("../utils/variables.util");
const { redisClient } = require("../utils/redis-store.util");
const UserCollection = require("../models/user.collection");
const { doesPathExist, deleteFileByPath } = require("../utils/file.util");
const { uploadedImagesDir } = require("../utils/path.util");


async function createAvatarImage(req, res, next) {

  try {
    const userId = req.user.id;
    const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
    
    const currentAvatarUrls = await sequelize.query(`
      SELECT avatarUrl from ${databaseName}.user_profile
      WHERE userId = :userId
    `, { 
      replacements: { userId }, type: QueryTypes.SELECT
    });

    const currentAvatarUrl = currentAvatarUrls[0].avatarUrl;

    // console.log({ currentAvatarUrl });
    if(currentAvatarUrl) {
      const imagePath = path.join(uploadedImagesDir, String(currentAvatarUrl).replace(`${req.protocol}://${req.get('host')}/uploads/images/`, ''));
      if(doesPathExist(imagePath)) {
        // console.log({ imagePath });
        deleteFileByPath(imagePath);
      }
    }

    const updatedUserProfile = await sequelize.query(`
      UPDATE ${databaseName}.user_profile
      SET avatarUrl = :avatarUrl
      WHERE userId = :userId
    `, { 
      replacements: { avatarUrl, userId }, type: QueryTypes.UPDATE,
      model: UserProfile, mapToModel: true, raw: true
    });

    console.log(updatedUserProfile);

    return res.status(200).json(updatedUserProfile);

  } catch(error) {

    console.error(error);
    return next(error);
  }
}


async function getUserProfile(req, res, next) {

  try {
    
    const userId = req.params['userId'];
  
    const sql = `
      SELECT 
            ${databaseName}.user.id as userId, 
            gender, rating, follower, following, respondToChat, 
            address, phoneNumber, email, username,avatarUrl,
            ${databaseName}.user.role, 
            ${databaseName}.user.createdAt
      FROM ${databaseName}.user_profile INNER JOIN ${databaseName}.user on ${databaseName}.user_profile.userId = ${databaseName}.user.id
      WHERE userId = :userId
      LIMIT 1
    `;
  
    const userDoc = await UserCollection.findOne({ id: { $eq: userId } });
    let userChatId;
    if(userDoc) { 
      userChatId = userDoc._id;
    } else {
      userChatId = '';
    }
  
    // const cacheKey = `${sql}${userChatId}`;
    // const cache = await redisClient.get(cacheKey);
  
    // if(cache) {
    //   return res.status(200).json(JSON.parse(cache));
    // }
  
    const userProfiles = await sequelize.query(sql, { replacements: { userId }, type: QueryTypes.SELECT });
    const result = { ...userProfiles[0], userChatId };
  
    // await redisClient.setEx(cacheKey, 10, JSON.stringify(result));
  
    return res.status(200).json(result);

  } catch(error) {

    console.log(error);
    return next(error);
  }

}


module.exports = {
  getUserProfile,
  createAvatarImage,
}