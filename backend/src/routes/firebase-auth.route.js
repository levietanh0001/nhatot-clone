const express = require('express');
const { updateUserRole, getUserRole } = require('../controllers/firebase-auth.controller');


const firebaseRouter = express.Router();

firebaseRouter.get('/user-role', getUserRole);
firebaseRouter.put('/user-role', updateUserRole);


module.exports = firebaseRouter;