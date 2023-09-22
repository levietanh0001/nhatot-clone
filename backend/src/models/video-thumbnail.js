const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString } = require('../utils/model-types.util');


const VideoThumbnail = sequelize.define('video_thumbnail', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  imageUrl: {
    ...asString(0, 255, true, 'imageUrl')
  },

}, {
  freezeTableName: true
});


module.exports = VideoThumbnail;