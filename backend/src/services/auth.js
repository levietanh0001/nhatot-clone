const bcrypt = require('bcryptjs');
const mailer = require('../utils/mailer');
const crypto = require('crypto');
const path = require('path');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const validationUtils = require('../utils/validation');
const errorsService = require('../services/errors');
const { readPrivateKeyFile } = require('../utils/cryptography');
require('dotenv').config('../../.env');


const User = require('../models/user');


function login(req, res, next) {

    const email = req.body['email'];
    const password = req.body['password'];

    validationUtils.sendMessage(req, res, 422);

    let user;
    User
        .findAll({
            where: {
                email: email,
            },
            limit: 1,
            raw: true // data only, not whole instance
        })
        .then(data => {

            if(!data.length) {
                errorsService.throwError(401, 'Unauthenticated', 'Current user is not registered');
            }

            user = data[0];

            return bcrypt.compare(password, user.password)
        })
        .then(matched => {

            if(!matched) {
                errorsService.throwError(401, 'Unauthenticated', 'Password is incorrect');
            }

            const payload = {
                id: user.id,
                email: user.email,
                isLoggedIn: true,
                isAdmin: email === process.env.ADMIN_EMAIL? true: false
            };

            const privateKey = readPrivateKeyFile;
            console.log(privateKey);

            const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });

            res
                .status(200)
                .json({
                    token: token,
                    userId: user.id
                });
        })
        .catch(error => {
            errorsService.passErrorToHandler(error, error.statusCode, next);
        });
}


function logout(req, res, next) {

    req.session.destroy(error => {
        if(error) {
            errorsService.passErrorToHandler(error, error.statusCode, next);
        }
        res
            .status(200)
            .json({
                message: 'Successfully logged out'
            });
    }); // clear session

}


function register(req, res, next) {

    const email = req.body['email'];
    const password = req.body['password'];
    const confirmPassword = req.body['confirm-password'];

    validationUtils.sendMessage(req, res, 422);

    // check if user already exists
    User
        .findAll({
            where: { email: email },
            limit: 1
        })
        .then(data => {
            // if user exists, redirect user to login page
            if(data.length > 0) {
                errorsService.throwError(100, 'Continue', 'User already exists, please log in');
            }

            // if user does not exist, first confirm passwords
            if(password !== confirmPassword) {
                errorsService.throwError(422, 'Invalid Input', 'Both passwords do not match');
            }

            // if both passwords match, create user
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            return User.create({
                email: email,
                password: hashedPassword,
            })
        })
        .then(user => {
            const recipientEmail = user['email'];

            res
                .status(200)
                .json({
                    message: 'Email sent'
                });

            return mailer.sendConfimationEmail(
                recipientEmail,
                'Confirm your email'
            )
        })
        .then(info => {
            console.log({
                message: 'Please log in now',
                info: info
            });
        })
        .catch(error => {
            errorsService.passErrorToHandler(error, error.statusCode, next);
        });

}


function authDetails(req, res, next) {

    res
        .status(200)
        .json({
            data: {
                sessionId: req.session.id,
                cookie: req.session.cookie,
                user: req.session.user,
                userId: req.session.user.id,
                isLoggedIn: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin,
            },
            message: 'Full auth details'
        });
}


function resetPasswordEmail(req, res, next) {

    const userEmail = req.body['email'];

    console.log('[services/auth.js].resetPassword', 'userEmail', userEmail);

    crypto.randomBytes(32, (error, buffer) => {

        if(error) {
            return console.error(error);
        }

        const token = buffer.toString('hex');
        console.log('[services/auth.js].resetPassword', 'token', token);

        User
            .findOne({
                where: { email: userEmail },
            })
            .then(user => {
                if(!user) {
                    errorsService.throwError(404, 'Not found', 'Email does not exist');
                }

                user.resetToken = token;
                user.resetTokenExpiryDate = Date.now() + 60 * 60 * 1000; // + 1 hour
                console.log('[services/auth.js].resetPassword', 'user', user);
                return user.save();
            })
            .then(user => {

                const url = new URL(
                    path.join('auth', 'reset-password-form'), // needs to be more dynamic
                    process.env.BASE_URL
                );
                url.searchParams.set('reset-token', token);
                const confirmationUrl = url.toString();
                console.log('[services/auth.js].resetPassword', 'confirmationUrl', confirmationUrl);

                res
                    .status(200)
                    .json({
                        message: 'Email sent'
                    });

                return mailer
                    .sendConfimationEmail(userEmail, confirmationUrl)
            })
            .then(info => {
                console.log(info);
            })
            .catch(error => {
                errorsService.passErrorToHandler(error, error.statusCode, next);
            });
    });

}


function resetPasswordForm(req, res, next) {

    const resetToken = req.query['reset-token'];

    User
        .findOne({
            where: {
                resetToken: resetToken,
                resetTokenExpiryDate: { [Op.gt]: new Date() } // expiry date must be greater than now
            }
        })
        .then(user => {

            if(!user) {
                errorsService.throwError(404, 'Not found', 'User does not exist');
            }

            res
                .status(200)
                .json({
                    data: {
                        userId: user.id,
                        resetToken: resetToken
                    },
                    message: 'User is found'
                });
        })
        .catch(error => {
            errorsService.passErrorToHandler(error, error.statusCode, next);
        });

}


function resetPassword(req, res, next) {

    const resetToken = req.body['reset-token'];
    const newPassword = req.body['new-password'];
    const userId = req.body['user-id'];

    User
        .findOne({
            where: {
                id: userId,
                resetToken: resetToken,
                resetTokenExpiryDate: { [Op.gt]: new Date() } // limit time left for changing password
            }
        })
        .then(user => {
            updatedUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            updatedUser.password = hashedPassword;
            updatedUser.resetToken = null;
            updatedUser.resetTokenExpiryDate = null;
            return updatedUser.save()
        })
        .then(currentUser => {
            res
                .status(205)
                .json({
                    data: { user: currentUser },
                    message: 'Password is reset'
                });
        })
        .catch(error => {
            errorsService.passErrorToHandler(error, error.statusCode, next);
        });

}


module.exports = {
    login,
    logout,
    register,
    authDetails,
    resetPasswordEmail,
    resetPasswordForm,
    resetPassword
}