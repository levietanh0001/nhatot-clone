const express = require('express');


const productsController = require('../services/products');


const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);


module.exports = router;