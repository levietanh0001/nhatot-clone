const express = require('express');
const { createUser, getUserProductCount } = require('../controllers/user.controller');
const { loggedInRequired } = require('../middlewares/auth.middleware');


const router = express.Router();

router.post('/', createUser);
router.get('/products/count', loggedInRequired, getUserProductCount);

module.exports = router;