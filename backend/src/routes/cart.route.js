const express = require('express');


const cartController = require('../services/cart');
const { loggedInRequired } = require('../middlewares/auth.middleware');


const router = express.Router();
router.get('/', loggedInRequired, cartController.getProductsInCart);
router.post('/:productId', loggedInRequired, cartController.addProductToCart);


module.exports = router;