const { Op, QueryTypes } = require('sequelize');
const Product = require('../models/product.model');
const validationUtils = require('../utils/validation.util');
const fileUtils = require('../utils/file.util');
const errorsService = require('../controllers/errors.controller');
const ProductImage = require('../models/product-image.model');
const { sequelize, getMagicMethods } = require('../utils/database.util');
const { redisClient } = require('../utils/redis-store.util');
const User = require('../models/user.model');
const ProductVideo = require('../models/product-video.model');
const ProductThumbnail = require('../models/product-thumbnail');


async function createProduct(req, res, next) {

  try {

    if(!req.files) {
      return res.status(422).json({
        code: 'IMAGES_MISSING',
        message: 'Images are missing'
      })
    }

    const imageUrls = req.files.map(file => {
      return `${req.protocol}://${req.get('host')}/uploads/images/${file.filename}`
    });
  
    const type = req.body['type'];
    const category = req.body['category'];
    const projectName = req.body['projectName'];
    const address = req.body['address'];
    const numBedrooms = req.body['numBedrooms'];
    const numBathrooms = req.body['numBathrooms'];
    const balconDirection = req.body['balconDirection'];
    const mainDoorDirection = req.body['mainDoorDirection'];
    const legalDocsStatus = req.body['legalDocsStatus'];
    const furnitureStatus = req.body['furnitureStatus'];
    const area = req.body['area'];
    const price = req.body['price'];
    const deposit = req.body['deposit'] || null;
    const postTitle = req.body['postTitle'];
    const description = req.body['description'];
    const userType = req.body['userType'];
  
    validationUtils.sendMessage(req, res, 422);
    
    const productData = { type, category, projectName, address, numBedrooms, numBathrooms, balconDirection, mainDoorDirection, legalDocsStatus, furnitureStatus, area, price, deposit, postTitle, description, userType };
    console.log({ productData });

    const product = await req.user.createProduct(productData);

    if(!product) {
      return res.status(500).json({
        message: 'Cannot create product'
      })
    }

    await product.createProduct_thumbnail({ imageUrl: imageUrls[0] });

    const createProductImages = imageUrls.slice(1).map((imageUrl) => {
      return product.createProduct_image({ imageUrl });
    });

    await Promise.all(createProductImages);

    return res.status(200).json(product);

  } catch(error) {

    console.error(error);
    return next(error);
  }

}


