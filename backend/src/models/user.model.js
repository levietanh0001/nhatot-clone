const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString } = require('../utils/model-types.util');


const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    ...asString(minChar = 0, maxChar = 255, allowNull = false, fieldName = 'email')
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      len: {
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