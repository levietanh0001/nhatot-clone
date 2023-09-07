const { kebabCase } = require('lodash');
const path = require('path');
const Product = require('../models/product.model');
const validationUtils = require('../utils/validation.util');
const { doesPathExist, deleteFileByPath } = require('../utils/file.util');
const ProductImage = require('../models/product-image.model');
const { sequelize, getMagicMethods } = require('../utils/database.util');
const { redisClient } = require('../utils/redis-store.util');
const User = require('../models/user.model');
const ProductVideo = require('../models/product-video.model');
const ProductThumbnail = require('../models/product-thumbnail');
const VideoThumbnail = require('../models/video-thumbnail');
const { uploadedImagesDir, uploadedVideosDir } = require('../utils/path.util');
const { toLowerCaseNonAccentVietnamese } = require('../utils/text.util');
const { databaseName } = require('../utils/variables.util');
const { QueryTypes } = require('sequelize');



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
    
    const slug = kebabCase(toLowerCaseNonAccentVietnamese(postTitle));
    const productData = { type, category, projectName, address, numBedrooms, numBathrooms, balconDirection, mainDoorDirection, legalDocsStatus, furnitureStatus, area, price, deposit, postTitle, description, userType, slug };
    console.log({ productData });

    const product = await req.user.createProduct(productData);

    if(!product) {
      return res.status(500).json({
        message: 'Cannot create product'
      })
    }

    if(imageUrls[0]) {
      await product.createProduct_thumbnail({ imageUrl: imageUrls[0] });
    }

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


