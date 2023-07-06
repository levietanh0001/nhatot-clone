const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');
const { asString, asNonNegativeInt, asOneOf } = require('../utils/model-types');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    ...asString(1, 255)
  },
  price: {
    type: Sequelize.DOUBLE.UNSIGNED,
    allowNull: false
  },
  product_address: {
    ...asString(0, 255)
  },
  project_title: {
    ...asString(0, 255)
  },
  description: {
    ...asString(0, 255)
  },
  is_verified: {
    type: Sequelize.BOOLEAN
  },
  area: {
    ...asNonNegativeInt()
  },
  num_bedrooms: {
    ...asNonNegativeInt()
  },
  num_bathrooms: {
    ...asNonNegativeInt()
  },
  has_legal_docs: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  deposit: {
    ...asNonNegativeInt()
  },

}, {
  freezeTableName: true
});


module.exports = Product;