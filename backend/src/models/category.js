const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');
const { asOneOf } = require('../utils/model-types');


const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_name: {
    ...asOneOf('', ['muaban', 'chothue', 'duan', ''])
  },
  
}, {
  freezeTableName: true
});


module.exports = Category;