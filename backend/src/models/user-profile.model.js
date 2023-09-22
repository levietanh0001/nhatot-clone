const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString, asNonNegativeInt, asNonNegativeFloat, asBoolean, asOneOf } = require('../utils/model-types.util');


const UserProfile = sequelize.define('user_profile', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  gender: {
    ...asOneOf(['', 'male', 'female'])
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
  // isVerified: {
  //   ...asBoolean(defaultValue = false)
  // },
  address: {
    ...asString(minChar = 0, maxChar = 255)
  },
  phoneNumber: {
    ...asString(minChar = 10, maxChar = 15)
  },

}, {
  freezeTableName: true,
  // indexes: [
  //   { type: 'FULLTEXT', name: 'searchUsernameIndex', fields: ['username'] }
  // ]
});


module.exports = UserProfile;