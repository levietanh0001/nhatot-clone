const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

}, {
    freezeTableName: true
});


module.exports = Order;