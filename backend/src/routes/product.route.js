const express = require('express');


const { getProducts, getProductById, getProductCount, searchProducts, createProduct, createProductVideo, createVideoThumbnail, deleteProductById, updateProductById, updateProductVideo, updateVideoThumbnail } = require('../controllers/products.controller');
const { uploadMultipleFiles, uploadProduct, uploadMultipleImages, uploadVideo, uploadImage } = require('../middlewares/upload.middleware');
const { authRequired, loggedInRequired, adminOnly } = require('../middlewares/auth.middleware');
const { validateCreateProduct, validateUpdateProduct, validateGetProduct, validateSearchProducts } = require('../validators/products.validator');


const router = express.Router();

router.get('/', validateGetProduct(), getProducts);
router.get('/count', getProductCount);
router.get('/:productId/:slug', getProductById);
router.get('/search', validateSearchProducts(), searchProducts);

// must be authenticated
router.post(
  '/', 
  loggedInRequired,
  uploadMultipleImages, 
  validateCreateProduct(),
  createProduct
);

router.post(
  '/video-thumbnail',
  uploadImage,
  loggedInRequired,
  createVideoThumbnail
)

router.post(
  '/video',
  uploadVideo,
  loggedInRequired,
  createProductVideo
);

router.put(
  '/:productId',
  loggedInRequired,
  uploadMultipleImages,
  // validateUpdateProduct(),
  updateProductById
);

router.put(
  '/video-thumbnail',
  uploadImage,
  loggedInRequired,
  updateVideoThumbnail
)

router.put(
  '/video',
  uploadVideo,
  loggedInRequired,
  createProductVideo
);


router.delete(
  '/:productId', 
  loggedInRequired,
  deleteProductById
);
    

module.exports = router;