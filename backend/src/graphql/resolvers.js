const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user.model');
const errorsService = require('../services/errors.service');


module.exports = {
  createUser: async function (args, req) {

    const { userInput } = args;
    const email = userInput.email;
    const password = userInput.password;

    const errors = [];
    if (!validator.isEmail(email)) {
      errorsService.throwError(422, 'Invalid Input', 'Invalid email');
    }

    if (!validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
      errorsService.throwError(422, 'Invalid Input', 'Password must have at least 5 characters');
    }

    if (errors.length > 0) {
      errorsService.throwError(422, 'Invalid Input', 'Either email or password is invalid');
    }

    const currentUser = await User.findOne({ where: { email: email } });
    if (currentUser) {
      errorsService.throwError(409, 'Conflict', 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await User.create({
      email: email,
      password: hashedPassword
    });

    return {
      id: createdUser.id,
      email: createdUser.email,
      message: 'User created successfully'
    };
  },

  hello() {
    return "Hello World";
  }

  // hello() {
  //     return {
  //         text: 'Hello World', // String
  //         views: 12343
  //     };
  // }
}