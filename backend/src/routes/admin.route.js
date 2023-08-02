const express = require('express');
const multer = require('multer');

const productsController = require('../services/products');
const { adminOnly } = require('../middlewares/auth.middleware');
const productsValidator = require('../validators/products');
const { validateCreateProduct, validateUpdateProduct } = require('../validators/products.validator');


const router = express.Router();
const upload = multer();


router.get('/products', adminOnly, productsController.getProducts);
router.get('/products/:productId', adminOnly, productsController.getProductById);

router.post(
  '/products',
  adminOnly,
  // upload.array('image', 3), 
  // upload.single('image'), 
  // upload.none(), 
  validateCreateProduct,
  productsController.createProduct
); // product form-data in body
router.put(
  '/products/:productId',
  adminOnly,
  // upload.none(),
  validateUpdateProduct,
  productsController.updateProductById
);
router.delete(
  '/products/:productId',
  adminOnly,
  // upload.none(), 
  productsController.deleteProductById
);


module.exports = router;