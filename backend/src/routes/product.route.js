const express = require('express');


const productsController = require('../controllers/products.controller');
const { uploadMultipleFiles, uploadProduct, uploadMultipleImages, uploadVideo } = require('../middlewares/upload-data.middleware');
const { authRequired, loggedInRequired } = require('../middlewares/auth.middleware');
const { validateCreateProduct, validateUpdateProduct, validateGetProduct } = require('../validators/products.validator');


const router = express.Router();

router.get('/', validateGetProduct(), productsController.getProducts);
router.get('/count', productsController.getProductCount);
router.get('/:productId', productsController.getProductById);

// must be authenticated
router.post(
  '/', 
  uploadMultipleImages, 
  // authRequired, 
  loggedInRequired,
  validateCreateProduct(),
  productsController.createProduct
);

router.post(
  '/video',
  uploadVideo,
  // authRequired,
  loggedInRequired,
  productsController.uploadProductVideo
);

router.put(
  '/:productId',
  // authRequired,
  loggedInRequired,
  validateUpdateProduct(),
  productsController.updateProductById
);

router.delete(
  '/:productId', 
  // authRequired,
  loggedInRequired,
  productsController.deleteProductById
);
    

module.exports = router;