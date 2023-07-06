const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { check } = require('express-validator');

const authController = require('../services/auth');
const { loggedInRequired, notYetLoggedIn } = require('../middlewares/auth.middleware');
const authValidator = require('../validators/auth');


const router = express.Router();
const upload = multer();


// router.get(
//     '/login',
//     cors({
//         mode: 'cors',
//         credentials: 'include',
//     }),
//     authController.login
// );

// router.post(
// '/login',
// cors({
//     origin: 'http://127.0.0.1:3000/auth/login',
//     credentials: true,
// }),
// upload.none(),
// authController.login);

router.get('/', loggedInRequired, authController.authDetails);

router.post('/login', authValidator.validate_login(), notYetLoggedIn, authController.login);
router.post('/register', authValidator.validate_register(), authController.register);
router.get('/verify-register', authController.verifyRegister);
router.post('/logout', loggedInRequired, authController.logout);

router.post('/refresh', authController.refresh);

router.post('/reset-password-email', authController.resetPasswordEmail);
// this route must be implemented on frontend
router.get('/reset-password-form', authController.resetPasswordForm);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
