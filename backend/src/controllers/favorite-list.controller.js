const Product = require("../models/product.model");




async function getFavoriteListDetails(req, res, next) {

  const currentFavoriteList = await req.user.getFavorite_list();
  const currentProducts = await currentFavoriteList.getProducts();
  const productIds = currentProducts.map(product => {
    return product.id;
  })

  return res.status(200).json({ userId: req.user.id, productIds });
}


async function addProductToFavoriteList(req, res, next) {

  try {

    const productId = req.params['productId'];
    const favoriteList = req.favoriteList;
    
    const currentProducts = await favoriteList.getProducts({ where: { id: productId } });
    const currentProduct = currentProducts[0];
  
    if(!currentProduct) { // if product is not found in favorite list
  
      const product = await Product.findByPk(productId);
      
      if(!product) {
        return res.status(422).json({
          code: 'PRODUCT_NOT_FOUND',
          message: `product ${productId} does not exist`,
        });
      }

      await favoriteList.addProduct(product, { through: { quantity: 1 } });
  
      return res.status(200).json({
        code: 'SUCCESS',
        message: `Successfully added product ${productId} to favorite list`,
      });
    }

    return res.status(200).json({
      code: 'PRODUCT_ALREADY_EXISTS',
      message: `Product ${productId} already exists in favorite list`,
    });

    // const oldQuantity = currentProduct.favorite_item.quantity;
    // const result = await favoriteList.addProduct(currentProduct, { through: { quantity: oldQuantity + 1 } });  
  
    // return res.status(200).json({
    //   code: 'SUCCESS',
    //   message: `Successfully added product ${productId} to favorite list`,
    //   quantity: currentProduct.favorite_item.quantity + 1
    // });

  } catch(error) {

    console.error(error);
    return next(error);
  }
  
}


async function deleteProductToFavoriteList(req, res, next) {

  try {

    const productId = req.params['productId'];
    const favoriteList = req.favoriteList;
    
    const currentProducts = await favoriteList.getProducts({ where: { id: productId } });
    const currentProduct = currentProducts[0];
  
    if(currentProduct) { // if product is not found in favorite list
  
      const product = await Product.findByPk(productId);
      await favoriteList.removeProduct(product);
  
      return res.status(200).json({
        code: 'SUCCESS',
        message: `Successfully removed product ${productId} from favorite list`,
      });
    }

    return res.status(200).json({
      code: 'PRODUCT_ALREADY_REMOVED',
      message: `Product ${productId} has already been removed from favorite list`,
    });

  } catch(error) {

    console.error(error);
    return next(error);
  }
}


module.exports = {
  getFavoriteListDetails,
  addProductToFavoriteList,
  deleteProductToFavoriteList
}