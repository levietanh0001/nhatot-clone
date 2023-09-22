const express = require('express');


const orderController = require('../services/orders');
const { loggedInRequired } = require('../middlewares/auth.middleware');


const router = express.Router();
router.post('/', loggedInRequired, orderController.createOrder);
router.get('/', loggedInRequired, orderController.getOrders);
router.get('/:orderId', loggedInRequired, orderController.downloadInvoice);


module.exports = router;