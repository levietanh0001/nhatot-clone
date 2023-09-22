const express = require('express');
const { getUserProfile, createAvatarImage } = require('../controllers/user-profile.controller');
const { uploadImage } = require('../middlewares/upload.middleware');
const { loggedInRequired } = require('../middlewares/auth.middleware');


const router = express.Router();

router.get('/:userId', getUserProfile);
router.post('/avatar', loggedInRequired, uploadImage, createAvatarImage);

module.exports = router;