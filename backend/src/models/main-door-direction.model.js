const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asOneOf } = require('../utils/model-types.util');
const Direction = require('./direction.model');

const MainDoorDirection = sequelize.define('main_door_direction', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  direction_name: {
    ...asOneOf('', Direction.rawAttributes.direction_name.values)
  },

}, {
  freezeTableName: true
});


module.exports = MainDoorDirection;