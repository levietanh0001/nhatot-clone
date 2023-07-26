const express = require('express');

const { authDetails, login, logout, register, verifyRegister, refresh, resetPassword, resetPasswordEmail, resetPasswordForm, clearCookie, getNewAccessToken, getCookie, resendConfirmEmail } = require('../controllers/auth.controller');
const { loggedInRequired, notYetLoggedIn } = require('../middlewares/auth.middleware');
const { validateLogin, validateRegister } = require('../validators/auth.validator');


const router = express.Router();
// const corsForCookies = cors({ origin: ['http://localhost:3000'], credentials: true });
// const corsForCookies = cors({ credentials: true });


router.post('/verify-access-token', loggedInRequired, (req, res, next) => {
  return res.status(200).json({ payload: req.payload });
});
router.post('/register', validateRegister(), register);
router.get('/verify-register', verifyRegister);
router.post('/login', validateLogin(), notYetLoggedIn, login);
router.post('/logout', loggedInRequired, logout);
router.post('/refresh', refresh);
router.post('/reset-password-email', resetPasswordEmail);
router.get('/reset-password-form', resetPasswordForm); // this route must be implemented on frontend
router.post('/reset-password', resetPassword);

// router.get('/', loggedInRequired, authDetails);
// router.post('/refresh', refresh);
// router.post('/new-access-token', getNewAccessToken);
// router.get('/cookie', getCookie);
// router.delete('/cookie', clearCookie);


module.exports = router;
