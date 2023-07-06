const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');
const { asOneOf } = require('../utils/model-types');


const Direction = sequelize.define('direction', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  direction_name: {
    ...asOneOf('', [
      'dong', 'tay', 'nam', 'bac',
      'dongnam', 'dongbac',
      'taynam', 'taybac', ''
    ])
  },
  
}, {
  freezeTableName: true
});


module.exports = Direction;