const User = require("../models/user.model");
const { returnError } = require("../utils/error.util");

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


module.exports = { 
  createUser
}