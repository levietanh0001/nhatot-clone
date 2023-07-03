const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [1, 255],
                msg: "1 <= String length <= 255"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 255],
                msg: "1 <= String length <= 255"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetToken: {
        type: Sequelize.STRING,
    },
    resetTokenExpiryDate: {
        type: Sequelize.DATE
    }

}, {
    freezeTableName: true
});


module.exports = User;