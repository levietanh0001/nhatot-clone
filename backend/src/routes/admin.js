const express = require('express');
const multer = require('multer');

const productsController = require('../services/products');
const isAuth = require('../middlewares/is_auth');
const productsValidator = require('../validators/products');


const router = express.Router();
const upload = multer();


router.get('/products', isAuth.asAdmin, productsController.getProducts);
router.get('/products/:productId', isAuth.asAdmin, productsController.getProductById);

router.post(
    '/products',
    isAuth.asAdmin,
    // upload.array('image', 3), 
    // upload.single('image'), 
    // upload.none(), 
    productsValidator.validate_create_product(),
    productsController.createProduct
); // product form-data in body
router.put(
    '/products/:productId',
    isAuth.asAdmin,
    // upload.none(),
    productsValidator.validate_update_product(),
    productsController.updateProductById
);
router.delete(
    '/products/:productId',
    isAuth.asAdmin,
    // upload.none(), 
    productsController.deleteProductById
);


module.exports = router;