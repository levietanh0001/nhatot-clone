const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString } = require('../utils/model-types.util');


const ProductImage = sequelize.define('product_image', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image_url: {
    ...asString(0, 2048, false)
  },
}, {
  freezeTableName: true
});


module.exports = ProductImage;