const express = require('express');


const orderController = require('../services/orders');
const isAuth = require('../middlewares/is_auth');


const router = express.Router();
router.post('/', isAuth.loggedIn, orderController.createOrder);
router.get('/', isAuth.loggedIn, orderController.getOrders);
router.get('/:orderId', isAuth.loggedIn, orderController.downloadInvoice);


module.exports = router;