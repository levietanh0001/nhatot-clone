const bcrypt = require('bcryptjs');
const mailer = require('../utils/mailer.util');
const crypto = require('crypto');
const path = require('path');
const { Op } = require("sequelize");
const fetch = require('node-fetch');

const validationUtils = require('../utils/validation.util');
const { passErrorToHandler, throwError } = require('./errors.controller');
const { verifyToken, signToken, accessPrivateKey, accessPublicKey, refreshPrivateKey, refreshPublicKey, createRefreshToken, extractAccessTokenFromRequest, signTokenAsync, createAccessTokenAsync, createAndStoreRefreshTokenAsync, verifyRefreshTokenAsync, verifyAccessTokenAsync, createRefreshTokenAsync } = require('../utils/cryptography.util');

const User = require('../models/user.model');
const { constructUrlWithQueryParams, constructUrlWithQueryParamsAsync } = require('../utils/url.util');
const { redisClient } = require('../utils/redis-store.util');
const UserProfile = require('../models/user-profile.model');



async function register(req, res, next) {

  try {

    const email = req.body['email'];
    const password = req.body['password'];
    const userName = req.body['userName'];

    validationUtils.sendMessage(req, res, 422);

    const currentUser = await User.findOne({ where: { email: email } });

    console.log({ isTrue: currentUser && !currentUser.dataValues.isVerified });

    if(currentUser && currentUser.dataValues.isVerified) {

      return res.status(403).json({
        code: 'USER_ALREADY_EXISTS', 
        message: 'User already exists, please log in'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await User.create({
      email: email,
      password: hashedPassword,
      role: email === process.env.ADMIN_EMAIL? 'admin': 'canhan'
    });

    // update userName in UserProfile
    const userProfile = await createdUser.createUser_profile();
    userProfile.username = userName;
    await userProfile.save();

    const createdUserEmail = createdUser['email'];
    const createdUserId = createdUser['id'];

    const token = await createAccessTokenAsync({ createdUserEmail });

    const verifyRegisterUrl = await constructUrlWithQueryParamsAsync(
      '/auth/verify-register', { token, userId: createdUserId }
    );

    res
      .status(200)
      .json({
        code: 'SUCCESS',
        message: `Đã gửi email xác nhận tới ${createdUserEmail}`
      });

    return mailer.sendConfimationEmail(recipientEmail = createdUserEmail, confirmationUrl = verifyRegisterUrl);

  } catch (error) {
    return next(error);
  }

}


async function verifyRegister(req, res, next) {

  try {

    const token = req.query['token'];
    const userId = req.query['userId'];
    const payload = await verifyAccessTokenAsync(token);

    if(!payload) {
      throwError(401, 'Unauthorized', 'User access token is invalid');
    }
  
    const currentUser = await User.findByPk(userId);

    if(!currentUser) {
      throwError(404, 'Not found', 'Can not find user with provided id');
    }

    currentUser.isVerified = true;
    currentUser.save();      
    res.send(`Xác nhận email thành công, vui lòng đăng nhập`);

  } catch(error) {
    return next(error);
  }

}


async function login(req, res, next) {

  // add refresh token to database

  try {

    const email = req.body['email'];
    const password = req.body['password'];
    const broker = req.body['broker'];

    validationUtils.sendMessage(req, res, 422);

    const user = await User.findOne({ where: { email: email } });
    const userProfile = await UserProfile.findByPk(user.id);

    if (!user) {
      throwError(401, 'Unauthenticated', 'Current user is not registered');
    }

    if(user && !user['isVerified']) {
      
      await mailer.resendConfirmationEmail(res, user.email, user.id);
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throwError(401, 'Unauthenticated', 'Password is incorrect');
    }

    const userId = user.id;

    const payload = {
      userId,
      username: userProfile.username,
      email: user.email,
      role: email === process.env.ADMIN_EMAIL ? 'admin': broker? 'broker': 'canhan'
    };
    
    const accessToken = await createAccessTokenAsync(payload);
    const refreshToken = await createRefreshTokenAsync(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .json({ accessToken, refreshToken });

  } catch (error) {
    return next(error);
  }

}


async function refresh(req, res, next) {

  try {

    const refreshToken = req.body['refreshToken'];

    if (!refreshToken) {
      throwError(422, 'Invalid request', 'No refresh token is provided');
    }

    const payload = await verifyRefreshTokenAsync(refreshToken);

    if (!payload) {
      return res.status(401).json({
        code: 'REFRESH_TOKEN_INVALID',
        message: 'Provided refresh token is not valid'
      })
    }

    const { userId, email, role } = payload;

    // if refresh token is found in whitelist (by decoded userId)
    const currentUser = await User.findByPk(userId);

    if(!currentUser) {
      return res.status(401).json({
        code: 'USER_NOT_FOUND',
        message: 'User does not exist, please log in'
      })
    }

    if(refreshToken !== currentUser.refreshToken) {
      return res.status(401).json({
        code: 'REFRESH_TOKEN_NOT_ALLOWED',
        message: 'Provided refresh token is not allowed'
      })
    }

    const newAccessToken = await createAccessTokenAsync({ userId, email, role });
    const newRefreshToken = await createRefreshTokenAsync({ userId, email, role });

    currentUser.refreshToken = newRefreshToken;
    await currentUser.save();

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  } catch (error) {

    console.error(error);
    return next(error);
  }
}


async function logout(req, res, next) {

  // blacklist access token and remove refresh token from database

  try {

    const accessToken = extractAccessTokenFromRequest(req);
    const payload = req.payload; // get from auth middleware after loggedInRequired is checked

    // blacklist access token
    await redisClient.set(`BL_${payload.userId}`, accessToken, 'EX', process.env.ACCESS_TOKEN_LIFE_SPAN);

    // remove refresh token from whitelist
    const currentUser = await User.findByPk(payload.userId);
    currentUser.refreshToken = '';
    await currentUser.save();

    res
      .status(200)
      .json({ message: 'Successfully logged out' });

  } catch (error) {
    return next(error);
  }

}


function authDetails(req, res, next) {

  return res
    .status(200)
    .json({ user: req.payload, favoriteList: req.favoriteList });
}


function resetPasswordEmail(req, res, next) {

  const userEmail = req.body['email'];

  crypto.randomBytes(32, (error, buffer) => {

    if (error) {
      // return console.error(error);
      return res.status(500).json({
        code: 'RESET_TOKEN_ERROR',
        message: 'Error while creating reset token'
      })
    }

    const token = buffer.toString('hex');

    User
      .findOne({ where: { email: userEmail } })
      .then(user => {

        if (!user) {

          return res.status(404).json({
            code: 'EMAIL_NOT_FOUND',
            message: 'Provided email does not exist'
          })
        }

        user.resetToken = token;
        user.resetTokenExpiryDate = Date.now() + 60 * 60 * 1000; // + 1 hour
        return user.save();
      })
      .then(user => {

        const url = new URL('reset-password', process.env.FRONTEND_ORIGIN);

        url.searchParams.set('resetToken', token);
        url.searchParams.set('userId', user.id);

        const confirmationUrl = url.toString();

        res
          .status(200)
          .json({
            message: `Email sent to ${user.email}`
          });

        return mailer.sendConfimationEmail(userEmail, confirmationUrl, 'để thay đổi mật khẩu');
      })
      .then(info => {
        console.log(info);
      })
      .catch(error => {
        return next(error);
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

      // res.set('Content-Type', 'text/html');

      // res.send(`
      // <html>
      //   <body>
      //     <h1>Thay đổi mật khẩu</h1>
      //     <form id="forget-password-form" method="POST">
      //       <input type="password" name="newPassword" placeholder="Mật khẩu mới">
      //       <input type="hidden" name="resetToken" value="${resetToken}">
      //       <input type="hidden" name="userId" value="${user.id}">
      //       <button type="submit">Xác nhận</button>
      //     </form>
      //     <script>
      //       const form = document.querySelector("#forget-password-form");
      //       form.addEventListener("click", function(event) {

      //         event.preventDefault();
      //       })
      //     </script>
      //   </body>
      // </html>`);

      res
        .status(200)
        .json({
          userId: user.id,
          resetToken: resetToken,
        });
    })
    .catch(error => {
      return next(error);
    });

}


async function resetPassword(req, res, next) {

  try {
    const resetToken = req.body['resetToken'];
    const newPassword = req.body['newPassword'];
    const userId = req.body['userId'];
  
    console.log({ newPassword, resetToken, userId });
  
    const currentUser = await User.findOne({ where: { id: userId } });

    console.log({ currentUser: currentUser.dataValues });
    
    if(parseInt(currentUser.dataValues.id) !== parseInt(userId)) {
      return res.status(422).json({
        code: 'USER_ID_INVALID',
        message: 'Invalid user id'
      })
    }

    if(currentUser.dataValues.resetToken !== resetToken) {
      return res.status(422).json({
        code: 'RESET_TOKEN_INVALID',
        message: 'Invalid reset token'
      })
    }

    if(currentUser.dataValues.resetTokenExpiryDate < new Date()) {
      return res.status(403).json({
        code: 'RESET_TOKEN_EXPIRED',
        message: 'Reset token is expired'
      })
    }

    // handle errors here: reset token expires, no user found

    const hashedPassword = await bcrypt.hash(newPassword, 12);
      
    console.log({ hashedPassword, currentUser });
  
    currentUser.password = hashedPassword;
    currentUser.resetToken = null;
    currentUser.resetTokenExpiryDate = null;
    await currentUser.save()
      
    return res
      .status(200)
      .json({
        user: currentUser,
        message: 'Password is reset',
        code: 'SUCCESS'
      });

  } catch(error) {

    return next(error);
  }

  // User
  //   .findOne({
  //     where: {
  //       id: userId,
  //       resetToken: resetToken,
  //       resetTokenExpiryDate: { [Op.gt]: new Date() } // limit time left for changing password
  //     }
  //   })
  //   .then(user => {
  //     return { hashedPassword: bcrypt.hash(newPassword, 12), user };
  //   })
  //   .then(result => {
  //     console.log({ hashedPassword: result.hashedPassword, user: result.user });
  //     result.user.password = result.hashedPassword;
  //     result.user.resetToken = null;
  //     result.user.resetTokenExpiryDate = null;
  //     return result.user.save()
  //   })
  //   .then(currentUser => {
  //     return res
  //       .status(200)
  //       .json({
  //         user: currentUser,
  //         message: 'Password is reset',
  //         code: 'SUCCESS'
  //       });
  //   })
  //   .catch(error => {
  //     return next(error);
  //   });

}


module.exports = {
  login,
  logout,
  register,
  verifyRegister,
  refresh,
  authDetails,
  resetPasswordEmail,
  resetPasswordForm,
  resetPassword,
}