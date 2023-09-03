const express = require('express');
const { createUser, getUserProductCount, getOtherUsers, getUserChatId } = require('../controllers/user.controller');
const { loggedInRequired } = require('../middlewares/auth.middleware');


const router = express.Router();

router.get('/chatId/:userId', loggedInRequired, getUserChatId);
router.get('/others', loggedInRequired, getOtherUsers);
// router.post('/', createUser);
router.get('/products/count', loggedInRequired, getUserProductCount);

module.exports = router;