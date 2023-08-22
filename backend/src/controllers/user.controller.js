const User = require("../models/user.model");
const { returnError } = require("../utils/error.util");
const { redisClient } = require("../utils/redis-store.util");

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

    if(cachedProductCount) {
      return res.status(200).json(JSON.parse(cachedProductCount));
    }

    // const count = await Product.count();
    const count = await req?.user?.countProducts();
    
    await redisClient.setEx(`userProductCount${req?.user?.id}`, 10, JSON.stringify(count));

    return res.status(200).json(count);

  } catch(error) {

    console.error(error);
    return next(error);
  }
}

module.exports = { 
  createUser,
  getUserProductCount
}