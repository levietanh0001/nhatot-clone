const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { rootDir } = require('../utils/path');
const { throwError, passErrorToHandler } = require('../services/errors');
const { redisClient, redisConn } = require('./redis-store');

const accessPrivateKey = fs.readFileSync(path.join(__dirname, '../..', 'access-private-key.pem'), 'utf-8');
const accessPublicKey = fs.readFileSync(path.join(__dirname, '../..', 'access-public-key.pem'), 'utf-8');
const refreshPrivateKey = fs.readFileSync(path.join(__dirname, '../..', 'refresh-private-key.pem'), 'utf-8');
const refreshPublicKey = fs.readFileSync(path.join(__dirname, '../..', 'refresh-public-key.pem'), 'utf-8');


function verifyToken(token, publicKey, options = { algorithm: 'RS256' }) {

  try {
    const payload = jwt.verify(token, publicKey, options);
    return payload;
  } catch (error) {
    return null;
  }
}

function verifyAccessToken(token) {

  try {
    const payload = jwt.verify(token, accessPublicKey, { algorithm: 'RS256' });
    return payload;
  } catch (error) {
    return null;
  }
}


function verifyRefreshTokenAsync(token) {

  return new Promise((resolve) => {
    const payload = jwt.verify(token, refreshPublicKey, { algorithm: 'RS256' });

    if (payload) {
      resolve(payload);
    } else {
      resolve(null);
    }

  })
}

function verifyAccessTokenAsync(token) {

  return new Promise((resolve) => {

    const payload = jwt.verify(token, accessPublicKey, { algorithm: 'RS256' });

    if (payload) {
      resolve(payload);

    } else {
      resolve(null);
    }

  })
}



function signToken(payload, privateKey, options) {
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', ...options });
  return token;
}

function signTokenAsync(payload, privateKey, options) {

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      privateKey,
      { algorithm: 'RS256', ...options },
      (error, data) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(data)
        };
      }
    );
  })

}


function createAccessTokenAsync(payload) {

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      accessPrivateKey,
      { algorithm: 'RS256', expiresIn: process.env.ACCESS_TOKEN_LIFE_SPAN },
      (error, data) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(data)
        };
      }
    );
  })

}

function createRefreshTokenAsync(payload) {

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      refreshPrivateKey,
      { algorithm: 'RS256', expiresIn: process.env.REFRESH_TOKEN_LIFE_SPAN },
      (error, data) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(data)
        };
      }
    );
  })

}


async function createAndCacheRefreshTokenAsync(userId) {

  const refreshToken = await createRefreshTokenAsync({ userId });

  try {
    const value = await redisClient.get(userId.toString());

    if (!value) {
      await redisClient.set(
        userId.toString(),
        JSON.stringify({ refreshToken }),
        'EX',
        process.env.REFRESH_TOKEN_LIFE_SPAN
      );
    }

  } catch (error) {
    throwError(500, 'Internal Server Error', 'Cannot set refresh token in redis');
  }

  return refreshToken;

  // redisClient.get(userId.toString(), (error, data) => {
  //   if (error) {
  //     throwError(404, 'Not found', 'User id does not exist in cache');
  //   } else {
  //     redisClient.set(userId.toString(), JSON.stringify({ refreshToken }), 'EX',
  //       process.env.REFRESH_TOKEN_LIFE_SPAN,
  //       (error, data) => {
  //         if (error) {
  //           throwError(500, 'Internal Server Error', 'Can not set refresh token in redis')
  //         } else {
  //           return refreshToken;
  //         }
  //       }
  //     );
  //   }
  // })

}

function extractAccessTokenFromRequest(req) {
  return req.headers?.['authorization']?.split(' ')[1];
}


module.exports = {
  verifyToken,
  verifyAccessToken,
  verifyAccessTokenAsync,
  verifyRefreshTokenAsync,
  signToken,
  signTokenAsync,
  createAccessTokenAsync,
  createRefreshTokenAsync,
  // readPrivateKeyFile: fs.readFileSync(path.join(rootDir, 'private_key.pem'), 'utf-8'),
  // readPublicKeyFile: fs.readFileSync(path.join(rootDir, 'private_key.pem'), 'utf-8'),
  accessPrivateKey,
  accessPublicKey,
  refreshPrivateKey,
  refreshPublicKey,
  extractAccessTokenFromRequest,
  createAndCacheRefreshTokenAsync,
}
