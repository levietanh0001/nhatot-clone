const { validationResult } = require('express-validator');


function sendMessage(req, res, status) {

  const errors = validationResult(req);
  console.log('validation error');
  console.log({ errors });
  
  if (!errors.isEmpty()) {
    return res
      .status(status)
      .json({
        status,
        code: 'INVALID_REQUEST',
        error: 'Invalid Request',
        message: errors.array()[0].msg
      });
  }
}

module.exports = { sendMessage };