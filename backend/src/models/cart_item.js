const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, {
    freezeTableName: true
});


module.exports = CartItem;