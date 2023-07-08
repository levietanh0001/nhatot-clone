const express = require('express');
const cors = require('cors');
const { authDetails, login, logout, register, verifyRegister, refresh, resetPassword, resetPasswordEmail, resetPasswordForm, clearCookie, getNewAccessToken, getCookie } = require('../services/auth.service');
const { loggedInRequired, notYetLoggedIn } = require('../middlewares/auth.middleware');
const { validateLogin, validateRegister } = require('../validators/auth.validator');


const router = express.Router();
// const corsForCookies = cors({ origin: ['http://localhost:3000'], credentials: true });
// const corsForCookies = cors({ credentials: true });


router.get('/', loggedInRequired, authDetails);

// ATTENTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// refresh token saved in cookie
// safe from csrf since access_token is returned but cannot be read if setup cors
// access token in Context API defined in src/contexts/auth/auth.context.tsx
router.get('/login', validateLogin(), notYetLoggedIn, login);
router.post('/login', validateLogin(), notYetLoggedIn, login);

router.post('/refresh', refresh);
router.post('/new-access-token', getNewAccessToken);
router.get('/cookie', getCookie);
router.delete('/cookie', clearCookie);

router.post('/register', validateRegister(), register);
router.get('/verify-register', verifyRegister);
router.post('/logout', loggedInRequired, logout);
router.post('/reset-password-email', resetPasswordEmail);
router.get('/reset-password-form', resetPasswordForm); // this route must be implemented on frontend
router.post('/reset-password', resetPassword);

module.exports = router;
