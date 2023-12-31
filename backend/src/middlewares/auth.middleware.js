const errorsService = require('../controllers/errors.controller');
const User = require('../models/user.model');
const { verifyToken, accessPublicKey, extractAccessTokenFromRequest, verifyAccessTokenAsync } = require('../utils/cryptography.util');
const { returnError } = require('../utils/error.util');
const { auth } = require('../utils/firebase.util');
const { redisClient } = require('../utils/redis-store.util');


// function adminOnly(req, res, next) {

//   // const token = req.headers?.['authorization']?.split(' ')[1];
//   const token = extractAccessTokenFromRequest(req);

//   const payload = verifyToken(token, accessPublicKey);

//   if (!payload) {
//     errorsService.throwError(403, 'Unauthorized', 'Current user is not logged in');
//   }

//   if (!payload.isAdmin) {
//     errorsService.throwError(403, 'Unauthorized', 'Current user is not admin');
//   }

//   next();
// }

async function adminOnly(req, res, next) {

  try {

    // const token = extractAccessTokenFromRequest(req);
    // const payload = await verifyAccessTokenAsync(token);
  
    // if (!payload) {
    //   errorsService.throwError(403, 'Unauthorized', 'Invalid access token');
    // }
  
    // const currentUser = await User.findByPk(payload.userId);
  
    // if(!currentUser) {
  
    //   return res.status(403).json({
    //     code: 'USER_NOT_FOUND',
    //     message: 'Current user is not found'
    //   });
    // }
    
    const currentUser = req.user;

    if (currentUser.role !== 'admin') {
  
      return res.status(403).json({
        code: 'USER_NOT_ADMIN',
        message: 'Current user is not admin'
      });
    }
  
    return next();

  } catch(error) {

    console.error(error);
    return next(error);
  }
  
}

async function loggedInRequired(req, res, next) {

  try {

    const accessToken = extractAccessTokenFromRequest(req);

    if (!accessToken) {

      return res.status(401).json({
        code: 'ACCESS_TOKEN_MISSING',
        message: 'No access token is provided'
      })
    }

    const payload = await verifyAccessTokenAsync(accessToken);

    if (!payload) {

      return res.status(401).json({
        code: 'ACCESS_TOKEN_INVALID',
        message: 'Access token is invalid'
      })
    }

    const blockedToken = await redisClient.get(`BL_${payload.userId}`);

    if (blockedToken === accessToken) {

      return res.status(401).json({
        code: 'ACCESS_TOKEN_BLOCKED',
        message: 'Access token is blocked'
      })
    }

    // attach decoded payload to req to next handler
    req.payload = payload;

    const currentUser = await User.findByPk(payload.userId);

    if(!currentUser) {
      return res.status(404).json({
        code: 'USER_NOT_FOUND',
        message: 'User does not exist'
      });
    }

    req.user = currentUser;

    // const currentFavoriteList = await currentUser.getFavorite_list();
    // console.log({ currentFavoriteList });
    // req.favoriteList = currentFavoriteList;

    // if(!currentFavoriteList) {
    //   const favoriteList = await currentUser.createFavorite_list();
    //   console.log({ favoriteList });
    //   req.favoriteList = favoriteList;
    // }

    return next(); // pass control to controller after

  } catch (error) {

    console.error(error);
    const e = new Error();
    
    if(error.name === 'TokenExpiredError') {
      e.status = 401;
      e.code = 'ACCESS_TOKEN_EXPIRED'
      e.message = 'Provided token has expired';
      return next(e);
    }

    return next(error);

  }

}


function notYetLoggedIn(req, res, next) {
  const token = extractAccessTokenFromRequest(req);
  const payload = verifyToken(token, accessPublicKey);
  if (payload) {
    errorsService.throwError(403, 'Already logged in', 'Current user is already logged in');
  }
  next();
}


function authenticateUser(req, res, next) {

  const token = req.headers?.['authorization']?.split(' ')[1];

  // no token means user not logged in, next right away
  if (!token) {
    return next();
  }

  const payload = verifyToken(token, accessPublicKey);

  // if token invalid -> user is not logged in, pass control to the remaining routers
  if (!payload) {
    return next();
  }

  const currentUserId = payload.userId;

  // if current user exists, attach user object to every request to access user's data
  User
    // check if current session's user exists in database
    .findOne({ where: { id: currentUserId } })
    .then(user => {
      if (!user) { // if user does not exist
        errorsService.throwError(404, 'Not found', 'User does not exist');
      }

      req.user = user; // set user instance from user model (sequelize)
      return req.user.getFavorite_list();
    })
    .then(favList => {

      if (!favList) {
        return req.user.createFavorite_list();
      }

      //   return favList;
      // })
      // .then(favList => {
      //   console.log('[app.js].favList', favList);

      return next();
    })
    .catch(error => {
      errorsService.passErrorToHandler(error, error.statusCode, next);
    });
};

function authRequired(req, res, next) {
  
  const token = req.headers?.['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Unauthenticated',
      message: 'User must login'
    })
  }

  auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      // const uid = decodedToken.uid;
      // req.uid = uid;
      return next();
    })
    .catch(error => {
      console.error(error);
      returnError(res, 500, error);
    })

}


module.exports = {
  loggedInRequired,
  adminOnly,
  notYetLoggedIn,
  authenticateUser,
  authRequired
};