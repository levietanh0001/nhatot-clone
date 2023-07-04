const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const { asString } = require('../utils/model-types');


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    ...asString(minChar=0, maxChar=255)
  },
  email: {
    ...asString(minChar=0, maxChar=255, allowNull=false)
  },
  password: {
    ...asString(minChar=6, maxChar=32, allowNull=false)
  },
  resetToken: {
    type: Sequelize.STRING,
  },
  resetTokenExpiryDate: {
    type: Sequelize.DATE
  },
  
}, {
  freezeTableName: true
});


module.exports = User;