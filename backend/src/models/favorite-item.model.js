const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asNonNegativeInt } = require('../utils/model-types.util');


const FavoriteItem = sequelize.define('favorite_item', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    ...asNonNegativeInt(allowNull = false)
  }
}, {
  freezeTableName: true
});


module.exports = FavoriteItem;