async function uploadProductVideo(req, res, next) {

  const productId = req.query['productId'];

  if(!productId) {
    return res.status(422).json({
      code: 'NO_PRODUCT_ID',
      message: 'No product id is specified'
    })
  }

  if(!req.file) {
    return res.status(422).json({
      code: 'VIDEO_MISSING',
      message: 'No video is uploaded'
    })
  }

  const videoUrl = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`

  const productArray = await Product.findAll({ where: { id: productId }, include: User });

  if(productArray.length === 0) {
    return res.status(404).json({
      code: 'PRODUCT_NOT_FOUND',
      message: 'User does not have specified product'
    });
  }

  const product = productArray[0];

  const currentUser = await product.getUser({ id: req.user.id });

  if(!currentUser) {
    return res.status(403).json({
      code: 'Unauthorized',
      message: 'User is not allowed to create video for this product'
    });
  }
  
  const video = await product.createProduct_video({ videoUrl });
  return res.status(200).json(video);

}

async function createVideoThumbnail(req, res, next) {

  const productId = req.query['productId'];

  if(!productId) {
    return res.status(422).json({
      code: 'NO_PRODUCT_ID',
      message: 'No product id is specified'
    })
  }

  if(!req.file) {
    return res.status(422).json({
      code: 'VIDEO_THUMBNAIL_MISSING',
      message: 'No video thumbnail is uploaded'
    })
  }

  const videoThumbnailUrl = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;

  const productArray = await Product.findAll({ where: { id: productId }, include: User });

  if(productArray.length === 0) {
    return res.status(404).json({
      code: 'PRODUCT_NOT_FOUND',
      message: 'User does not have specified product'
    });
  }

  const product = productArray[0];

  const currentUser = await product.getUser({ id: req.user.id });

  if(!currentUser) {
    return res.status(403).json({
      code: 'Unauthorized',
      message: 'User is not allowed to create video thumbnail for this product'
    });
  }
  
  const videoThumbnail = await product.createVideo_thumbnail({ imageUrl: videoThumbnailUrl });
  return res.status(200).json(videoThumbnail);

}

async function getProductCount(req, res, next) {

  try {
    
    const cachedProductCount = await redisClient.get('productCount');

    if(cachedProductCount) {
      return res.status(200).json(JSON.parse(cachedProductCount));
    }

    const count = await Product.count();
    
    await redisClient.setEx('productCount', 10, JSON.stringify(count));

    return res.status(200).json(count);

  } catch(error) {

    return next(error);
  }
}

async function getProducts(req, res, next) {

  try {

    const limit = Number.parseInt(req.query['limit']) || 20;
    const offset = Number.parseInt(req.query['offset']) || 0;
    const category = req.query['category'];
    const userType = req.query['userType'];
    const type = req.query['type'];
    
    validationUtils.sendMessage(req, res, 422);

    console.log({ limit, offset, category, userType, type });

    const where = {
      ...(category) && { category }, 
      ...(userType) && { userType }, 
      ...(type) && { type }
    };

    console.log({ where });

    const criteria = { ...where, limit, offset };

    const cachedProducts = await redisClient.get(`getProducts:${Object.values(criteria)}`);
    if(cachedProducts) {
      return res.status(200).json(JSON.parse(cachedProducts));
    }

    const products = await Product.findAll({ where, limit, offset, order: [[ 'updatedAt', 'DESC' ]] })

    if(!products) {
      return res.status(200).json([]);
    }

    const productIdList = products.map(product => product.id);
    const productImages = productIdList.map(async (productId) => {
      return ProductImage.findAll({ where: { productId }, attributes: ['imageUrl', 'updatedAt'] })
    })
    const productImageList = await Promise.all(productImages);

    const productInfo = productImageList.map((imageList, index) => {
      return {
        details: products[index],
        images: imageList
      }
    });

    await redisClient.setEx(`getProducts:${Object.values(criteria)}`, 10, JSON.stringify(productInfo));    

    return res.status(200).json(productInfo);

  } catch(error) {

    console.log(error);
    return next(error);
  }

}


async function getProductById(req, res, next) {

  try {
    
    const productId = req.params['productId'];

    const cachedProduct = await redisClient.get(`/products[${productId}]`);

    if(cachedProduct) {
      return res.status(200).json(JSON.parse(cachedProduct));
    }

    const product = await Product.findByPk(productId, { raw: true });

    if(!product) {
      return res.status(200).json({});
    }

    const productImages = await ProductImage.findAll({ where: { productId }, attributes: ['imageUrl'] });
    const productImageUrls = productImages.map(item => item.imageUrl);
    const productVideo = await ProductVideo.findOne({ where: { productId }, attributes: ['videoUrl'] });
    const result = {
      ...product, 
      images: productImageUrls,
      video: productVideo? productVideo.videoUrl: ''
    }

    await redisClient.setEx(`/products[${productId}]`, 10, JSON.stringify(result));

    return res.status(200).json(result);
    
  } catch(error) {

    console.error(error);
    return next(error);
  }
  
}

async function updateProductById(req, res, next) {

  try {

    const productId = req.params['productId'];
    const type = req.body['type'];
    const category = req.body['category'];
    const projectName = req.body['projectName'];
    const address = req.body['address'];
    const numBedrooms = req.body['numBedrooms'];
    const numBathrooms = req.body['numBathrooms'];
    const balconDirection = req.body['balconDirection'];
    const mainDoorDirection = req.body['mainDoorDirection'];
    const legalDocsStatus = req.body['legalDocsStatus'];
    const furnitureStatus = req.body['furnitureStatus'];
    const area = req.body['area'];
    const price = req.body['price'];
    const deposit = req.body['deposit'];
    const postTitle = req.body['postTitle'];
    const description = req.body['description'];
  
    validationUtils.sendMessage(req, res, 422);
  
    const product = await Product.findByPk(productId);

    if(!product) {
      return res.status(200).json({});
    }

    product.type = type? type: product.type;
    product.category = category? category: product.category;
    product.projectName = projectName? projectName: product.projectName;
    product.address = address? address: product.address;
    product.numBedrooms = numBedrooms? numBedrooms: product.numBedrooms;
    product.numBathrooms = numBathrooms? numBathrooms: product.numBathrooms;
    product.balconDirection = balconDirection? balconDirection: product.balconDirection;
    product.mainDoorDirection = mainDoorDirection? mainDoorDirection: product.mainDoorDirection;
    product.legalDocsStatus = legalDocsStatus? legalDocsStatus: product.legalDocsStatus;
    product.furnitureStatus = furnitureStatus? furnitureStatus: product.furnitureStatus;
    product.area = area? area: product.area;
    product.price = price? price: product.price;
    product.deposit = deposit? deposit: product.deposit;
    product.postTitle = postTitle? postTitle: product.postTitle;
    product.description = description? description: product.description;

    await product.save();

    return res.status(200).json(product);

  } catch(error) {

    return next(error);
  }

}


async function deleteProductById(req, res, next) {

  const productId = req.params['productId'];
  
  const product = await Product.findByPk(productId);
  await product.destroy();

  return res.status(200).json(product);
  
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



module.exports = {
  createProduct,
  uploadProductVideo,
  createVideoThumbnail,
  getProducts,
  getProductCount,
  getProductById,
  updateProductById,
  deleteProductById,
};