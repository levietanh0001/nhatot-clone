const express = require('express');
// const multer = require('multer');

const { adminOnly, loggedInRequired } = require('../middlewares/auth.middleware');
const { getAllUserProfiles } = require('../controllers/user-profile.controller');
const { revokeRefreshToken, verifyUser } = require('../controllers/auth.controller');
const { getAllProducts } = require('../controllers/products.controller');
const { validateGetProduct } = require('../validators/products.validator');
// const productsController = require('../services/products');
// const productsValidator = require('../validators/products');
// const { validateCreateProduct, validateUpdateProduct } = require('../validators/products.validator');


// const upload = multer();

const router = express.Router();

router.get('/user-profile', loggedInRequired, adminOnly, getAllUserProfiles);
router.get('/products', loggedInRequired, adminOnly, validateGetProduct(), getAllProducts);

router.put('/user/revoke-refresh-token', loggedInRequired, adminOnly, revokeRefreshToken);
router.put('/user/verify', loggedInRequired, adminOnly, verifyUser);
// router.put('/user/ban', loggedInRequired, adminOnly, banUser);


// router.get('/products', adminOnly, productsController.getProducts);
// router.get('/products/:productId', adminOnly, productsController.getProductById);

// router.post(
//   '/products',
//   adminOnly,
//   // upload.array('image', 3), 
//   // upload.single('image'), 
//   // upload.none(), 
//   validateCreateProduct,
//   productsController.createProduct
// ); // product form-data in body
// router.put(
//   '/products/:productId',
//   adminOnly,
//   // upload.none(),
//   validateUpdateProduct,
//   productsController.updateProductById
// );
// router.delete(
//   '/products/:productId',
//   adminOnly,
//   // upload.none(), 
//   productsController.deleteProductById
// );


module.exports = router;