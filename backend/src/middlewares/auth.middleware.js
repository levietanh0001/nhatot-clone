const errorsService = require('../controllers/errors.controller');
const { verifyToken, accessPublicKey, extractAccessTokenFromRequest, verifyAccessTokenAsync } = require('../utils/cryptography.util');
const { redisClient } = require('../utils/redis-store.util');


function adminOnly(req, res, next) {

  // const token = req.headers?.['authorization']?.split(' ')[1];
  const token = extractAccessTokenFromRequest(req);

  const payload = verifyToken(token, accessPublicKey);

  if (!payload) {
    errorsService.throwError(403, 'Unauthorized', 'Current user is not logged in');
  }

  if (!payload.isAdmin) {
    errorsService.throwError(403, 'Unauthorized', 'Current user is not admin');
  }

  next();
}


async function loggedInRequired(req, res, next) {

  try {

    const accessToken = extractAccessTokenFromRequest(req);

    if (!accessToken) {
      errorsService.throwError(422, 'Invalid request', 'No refresh token is provided');
    }

    const payload = await verifyAccessTokenAsync(accessToken);

    if (!payload) {
      errorsService.throwError(403, 'Unauthorized', 'Current user is not logged in');
    }

    const { userId } = payload;
    const blockedToken = await redisClient.get(`BL_${userId}`);

    if (blockedToken === accessToken) {
      errorsService.throwError(403, 'Unauthorized', 'Access token is blacklisted');
    }

    req.payload = payload;

    next(); // pass control to controller after

  } catch (error) {
    errorsService.passErrorToHandler(error, next);
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


module.exports = {
  loggedInRequired,
  adminOnly,
  notYetLoggedIn
};