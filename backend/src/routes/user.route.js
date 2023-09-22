const express = require('express');
const { createUser, getUserProductCount, getOtherUsers, getUserChatId } = require('../controllers/user.controller');
const { loggedInRequired } = require('../middlewares/auth.middleware');


const router = express.Router();

router.get('/user-id-for-chat/:userId', getUserChatId);
router.get('/others', loggedInRequired, getOtherUsers);
// router.post('/', createUser);
router.get('/products/count', loggedInRequired, getUserProductCount);

module.exports = router;