const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asOneOf } = require('../utils/model-types.util');
const Category = require('./category.model');


const ProductCategory = sequelize.define('product_category', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    ...asOneOf('', Category.rawAttributes.category_name.values),
  },

}, {
  freezeTableName: true
});


module.exports = ProductCategory;