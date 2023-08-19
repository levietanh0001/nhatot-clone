const express = require('express');
const { loggedInRequired } = require('../middlewares/auth.middleware');
const { getFavoriteListDetails, addProductToFavoriteList, deleteProductToFavoriteList, getUserFavoriteProducts, countUserFavoriteProducts } = require('../controllers/favorite-list.controller');
const { createFavoriteListIfNotExists } = require('../middlewares/favorite-list.middleware');


const router = express.Router();

router.get('/products', loggedInRequired, createFavoriteListIfNotExists, getUserFavoriteProducts);
router.get('/products/count', loggedInRequired, createFavoriteListIfNotExists, countUserFavoriteProducts);
router.get('/', loggedInRequired, createFavoriteListIfNotExists, getFavoriteListDetails);
router.post('/:productId', loggedInRequired, createFavoriteListIfNotExists, addProductToFavoriteList);
router.delete('/:productId', loggedInRequired, createFavoriteListIfNotExists, deleteProductToFavoriteList);


module.exports = router;