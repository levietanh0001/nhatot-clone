const { Op, QueryTypes } = require("sequelize");
const User = require("../models/user.model");
const { returnError } = require("../utils/error.util");
const { redisClient } = require("../utils/redis-store.util");
const { sequelize } = require("../utils/database.util");
const { databaseName } = require("../utils/variables.util");
const UserCollection = require("../models/user.collection");


async function getUserChatId(req, res, next) {

  try {
    
    const userId = req.params['userId'];
    const userChatId = await UserCollection.find({ id: userId });
    return res.status(200).json(userChatId[0]?._id);

  } catch(error) {

    console.error(error);
    return next(error);
  }
}


async function getOtherUsers(req, res, next) {

  try {

    const q = req.query['q'];
    const limit = parseInt(req.query['limit']) || 20;
    const offset = parseInt(req.query['offset']) || 0;

    const sql = `
      SELECT * FROM ${databaseName}.user
      WHERE 
            username like :q 
            and id != :userId
      LIMIT :limit
      OFFSET :offset
    `

    const cache = await redisClient.get(sql);

    if(cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const users = await sequelize.query(sql, {
      replacements: { q: `%${q}%`, userId: req.user.id ?? 0, limit, offset },
      type: QueryTypes.SELECT
    });

    await redisClient.setEx(sql, 10, JSON.stringify(users));

    return res.status(200).json(users);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}


function createUser(req, res, next) {

  const email = req.body['email'];

  User
    .create({
      email
    })
    .then(result => {
      console.log({ createdUser: result })
      res.status(200).json({
        result,
        message: 'User created',
        email
      })
    })
    .catch(error => {
      console.error(error);
      returnError(res, 500, error);
    })
}


async function getUserProductCount(req, res, next) {

  try {

    const cachedProductCount = await redisClient.get(`userProductCount${req?.user?.id}`);

    if (cachedProductCount) {
      return res.status(200).json(JSON.parse(cachedProductCount));
    }

    // const count = await Product.count();
    const count = await req?.user?.countProducts();

    await redisClient.setEx(`userProductCount${req?.user?.id}`, 10, JSON.stringify(count));

    return res.status(200).json(count);

  } catch (error) {

    console.error(error);
    return next(error);
  }
}


async function getUserCountByGroup(req, res, next) {

  try {

    const userCounts = await sequelize.query(`
      SELECT role, count(id) as total FROM ${databaseName}.user
      GROUP BY ${databaseName}.user.role
      UNION SELECT 'all', count(id) from ${databaseName}.user;

    `, { type: QueryTypes.SELECT });

    const result = userCounts.reduce((total, current) => {
      return { ...total, [current.role]: current.total }
    }, {});

    return res.status(200).json(result);

  } catch(error) {

    console.error(error);
    return next(error);
  }

}





module.exports = {
  createUser,
  getUserProductCount,
  getOtherUsers,
  getUserChatId,
  getUserCountByGroup
}