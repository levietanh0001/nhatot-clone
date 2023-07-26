const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString, asNonNegativeInt } = require('../utils/model-types.util');


const ProductImage = sequelize.define('product_image', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  imageUrl: {
    ...asString(0, 255, true, 'imageUrl')
  },
  // productId: {
  //   ...asNonNegativeInt()
  // }

}, {
  freezeTableName: true
});


module.exports = ProductImage;