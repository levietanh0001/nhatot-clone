const express = require('express');


const productsController = require('../controllers/products.controller');
const { uploadMultipleFiles, uploadProduct, uploadMultipleImages, uploadVideo } = require('../middlewares/upload-data.middleware');
const { authRequired } = require('../middlewares/auth.middleware');


const router = express.Router();

// router.get('/', productsController.getProducts);
// router.get('/:productId', productsController.getProductById);
router.post(
  '/', 
  uploadMultipleImages, 
  authRequired, 
  productsController.createProduct
);
router.post(
  '/video', 
  uploadVideo, 
  authRequired, 
  productsController.uploadProductVideo
);



module.exports = router;