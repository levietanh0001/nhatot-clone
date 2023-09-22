const { returnError } = require("../utils/error.util");
const { auth } = require("../utils/firebase.util");

function updateUserRole(req, res, next) {

  const uid = req.query['uid'];
  const role = req.query['role'];

  if(role === 'broker') {
    auth
      .setCustomUserClaims(uid, { broker: true })
      .then(data => {
        res
          .status(200)
          .json({
            message: 'Successfully update user role',
            data
          })
      })
      .catch(error => returnError(res, 500, error));
  } else {
    res
      .status(422)
      .json({
        message: 'Failed to update user role, check parameters',
      })
  }
  
}

function getUserRole(req, res, next) {
  const uid = req.query['uid'];
  
  auth
    .getUser(uid)
    .then((userRecord) => {
      res
        .status(200)
        .json({
          role: userRecord.customClaims,
          // userRecord
        });
    })
    .catch(error => returnError(res, 500, error));
}


module.exports = { 
  updateUserRole,
  getUserRole
};