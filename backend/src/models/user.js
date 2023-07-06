const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database');
const { asString } = require('../utils/model-types');


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    ...asString(minChar=0, maxChar=255, fieldName='name')
  },
  email: {
    ...asString(minChar=0, maxChar=255, allowNull=false, fieldName='email')
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      len: {
        // args: [6, 32],
        min: 6,
        msg: `password length must be between 6 and 32`
      }
    },
    allowNull: false
    // ...asString(minChar=6, maxChar=32, allowNull=false, fieldName='password')
  },
  resetToken: {
    type: Sequelize.STRING,
  },
  resetTokenExpiryDate: {
    type: Sequelize.DATE
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isBroker: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
  
}, {
  freezeTableName: true
});


module.exports = User;