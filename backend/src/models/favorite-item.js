const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');
const { asNonNegativeInt } = require('../utils/model-types');


const FavoriteItem = sequelize.define('favorite_item', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    ...asNonNegativeInt(allowNull=false)
  }
}, {
  freezeTableName: true
});


module.exports = FavoriteItem;