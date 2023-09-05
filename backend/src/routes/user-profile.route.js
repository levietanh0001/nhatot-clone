const express = require('express');
const { getUserProfile } = require('../controllers/user-profile.controller');


const router = express.Router();

router.get('/:userId', getUserProfile);
// router.get('/', getUserProfiles);

module.exports = router;