const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "1 <= String length <= 255"
            }
        }
    },
    price: {
        type: Sequelize.DOUBLE.UNSIGNED,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [1, 255],
                msg: "1 <= String length <= 255"
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 255],
                msg: "0 <= String length <= 255"
            }
        }
    },
}, {
    freezeTableName: true
});


module.exports = Product;