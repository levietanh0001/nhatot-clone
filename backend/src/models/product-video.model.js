const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString, asNonNegativeInt } = require('../utils/model-types.util');


const ProductVideo = sequelize.define('product_video', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  videoUrl: {
    ...asString(0, 255, true, 'videoUrl')
  },
  thumbnailUrl: {
    ...asString(0, 255, true, 'thumbnailUrl')
  },

}, {
  freezeTableName: true
});


module.exports = ProductVideo;