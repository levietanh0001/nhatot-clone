// read public and private keys from generated file .pem
const fs = require('fs');
const path = require('path');

const { rootDir } = require('../utils/path');


function verifyToken(token, publicKey) {

  let payload;

  try {
    payload = jwt.verify(token, publicKey, { algorithm: 'RS256' });
  } catch (error) {
    errorsService.throwError(403, 'Unauthorized', 'JWT token must be provided');
  }

  return payload;
}


module.exports = {
  verifyToken,
  readPrivateKeyFile: fs.readFileSync(path.join(rootDir, 'private_key.pem'), 'utf-8'),
  readPublicKeyFile: fs.readFileSync(path.join(rootDir, 'private_key.pem'), 'utf-8'),
}
