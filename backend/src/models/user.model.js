const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString, asOneOf } = require('../utils/model-types.util');


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
        msg: `password length must be at least 6 characters long`
      }
    }
  },
  refreshToken: {
    type: Sequelize.TEXT
  },
  resetToken: {
    type: Sequelize.TEXT,
  },
  resetTokenExpiryDate: {
    type: Sequelize.DATE
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  role: {
    ...asOneOf(['canhan', 'moigioi', 'admin'])
  },

}, {
  freezeTableName: true
});


module.exports = User;