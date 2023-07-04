const { check, body } = require('express-validator');

const productsValidation = [
  check('title')
    .isString()
    .withMessage('Product title must be a string')
    .isLength({ min: 3, max: 30 })
    .withMessage('Product title must has be between 3 and 30 characters long'),
  check('price')
    .isFloat()
    .withMessage('Product price must be a number')
    .custom((value, { req, res }) => {
      if (value < 0) {
        throw new Error('Product price must not be a negative number')
      }
      return true;
    }),
  check('description')
    .isLength({ min: 0, max: 400 })
    .withMessage('Product description must has be between 0 and 400 characters long')
    .optional({ nullable: true }),
  check('image-url')
    .isURL()
    .withMessage('Product image URL is invalid')
    .optional({ nullable: true }),
]

function validate_create_product() {
  return productsValidation;
}


function validate_update_product() {
  return productsValidation;
}


module.exports = {
  validate_create_product,
  validate_update_product,
}