async function createProductVideo(req, res, next) {

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


async function updateProductVideo(req, res, next) {

  // if a video exists for a product, remove it from uploads/

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


async function updateVideoThumbnail(req, res, next) {

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
  
  const result = await product.createVideo_thumbnail({ imageUrl: videoThumbnailUrl });
  return res.status(200).json(result);

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
  
  const result = await product.createVideo_thumbnail({ imageUrl: videoThumbnailUrl });
  return res.status(200).json(result);

}

async function getProductCount(req, res, next) {

  try {

    console.log({ query: req.query });

    // if userid, else
    const userId = req.query['userId'];
    const type = req.query['type'] ?? '';
    // const cachedProductCount = await redisClient.get(`productCount${userId}`);

    // if(cachedProductCount) {
    //   return res.status(200).json(JSON.parse(cachedProductCount));
    // }

    let count;
    if(!userId) {

      count = await sequelize.query(`
        SELECT COUNT(id) as count from ${databaseName}.product
        WHERE type like :type
      `, { replacements: { type: `%${type}%` }, type: QueryTypes.SELECT });

      count = count[0]['count'];

      // count = await Product.count();
    } else {
      const currentUser = await User.findByPk(userId);
      count = await currentUser.countProducts();
    }
    
    // await redisClient.setEx(`productCount${userId}`, 10, JSON.stringify(count));

    return res.status(200).json(count);

  } catch(error) {
    console.error(error);
    return next(error);
  }
}

async function getProducts(req, res, next) {

  try {
    
    validationUtils.sendMessage(req, res, 422);

    // get product by query here
    const q = req.query['q'];
    const limit = Number.parseInt(req.query['limit']) || 20;
    const offset = Number.parseInt(req.query['offset']) || 0;
    const type = req.query['type'];
    const category = req.query['category'];

    console.log({ category, type });
    
    if(q) {

      const cacheKey = { q, limit, offset, category, type };
      const cachedProducts = await redisClient.get(`getProducts:${Object.values(cacheKey)}`);
  
      if(cachedProducts) {
        return res.status(200).json(JSON.parse(cachedProducts));
      }

      // inner join with user profile? separate queries for getting user profile
      const sql = `
        SELECT *, 
        MATCH(projectName, base.address, postTitle) 
        AGAINST (:q) AS relevanceScore
        FROM (
          SELECT *, CONCAT(projectName, ' ', address, ' ', postTitle) as result
          FROM ${databaseName}.product
        ) base
        INNER JOIN ${databaseName}.user_profile on base.userId = ${databaseName}.user_profile.userId
        WHERE
          MATCH (projectName, base.address, postTitle) against (:q) > 0
                and category like :category
                and type like :type
        ORDER BY relevanceScore DESC
        LIMIT :limit
        OFFSET :offset
      `

      const products = await sequelize.query(
        sql, 
        { 
          replacements: { q: `%${q}%`, limit, offset, category: category ?? '%', type: type ?? '%' }, 
          type: QueryTypes.SELECT
        }
      );

      if(!products) {
        return res.status(200).json([]);
      }

      const productIdList = products.map(product => product.id);
      const productThumbnailImages = productIdList.map(async (productId) => {
        return ProductThumbnail.findOne({ where: { productId } });
      })
  
      const productThumbnailImageList = await Promise.all(productThumbnailImages);
  
      const productInfo = productThumbnailImageList.map((thumbnailImage, index) => {
        return {
          ...products[index],
          thumbnailImageUrl: thumbnailImage?.imageUrl
        }
      });

      await redisClient.setEx(`getProducts:${Object.values(cacheKey)}`, 10, JSON.stringify(productInfo));

      return res.status(200).json(productInfo);

    }

    if(!q) {

      const filterCriteria = { ...req.query, ...(type) && { type } };
      delete filterCriteria['limit'];
      delete filterCriteria['offset'];
      
      const where = { ...filterCriteria };
  
      const cacheKey = { ...where, limit, offset };
      const cachedProducts = await redisClient.get(`getProducts:${Object.values(cacheKey)}`);
  
      if(cachedProducts) {
        return res.status(200).json(JSON.parse(cachedProducts));
      }
      
      // const products = await Product.findAll({ 
      //   where, limit, offset, order: [[ 'updatedAt', 'DESC' ]] 
      // });
      
      const sql = `
        SELECT 
                product.id, product_thumbnail.imageUrl as thumbnailImageUrl, type, category, 
                projectName, product.address, numBedrooms, numBathrooms,
                area, price, postTitle, slug,
                description, userType, product.createdAt, product.updatedAt,
                product.userId, username, avatarUrl
        FROM ${databaseName}.product
        INNER JOIN ${databaseName}.user on product.userId = user.id
        INNER JOIN ${databaseName}.user_profile on product.userId = user_profile.userId
        INNER JOIN ${databaseName}.product_thumbnail on product.id = product_thumbnail.productId
        WHERE
            category like :category and 
            type like :type
        ORDER BY product.createdAt DESC
        LIMIT :limit
        OFFSET :offset
      `;

      const products = await sequelize.query(sql, { 
        replacements: { limit, offset, category: category ?? '%', type: type ?? '%' }, 
        type: QueryTypes.SELECT
      })

      if(!products) {
        return res.status(200).json([]);
      }

      await redisClient.setEx(`getProducts:${Object.values(cacheKey)}`, 10, JSON.stringify(products));    
  
      return res.status(200).json(products);
  
      // const productIdList = products.map(product => product.id);
      // const productThumbnailImages = productIdList.map(async (productId) => {
      //   return ProductThumbnail.findOne({ where: { productId } });
      // })
  
      // const productThumbnailImageList = await Promise.all(productThumbnailImages);
  
      // const productInfo = productThumbnailImageList.map((thumbnailImage, index) => {
      //   return {
      //     ...products[index].dataValues,
      //     thumbnailImageUrl: thumbnailImage?.imageUrl
      //   }
      // });
  
      // await redisClient.setEx(`getProducts:${Object.values(cacheKey)}`, 10, JSON.stringify(productInfo));    
  
      // return res.status(200).json(productInfo);
    }

  } catch(error) {

    console.log(error);
    return next(error);
  }

}

// let count = 0;

async function searchProducts(req, res, next) {

  try {

    const limit = Number.parseInt(req.query['limit']) || 10;
    const offset = Number.parseInt(req.query['offset']) || 0;
    const query = req.query['query'] ?? '%';
    const category = req.query['category'] ?? '%';
    const type = req.query['type'] ?? '%';
    
    validationUtils.sendMessage(req, res, 422);

    const cacheKey = { query, category, type, limit, offset };
    const cachedProducts = await redisClient.get(`searchProducts:${Object.values(cacheKey)}`);

    if(cachedProducts) {
      return res.status(200).json(JSON.parse(cachedProducts));
    }

    const sql = `
      SELECT type, category, projectName, postTitle, address FROM (
        SELECT *, CONCAT(projectName, ' ', postTitle, ' ', address) as result
        FROM nhatot.product
      ) base
      WHERE 
        lower(result) like lower(:query)
          and lower(category) like lower(:category)
          and lower(type) like lower(:type)
      LIMIT :limit
      OFFSET :offset
    `

    const products = await sequelize.query(sql, {
      replacements: { query: `%${query}%`, limit, offset, category, type }, 
      type: QueryTypes.SELECT
    });

    if(!products) {
      return res.status(200).json([]);
    }

    await redisClient.setEx(`searchProducts:${Object.values(cacheKey)}`, 10, JSON.stringify(products));

    return res.status(200).json(products);

  } catch(error) {

    console.log(error);
    return next(error);
  }

}


async function getProductById(req, res, next) {

  try {
    
    const productId = req.params['productId'];
    const slug = req.params['slug'];

    const cachedProduct = await redisClient.get(`products[${productId},${slug}]`);

    if(cachedProduct) {
      return res.status(200).json(JSON.parse(cachedProduct));
    }

    // const product = await Product.findByPk(productId, { raw: true });
    const product = await Product.findOne({ where: { id: productId, slug }, raw: true });

    if(!product) {
      return res.status(200).json({});
    }

    const productImages = await ProductImage.findAll({ where: { productId }, attributes: ['imageUrl'] });
    const productImageUrls = productImages.map(item => item.imageUrl);
    const productThumbnail = await ProductThumbnail.findOne({ where: { productId }, attributes: ['imageUrl'], raw: true });
    const productThumbnailUrl = productThumbnail?.imageUrl ?? '';
    // const productVideo = await ProductVideo.findOne({ where: { productId }, attributes: ['videoUrl'] });
    const videoThumbnail = await VideoThumbnail.findOne({ where: { productId }, attributes: ['imageUrl'] });
    const videoThumbnailUrl = videoThumbnail?.imageUrl ?? '';
    const result = {
      ...product, 
      imageUrls: [productThumbnailUrl, ...productImageUrls],
      videoThumbnailUrl
    }

    await redisClient.setEx(`products[${productId},${slug}]`, 10, JSON.stringify(result));

    return res.status(200).json(result);
    
  } catch(error) {

    console.error(error);
    return next(error);
  }
  
}

async function updateProductById(req, res, next) {

  try {

    const productId = req.params.productId;
  
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
    const imageUrls = JSON.parse(req.body['imageUrls']);
    const videoThumbnailUrl = req.body['videoThumbnailUrl'];

    // console.log({ body: req.body });
    // console.log({ uploadedImagesDir, uploadedVideosDir });
    // console.log({ imageUrls });
    
    // validationUtils.sendMessage(req, res, 422);
    
    const productData = { type, category, projectName, address, numBedrooms, numBathrooms, balconDirection, mainDoorDirection, legalDocsStatus, furnitureStatus, area, price, deposit, postTitle, description, userType };
    console.log({ productData });

    const currentProduct = await Product.findByPk(productId);

    if(!currentProduct) {
      return res.status(422).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'No product is found with supplied id'
      });
    }

    const currentUser = await currentProduct.getUser({ id: req.user.id });
    
    if(!currentUser) {
      return res.status(403).json({
        code: 'Unauthorized',
        message: 'User is not allowed to create video thumbnail for this product'
      });
    }
    
    if(JSON.stringify(currentProduct) === JSON.stringify(productData)) {
      return res.status(200).json({
        message: 'Nothing changed'
      })
    }
    
    currentProduct.type = type;
    currentProduct.category = category;
    currentProduct.projectName = projectName;
    currentProduct.address = address;
    currentProduct.numBedrooms = numBedrooms;
    currentProduct.numBathrooms = numBathrooms;
    currentProduct.balconDirection = balconDirection;
    currentProduct.mainDoorDirection = mainDoorDirection;
    currentProduct.legalDocsStatus = legalDocsStatus;
    currentProduct.furnitureStatus = furnitureStatus;
    currentProduct.area = area;
    currentProduct.price = price;
    currentProduct.deposit = deposit;
    currentProduct.postTitle = postTitle;
    currentProduct.description = description;
    currentProduct.userType = userType;

    await currentProduct.save();

    if(Array.isArray(imageUrls) && imageUrls.length > 0) {

      const currentProductImages = await currentProduct.getProduct_images();

      if(currentProductImages.length > 0) {

        const currentProductImageUrls = currentProductImages.map(image => image.imageUrl);
        const currentProductThumbnail = await currentProduct.getProduct_thumbnail();
        const currentProductThumbnailUrl = currentProductThumbnail? currentProductThumbnail.imageUrl: '';
        
        console.log({ currentProductImageUrls });

        let deletedImageUrls = currentProductImageUrls.map(imageUrl => {
          if (!imageUrls.includes(imageUrl)) {
            return imageUrl;
          }
        });

        if(!imageUrls.includes(currentProductThumbnailUrl)) {

          // replace product thumbnail
          // const currentThumbnail = await currentProduct.getProduct_thumbnail();
          currentProductThumbnail.imageUrl = imageUrls[0];
          await currentProductThumbnail.save();
          const deleteProductImage = await ProductImage.findOne({ where: { imageUrl: imageUrls[0] } });
          await deleteProductImage.destroy();

          deletedImageUrls = [...deletedImageUrls, currentProductThumbnailUrl];
        }
        
        console.log({ deletedImageUrls });
        
        if(deletedImageUrls.length > 0) {

          const deletedImages = await currentProduct.getProduct_images({ where: { imageUrl: deletedImageUrls }});
          console.log({ deletedImages });

          await currentProduct.removeProduct_images(deletedImages);

          deletedImageUrls.forEach((imageUrl) => {
            // console.log(String(imageUrl).replace(`${req.protocol}://${req.get('host')}/uploads/images/`, ''));
            if(imageUrl) {
              const imagePath = path.join(uploadedImagesDir, String(imageUrl).replace(`${req.protocol}://${req.get('host')}/uploads/images/`, ''));
              if(doesPathExist(imagePath)) {
                deleteFileByPath(imagePath);
              }
            }
          });
          
        }

      }

    }

    if(!videoThumbnailUrl) {
      const productVideos = await currentProduct.getProduct_videos({ where: { productId } });
      const productVideo = productVideos[0];
      if(productVideo) {
        const videoUrl = productVideo.videoUrl;
        await productVideo.destroy();
        const videoThumbnail = await currentProduct.getVideo_thumbnail();
        await videoThumbnail.destroy();
        const videoPath = path.join(uploadedVideosDir, String(videoUrl).replace(`${req.protocol}://${req.get('host')}/uploads/videos/`, ''));
        deleteFileByPath(videoPath);
      }
    }

    if(req.files) {
      const imageUrls = req.files.map(file => {
        return `${req.protocol}://${req.get('host')}/uploads/images/${file.filename}`
      });
      
      if(imageUrls[0]) {
        const currentProductThumbnail = await currentProduct.getProduct_thumbnail();
        currentProductThumbnail.imageUrl = imageUrls[0];
        await currentProductThumbnail.save();
        // await currentProduct.createProduct_thumbnail({ imageUrl: imageUrls[0] });
      }

      const createProductImages = imageUrls.slice(1).map((imageUrl) => {
        return currentProduct.createProduct_image({ imageUrl });
      });

      await Promise.all(createProductImages);
    }

    return res.status(200).json(currentProduct);

  } catch(error) {

    console.error(error);
    return next(error);
  }

}


async function deleteProductById(req, res, next) {

  try {

    const productId = req.params['productId'];
    
    const currentProducts = await req.user.getProducts({ where: { id: productId } });
    if(currentProducts.length === 0) {
      return res.status(422).json({
        code: 'PRODUCT_NOT_FOUND',
        message: 'User does not have such product'
      });  
    }

    const currentProduct = await Product.findByPk(productId);
    const product = await currentProduct.destroy();
    const count = await Product.count();
    // const result = await sequelize.query(`DELETE FROM nhatot.product WHERE (id = :productId)`, { replacements: { productId } });
  
    return res.status(200).json({ product, count });
    
  } catch(error) {

    console.error(error);
    return next(error);
  }
  
}


module.exports = {
  createProduct,
  createProductVideo,
  updateProductVideo,
  createVideoThumbnail,
  updateVideoThumbnail,
  getProducts,
  searchProducts,
  getProductCount,
  getProductById,
  updateProductById,
  deleteProductById,
};