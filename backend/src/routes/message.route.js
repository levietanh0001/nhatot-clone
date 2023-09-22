const express = require('express');
const { loggedInRequired } = require('../middlewares/auth.middleware');
const { sendMessage, getMessagesFromChat } = require('../controllers/message.controller');


const router = express.Router();
router.get('/:chatId', loggedInRequired, getMessagesFromChat);
router.post('/', loggedInRequired, sendMessage);


module.exports = router;