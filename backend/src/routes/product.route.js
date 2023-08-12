const express = require('express');


const productsController = require('../controllers/products.controller');
const { uploadMultipleFiles, uploadProduct, uploadMultipleImages, uploadVideo, uploadImage } = require('../middlewares/upload.middleware');
const { authRequired, loggedInRequired } = require('../middlewares/auth.middleware');
const { validateCreateProduct, validateUpdateProduct, validateGetProduct } = require('../validators/products.validator');


const router = express.Router();

router.get('/', validateGetProduct(), productsController.getProducts);
router.get('/count', productsController.getProductCount);
router.get('/:productId', productsController.getProductById);

// must be authenticated
router.post(
  '/', 
  loggedInRequired,
  uploadMultipleImages, 
  validateCreateProduct(),
  productsController.createProduct
);

router.post(
  '/video-thumbnail',
  uploadImage,
  loggedInRequired,
  productsController.createVideoThumbnail
)

router.post(
  '/video',
  uploadVideo,
  loggedInRequired,
  productsController.createProductVideo
);

router.put(
  '/:productId',
  loggedInRequired,
  uploadMultipleImages,
  // validateUpdateProduct(),
  productsController.updateProductById
);

router.put(
  '/video-thumbnail',
  uploadImage,
  loggedInRequired,
  productsController.updateVideoThumbnail
)

router.put(
  '/video',
  uploadVideo,
  loggedInRequired,
  productsController.createProductVideo
);


router.delete(
  '/:productId', 
  loggedInRequired,
  productsController.deleteProductById
);
    

module.exports = router;