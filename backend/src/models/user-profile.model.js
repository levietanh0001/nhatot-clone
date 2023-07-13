const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString, asNonNegativeInt, asNonNegativeFloat, asBoolean } = require('../utils/model-types.util');


const UserProfile = sequelize.define('user_profile', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    ...asString(minChar = 0, maxChar = 255, fieldName = 'name')
  },
  gender: {
    type: Sequelize.ENUM(['male', 'female', '']),
    defaultValue: ''
  },
  rating: {
    ...asNonNegativeFloat()
  },
  follower: {
    ...asNonNegativeInt()
  },
  following: {
    ...asNonNegativeInt()
  },
  respondToChat: {
    ...asNonNegativeFloat()
  },
  isVerified: {
    ...asBoolean(defaultValue = false)
  },
  address: {
    ...asString(minChar = 0, maxChar = 255)
  },
  phoneNumber: {
    ...asString(minChar = 10, maxChar = 15)
  },

}, {
  freezeTableName: true
});


module.exports = UserProfile;