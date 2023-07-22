const Sequelize = require('sequelize');
const { sequelize } = require('../utils/database.util');
const { asString, asNonNegativeInt, asOneOf, asNonNegativeDouble } = require('../utils/model-types.util');
const { directions } = require('../utils/variables.util');




const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    ...asOneOf(['', 'canban', 'chothue', 'duan'])
  },
  category: {
    ...asOneOf(['', 'canhochungcu', 'nhao', 'khac'])
  },
  projectName: {
    ...asString(0, 255)
  },
  address: {
    ...asString(0, 255)
  },
  numBedrooms: {
    ...asNonNegativeInt(allowNull=false),
  },
  numBathrooms: {
    ...asNonNegativeInt(allowNull=false),
  },
  balconDirection: {
    ...asOneOf(directions)
  },
  mainDoorDirection: {
    ...asOneOf(directions)
  },
  hasLegalDocs: {
    ...asOneOf(['', 'dangchoso', 'dacoso', 'giaytokhac'])
  },
  furnitureStatus: {
    ...asOneOf(['', 'khong', 'caocap', 'daydu', 'coban'])
  },
  area: {
    ...asNonNegativeInt(allowNull=false)
  },
  price: {
    ...asNonNegativeDouble(allowNull=false)
  },
  deposit: {
    ...asNonNegativeInt()
  },
  postTitle: {
    ...asString(10, 255, allowNull=false, 'postTitle')
  },
  description: {
    ...asString(0, 255)
  },
  userType: {
    ...asOneOf(['canhan', 'moigioi'])
  },
  userId: {
    ...asString(0, 255, allowNull=false, 'userId')
  },
  

}, {
  freezeTableName: true
});


module.exports = Product;