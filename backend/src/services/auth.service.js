const bcrypt = require('bcryptjs');
const mailer = require('../utils/mailer.util');
const crypto = require('crypto');
const path = require('path');
const { Op } = require("sequelize");
const fetch = require('node-fetch');

const validationUtils = require('../utils/validation.util');
const { passErrorToHandler, throwError } = require('./errors.service');
const { verifyToken, signToken, accessPrivateKey, accessPublicKey, refreshPrivateKey, refreshPublicKey, createRefreshToken, extractAccessTokenFromRequest, signTokenAsync, createAccessTokenAsync, createAndStoreRefreshTokenAsync, verifyRefreshTokenAsync } = require('../utils/cryptography.util');
// require('dotenv').config('../../.env');

const User = require('../models/user.model');
const { constructUrlWithQueryParams } = require('../utils/url.util');
const { redisClient } = require('../utils/redis-store.util');


function clearCookie(req, res, next) {

  res.clearCookie('refreshToken');
  res.end();
}


function getCookie(req, res, next) {

  res.status(200).json({ refreshToken: req.cookies['refreshToken'] })
}


async function refresh(req, res, next) {

  const response = await fetch(
    new URL('/api/auth/new-access-token', process.env.BASE_URL).href, 
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: req.cookies['refreshToken'] }),
      credentials: 'include',
    }
  )

  const data = await response.json();

  res
    .status(200)
    .json({
      data
    })
}

async function getNewAccessToken(req, res, next) {

  const refreshToken = req.cookies['refreshToken'] || req.body['refreshToken'];
  console.log({ finalToken: refreshToken });
  
  try {
    if (!refreshToken) {
      throwError(422, 'Invalid request', 'No refresh token is provided');
    }

    const payload = await verifyRefreshTokenAsync(refreshToken);

    if (!payload) {
      throwError(401, 'Invalid refresh token', 'Provided refresh token is not valid');
    }

    const { userId, email } = payload;

    console.log({ userId });

    // if refresh token is found in whitelist (by decoded userId)
    const result = await redisClient.get(userId.toString());
    const allowedToken = JSON.parse(result)?.refreshToken;

    if (allowedToken !== refreshToken) {
      throwError(401, 'Unauthorized', 'Invalid token: refresh token is blocked');
    }

    const data = {
      userId,
      isAdmin: email === process.env.ADMIN_EMAIL ? true : false
    };

    const accessToken = await createAccessTokenAsync(data);

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Credentials', 'true');

    res
      .status(200)
      .json({
        accessToken,
        // refreshToken
      })

  } catch (error) {
    passErrorToHandler(error, next);
  }
}

async function login(req, res, next) {

  const email = req.body['email'];
  const password = req.body['password'];

  validationUtils.sendMessage(req, res, 422);

  try {
    const user = await User.findOne({
      attributes: ['id', 'email', 'password'],
      where: { email: email },
      raw: true
    });

    if (!user) {
      throwError(401, 'Unauthenticated', 'Current user is not registered');
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throwError(401, 'Unauthenticated', 'Password is incorrect');
    }

    const userId = user.id;

    const payload = {
      userId,
      isAdmin: email === process.env.ADMIN_EMAIL ? true : false
    };

    const accessToken = await createAccessTokenAsync(payload);
    const refreshToken = await createAndStoreRefreshTokenAsync(userId); // for logout

    res.cookie(
      'refreshToken',
      refreshToken, 
      {
        httpOnly: true,
        // secure: true, // must be set in production
        path: '/',
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    );
    
    res
    .status(200)
    .json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      cookies: req.cookies
    });
    
  } catch (error) {
    passErrorToHandler(error, next);
  }
  
}


async function logout(req, res, next) {

  try {
    const accessToken = extractAccessTokenFromRequest(req);
    const { userId } = req.payload; // get from auth middleware after loggedInRequired is checked

    // blacklist access token
    await redisClient
      .set('BL_' + userId, accessToken, 'EX', process.env.ACCESS_TOKEN_LIFE_SPAN);

    // remove refresh token from whitelist
    await redisClient.del(`${userId}`);

    res.clearCookie('refreshToken');

    res
      .status(200)
      .json({
        message: 'Successfully logged out',
      })
  } catch (error) {
    passErrorToHandler(error, next);
  }

}


