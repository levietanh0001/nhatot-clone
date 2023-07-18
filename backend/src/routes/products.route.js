const express = require('express');


const productsController = require('../controllers/products.controller');
const { uploadMultipleFiles, uploadProduct, uploadMultipleImages, uploadVideo } = require('../middlewares/upload-data.middleware');


const router = express.Router();

// router.get('/', productsController.getProducts);
// router.get('/:productId', productsController.getProductById);
router.post('/', uploadMultipleImages, productsController.createProduct);
router.post('/video', uploadVideo, productsController.uploadProductVideo);



module.exports = router;