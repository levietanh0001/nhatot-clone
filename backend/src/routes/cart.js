const express = require('express');


const cartController = require('../services/cart');
const isAuth = require('../middlewares/is_auth');


const router = express.Router();
router.get('/', isAuth.loggedIn, cartController.getProductsInCart);
router.post('/:productId', isAuth.loggedIn, cartController.addProductToCart);


module.exports = router;