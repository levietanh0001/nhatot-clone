const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const OrderItem = sequelize.define('orderItem', {
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


module.exports = OrderItem;