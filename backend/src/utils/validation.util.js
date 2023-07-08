const { validationResult } = require('express-validator');


function sendMessage(req, res, status_code) {

  const errors = validationResult(req);
  console.log({ errors });
  
  if (!errors.isEmpty()) {
    return res
      .status(status_code)
      .json({
        statusCode: 422,
        error: 'Invalid Request',
        message: errors.array()[0].msg
      });
  }
}

module.exports = { sendMessage };