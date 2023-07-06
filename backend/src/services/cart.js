const Product = require('../models/product');


function getProductsInCart(req, res, next) {

  req.user
    .getCart()
    .then(cart => {
      console.log(cart);
      return cart
        .getProducts()
        .then(products => {

          res.send(products);
        })
    })
    .catch(e => {
      const error = new Error(e);
      error.statusCode = 500;
      return next(error);
    });
}


function addProductToCart(req, res, next) {

  const productId = req.params.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then(cart => {
      console.log(cart);
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      // if there is already a product by id
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      // if no products found in cart
      return Product.findByPk(productId);
    })
    .then(product => {
      res.send(product);
      fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    })
    .catch(e => {
      const error = new Error(e);
      error.statusCode = 500;
      return next(error);
    });

}

function deleteProductFromCart(req, res, next) {

  const productId = req.body['productId'];

  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products => {
      const product = products[0];
      // delete cart item
      return product.cartItem.destroy();
    })
    .then(cartItem => {

      res.send(cartItem);
    })
    .catch(e => {
      const error = new Error(e);
      error.statusCode = 500;
      return next(error);
    });
}


module.exports = {
  getProductsInCart,
  addProductToCart,
  deleteProductFromCart,
};