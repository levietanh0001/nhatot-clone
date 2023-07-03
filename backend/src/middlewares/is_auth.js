const errorsService = require('../services/errors');
const { readPublicKeyFile, verifyToken } = require('../utils/cryptography');



function asAdmin(req, res, next) {

  const token = req.headers?.['authorization']?.split(' ')[1];
  const publicKey = readPublicKeyFile;
  const payload = verifyToken(token, publicKey);

  if (!payload) {
    errorsService.throwError(403, 'Unauthorized', 'Invalid token');
  }

  if (!payload.isAdmin) {
    errorsService
      .throwError(403, 'Unauthorized', 'Current user is not admin');
  }

  next();
}


function loggedIn(req, res, next) {

  const token = req.headers?.['authorization']?.split(' ')[1];
  const publicKey = readPublicKeyFile;
  const payload = verifyToken(token, publicKey);

  if (!payload) {
    errorsService.throwError(403, 'Unauthorized', 'Invalid token');
  }

  if (!payload.isLoggedIn) {
    errorsService
      .throwError(403, 'Unauthorized', 'Current user is not logged in');
  }

  next(); // pass control to controller after
}

module.exports = {
  loggedIn,
  asAdmin
};