const express = require('express');
const { createGroupChat, renameGroupChat, deleteGroupChat, removeUserFromGroupChat, createOneOneChat, getUserChats, addUserToGroupChat, getGroupChats } = require('../controllers/chat.controller');
const { loggedInRequired } = require('../middlewares/auth.middleware');

const router = express.Router();


// router.post('/user', createUser);
// router.get('/user', loggedInRequired, getUsers);
// router.get('/user/:id', getUserById);

router.get('/', loggedInRequired, getUserChats);
router.post('/', loggedInRequired, createOneOneChat);

router.get('/group', loggedInRequired, getGroupChats);
router.post('/group', loggedInRequired, createGroupChat);
router.delete('/group', loggedInRequired, deleteGroupChat);
router.put('/group/rename', loggedInRequired, renameGroupChat);

router.post('/group/user', loggedInRequired, addUserToGroupChat);
router.delete('/group/user', loggedInRequired, removeUserFromGroupChat);



module.exports = router;