function register(req, res, next) {

  const email = req.body['email'];
  const password = req.body['password'];
  const confirmPassword = req.body['confirmPassword'];

  validationUtils.sendMessage(req, res, 422);

  // check if user already exists
  User
    .findAll({
      where: { email: email },
      limit: 1
    })
    .then(data => {
      // if user exists, redirect user to login page
      if (data.length > 0) {
        throwError(100, 'Continue', 'User already exists, please log in');
      }

      // if user does not exist, first confirm passwords
      if (password !== confirmPassword) {
        throwError(422, 'Invalid Input', 'Both passwords do not match');
      }

      // if both passwords match, create user
      return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
      console.log(hashedPassword);

      return User.create({
        email: email,
        password: hashedPassword,
        isAdmin: email === process.env.ADMIN_EMAIL
      })
    })
    .then(user => {
      const recipientEmail = user['email'];
      const userId = user['id'];

      const token = signToken({ email: recipientEmail }, accessPrivateKey, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE_SPAN
      });

      const verifyRegisterUrl = constructUrlWithQueryParams(
        '/api/auth/verify-register', { token: token, userId: userId }
      );

      res
        .status(200)
        .json({
          message: `Email sent to ${recipientEmail}`
        });

      return mailer.sendConfimationEmail(
        recipientEmail,
        confirmationUrl = verifyRegisterUrl
      );
    })
    .then(info => {

      console.log({
        message: 'Please confirm registration with your email address',
        // info: info
      });
    })
    .catch(error => {
      passErrorToHandler(error, next);
    });
}


function verifyRegister(req, res, next) {

  const token = req.query['token'];
  const userId = req.query['userId'];
  const payload = verifyToken(token, accessPublicKey);

  if (payload) {
    User
      .findByPk(userId)
      .then(user => {
        user.isVerified = true;

        return user.save();
      })
      .catch(error => {
        return throwError(500, 'Error verifying registration', 'Unable to verify user')
      })

    res
      .status(200)
      .json({
        message: 'Successfully verified email'
      })
  } else {
    throwError(422, 'Invalid JWT token', message = 'Unable to verify email')
  }
}

function authDetails(req, res, next) {

  res
    .status(200)
    .json({
      user: req.user,
      message: 'Full auth details'
    });
}


function resetPasswordEmail(req, res, next) {

  const userEmail = req.body['email'];

  console.log('[services/auth.js].resetPassword', 'userEmail', userEmail);

  crypto.randomBytes(32, (error, buffer) => {

    if (error) {
      return console.error(error);
    }

    const token = buffer.toString('hex');
    console.log('[services/auth.js].resetPassword', 'token', token);

    User
      .findOne({
        where: { email: userEmail },
      })
      .then(user => {
        if (!user) {
          throwError(404, 'Not found', 'Email does not exist');
        }

        user.resetToken = token;
        user.resetTokenExpiryDate = Date.now() + 60 * 60 * 1000; // + 1 hour
        console.log('[services/auth.js].resetPassword', 'user', user);
        return user.save();
      })
      .then(user => {

        const url = new URL(
          path.join('/api/auth', 'reset-password-form'), // needs to be more dynamic
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

        return mailer.sendConfimationEmail(userEmail, confirmationUrl)
      })
      .then(info => {
        console.log(info);
      })
      .catch(error => {
        passErrorToHandler(error, next);
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

      if (!user) {
        throwError(404, 'Not found', 'User does not exist');
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
      passErrorToHandler(error, next);
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
      passErrorToHandler(error, next);
    });

}


module.exports = {
  login,
  logout,
  register,
  verifyRegister,
  authDetails,
  resetPasswordEmail,
  resetPasswordForm,
  resetPassword,
  refresh,
  clearCookie,
  getCookie,
  getNewAccessToken
}