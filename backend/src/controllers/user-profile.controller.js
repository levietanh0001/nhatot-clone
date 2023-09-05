const { QueryTypes } = require("sequelize");
const UserProfile = require("../models/user-profile.model");
const { sequelize } = require("../utils/database.util");
const { databaseName } = require("../utils/variables.util");
const { redisClient } = require("../utils/redis-store.util");
const UserCollection = require("../models/user.collection");


// async function getUserProfiles(req, res, next) {

//   try {
    
//     const userIds = req.params['userIds'];

//     if(!Array.isArray(JSON.parse(userIds))) {
//       return res.status(422).json({
//         error: 'Invalid input',
//         message: 'userIds array is invalid'
//       })
//     }
  
//     const sql = `
//       SELECT ${databaseName}.user.id as userId, gender, rating, follower, following, respondToChat, address, phoneNumber, email, username, role, ${databaseName}.user.createdAt
//       FROM ${databaseName}.user_profile INNER JOIN ${databaseName}.user on ${databaseName}.user_profile.userId = ${databaseName}.user.id
//       WHERE userId = ?
//       LIMIT 1
//     `;
  
//     const userDoc = await UserCollection.findOne({ id: { $eq: userId } });
//     let userChatId;
//     if(userDoc) { 
//       userChatId = userDoc._id;
//     } else {
//       userChatId = '';
//     }
  
//     const cacheKey = `${sql}${userChatId}`;
//     const cache = await redisClient.get(cacheKey);
  
//     if(cache) {
//       return res.status(200).json(JSON.parse(cache));
//     }
  
//     const userProfiles = await sequelize.query(sql, { replacements: { userIds }, type: QueryTypes.SELECT });
//     const result = { ...userProfiles[0], userChatId };
  
//     await redisClient.setEx(cacheKey, 10, JSON.stringify(result));
  
//     return res.status(200).json(result);

//   } catch(error) {

//     console.log(error);
//     return next(error);
//   }

// }


async function getUserProfile(req, res, next) {

  try {
    
    const userId = req.params['userId'];
  
    const sql = `
      SELECT ${databaseName}.user.id as userId, gender, rating, follower, following, respondToChat, address, phoneNumber, email, username, role, ${databaseName}.user.createdAt
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
  
    const cacheKey = `${sql}${userChatId}`;
    const cache = await redisClient.get(cacheKey);
  
    if(cache) {
      return res.status(200).json(JSON.parse(cache));
    }
  
    const userProfiles = await sequelize.query(sql, { replacements: { userId }, type: QueryTypes.SELECT });
    const result = { ...userProfiles[0], userChatId };
  
    await redisClient.setEx(cacheKey, 10, JSON.stringify(result));
  
    return res.status(200).json(result);

  } catch(error) {

    console.log(error);
    return next(error);
  }

}


module.exports = {
  getUserProfile,
  // getUserProfiles
}