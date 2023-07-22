const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString } = require('../utils/model-types.util');


const FavoriteList = sequelize.define('favorite_list', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    ...asString(0, 255, false, 'userId')
  }

}, {
  freezeTableName: true
});


module.exports = FavoriteList;