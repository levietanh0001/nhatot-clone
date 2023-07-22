const { body } = require("express-validator");

const emailValidation = body('email')
  .notEmpty()
  .withMessage('Email address must not be empty')
  .isEmail()
  .withMessage('Please specify a valid email address')
  .custom((value, { req, res }) => {
    if (!value.includes('@')) {
      throw new Error('Not an email');
    }
    return true;
  })
  .normalizeEmail();


function validateLogin(req, res, next) {
  return [
    emailValidation
  ];

}

function validateRegister(req, res, next) {

  return [
    emailValidation,
    body('password')
      .isLength({ min: 6, max: 32 })
      .withMessage('Password should have at least 6 characters'),
    body('confirmPassword')
      .custom((value, { req, res }) => {
        if (value !== req.body['password']) {
          throw new Error('Both passwords must match');
        }
        return true;
      }),
  ];
}


module.exports = {
  validateLogin,
  validateRegister
};