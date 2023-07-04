const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const { asString, asNonNegativeInt, asNonNegativeFloat, asBoolean } = require('../utils/model-types');


const UserProfile = sequelize.define('user_profile', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
  is_verified: {
    ...asBoolean(defaultValue=false)
  },
  address: {
    ...asString(minChar=0, maxChar=255)
  },
  phone_number: {
    ...asString(minChar=10, maxChar=15)
  },

}, {
  freezeTableName: true
});


module.exports = UserProfile;