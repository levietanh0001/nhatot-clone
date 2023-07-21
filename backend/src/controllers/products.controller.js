const { Op } = require('sequelize');
const Product = require('../models/product.model');
const validationUtils = require('../utils/validation.util');
const fileUtils = require('../utils/file.util');
const errorsService = require('../controllers/errors.controller');
const ProductImage = require('../models/product-image.model');


function createProduct(req, res, next) {

  const imageUrls = req.files.map(file => {
    return `${req.protocol}://${req.get('host')}/uploads/images/${file.filename}`
  });

  // const imageList = imageUrls.map(imageUrl => (
  //   {
  //     imageUrl: imageUrl
  //   }
  // ))

  // res
  //   .status(200)
  //   .json({
  //     // url: `${req.protocol}://${req.get('host')}/uploads/images/${req.imageName}`,
  //     imageUrls: imageUrls,
  //     // result,
  //     body: req.body,
  //     files: req.files,
  //     uid: req.uid
  //   })

  Product
    .create({...req.body, userId: req.uid})
    .then(result => {

      imageUrls.forEach(url => {
        result.createProduct_image({
          imageUrl: url
        })
      });

      res
        .status(200)
        .json({
          result,
          body: req.body,
          files: req.files,
          uid: req.uid,
          productId: result.id
        })
    })
    .catch(error => {

      console.error(error);
      res.status(403).json({
        message: 'Cannot create product',
        error
      })
    })

}


function uploadProductVideo(req, res, next) {

  const productId = req.query['productId'];
  const videoUrl = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`

  Product
    .findByPk(productId)
    .then(result => {
      result.createProduct_video({
        videoUrl
      });

      res.status(200).json({
        videoUrl,
        body: req.body,
        file: req.file,
        uid: req.uid
      })

    })
    .catch(error => {

      console.error(error);
      res.status(403).json({
        message: 'Cannot create video',
        error
      })
    })

}

// function createProduct(req, res, next) {

//   const productTitle = req.body['title'];
//   const productPrice = req.body['price'];
//   const productDescription = req.body['description'];
//   const image = req.file;
//   const productImageURL = image?.path;

//   console.log(req.file);

//   validationUtils.sendMessage(req, res, 422);

//   req.user
//     .createProduct({
//       title: productTitle,
//       price: productPrice,
//       description: productDescription,
//       imageURL: productImageURL,
//     })
//     .then(product => {
//       const statusCode = 201;
//       return res
//         .status(statusCode)
//         .json({
//           statusCode: statusCode,
//           data: product.dataValues,
//           message: 'Product created successfully'
//         });
//     })
//     .catch(error => {
//       errorsService.passErrorToHandler(error, next);
//     });
// }


function getProducts(req, res, next) {

  const limit = Number.parseInt(req.query['limit']);
  const offset = Number.parseInt(req.query['offset']);

  let filter = {};
  if (limit) { filter.limit = limit };
  if (offset) { filter.offset = offset };
  filter = { ...filter, raw: true };

  Product
    .findAll(filter)
    .then(products => {
      return res
        .status(200)
        .json(products);
    })
    .catch(error => {
      errorsService.passErrorToHandler(error, next);
    });
}


function getProductById(req, res, next) {

  const productId = req.params['productId'];
  console.log('[services/products].getProductById');
  req.user
    .getProducts({
      where: { id: productId },
    })
    .then(products => {
      if (!products.length) {
        errorsService.throwError(404, 'Not found', 'Product does not exist');
      }

      res
        .status(200)
        .json(products[0]);
    })
    .catch(error => {
      errorsService.passErrorToHandler(error, next);
    });
}

function updateProductById(req, res, next) {

  const productId = req.params['productId'];
  const title = req.body['title'];
  const price = req.body['price'];
  const description = req.body['description'];
  const image = req.file;

  validationUtils.sendMessage(req, res, 422);

  Product
    .findByPk(productId)
    .then(product => {
      if (!product) {
        errorsService.throwError(404, 'Not found', 'Product does not exist');
      }

      product.title = title;
      product.price = price;
      product.description = description;

      if (image) { // if new image is provided

        // delete old image
        fileUtils.deleteFileByPath(product.imageURL);

        product.imageURL = image.path; // change image url accordingly
      }

      return product.save();
    })
    .then(product => {
      return res
        .status(200)
        .json(product.dataValues);
    })
    .catch(error => {
      errorsService.passErrorToHandler(error, next);
    });
}


function deleteProductById(req, res, next) {

  const productId = req.params['productId'];

  Product
    .findByPk(productId)
    .then(product => {
      if (!product) {
        errorsService.throwError(404, 'Not found', 'Product does not exist');
      }

      fileUtils.deleteFileByPath(product.imageURL);
      return product.destroy();
    })
    .then(product => {
      return res
        .status(200)
        .json(product); // return product and message
    })
    .catch(error => {
      errorsService.passErrorToHandler(error, next);
    });
}


module.exports = {
  createProduct,
  uploadProductVideo,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};