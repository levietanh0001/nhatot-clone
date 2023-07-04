const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const { asOneOf } = require('../utils/model-types');
const Direction = require('./direction');

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