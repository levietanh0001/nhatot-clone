const { check, body, query } = require('express-validator');
const { directions } = require('../utils/variables.util');


function validateGetProduct() {
  return [
    // query('limit')
    //   .optional()
    //   .custom((value, { req, res }) => {
    //     if(typeof parseInt(value) !== 'number') {
    //       throw new Error('limit phải là một số')
    //     }
    //     return true;
    //   }),
    // query('offset')
    //   .optional()
    //   .custom((value, { req, res }) => {
    //     if(typeof parseInt(value) !== 'number') {
    //       throw new Error('offset phải là một số')
    //     }
    //     return true;
    //   })
    //   .withMessage('Offset phải là một số'),
    query('category')
      .optional()
      .isIn(['canhochungcu', 'nhao', 'khac'])
      .withMessage('Loại bất động sản không hợp lệ'),
    query('userType')
      .optional()
      .isIn(['canhan', 'moigioi'])
      .withMessage('Tư cách thành viên không hợp lệ'),
    query('type')
      .optional()
      .isIn(['canban', 'chothue'])
      .withMessage('Tư cách thành viên không hợp lệ'),
  ]
}

function validateCreateProduct() {
  return [
    body('type')
      .notEmpty()
      .withMessage('Danh mục bất động sản không được trống')
      .isIn(['canban', 'chothue'])
      .withMessage('Danh mục bất động sản không hợp lệ'),
    body('category')
      .notEmpty()
      .withMessage('Loại bất động sản không được trống')
      .isIn(['nhao', 'canhochungcu', 'khac'])
      .withMessage('Loại bất động sản không hợp lệ'),
    body('projectName')
      .isString()
      .withMessage('Tên dự án không hợp lệ')
      .isLength({ min: 0, max: 100 })
      .withMessage('Tên dự án cho phép tối đa 100 ký tự'),
    body('address')
      .notEmpty()
      .withMessage('Địa chỉ không thể trống')
      .isString()
      .withMessage('Địa chỉ không hợp lệ'),
    body('numBedrooms')
      .notEmpty()
      .withMessage('Số phòng ngủ không thể trống')
      .isInt()
      .withMessage('Số phòng ngủ không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      }),
    body('numBathrooms')
      .notEmpty()
      .withMessage('Số phòng tắm không thể trống')
      .isInt()
      .withMessage('Số phòng tắm không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      }),
    body('balconDirection')
      .isIn(directions)
      .withMessage('Hướng ban công không hợp lệ'),
    body('mainDoorDirection')
      .isIn(directions)
      .withMessage('Hướng cửa chính không hợp lệ'),
    body('legalDocsStatus')
      .isIn(['dacoso', 'dangchoso', 'giaytokhac'])
      .withMessage('Giấy tờ pháp lý không hợp lệ'),
    body('furnitureStatus')
      .isIn(['daydu', 'caocap', 'coban', 'khong', ''])
      .withMessage('Tình trạng nội thất không hợp lệ'),
    body('area')
      .notEmpty()
      .withMessage('Diện tích không thể trống')
      .isFloat()
      .withMessage('Diện tích không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      }),
    body('price')
      .notEmpty()
      .withMessage('Giá không thể trống')
      .isInt()
      .withMessage('Giá không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Giá cần lớn hơn 0')
        }
        return true;
      }),
    body('deposit')
      .isInt()
      .withMessage('Số tiền đặt cọc không hợp lệ')
      .optional({ values: 'falsy' }) // allows false values
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      })
      ,
    body('postTitle')
      .notEmpty()
      .withMessage('Tiêu đề không thể trống')
      .isString()
      .withMessage('Tiêu đề không hợp lệ')
      .isLength({ min: 10, max: 100 })
      .withMessage('Tiêu đề cần ít nhất 10 ký tự và tối đa 100 ký tự'),
    body('description')
      .notEmpty()
      .withMessage('Miêu tả không thể trống')
      .isString()
      .withMessage('Miêu tả không hợp lệ')
      .isLength({ min: 6, max: 200 })
      .withMessage('Miêu tả cần ít nhất 6 ký tự và tối đa 200 ký tự'),
  ];
}


function validateUpdateProduct() {
  return [
    body('type')
      .isIn(['canban', 'chothue'])
      .withMessage('Danh mục bất động sản không hợp lệ'),
    body('category')
      .optional()
      .isIn(['nhao', 'canhochungcu', 'khac'])
      .withMessage('Loại bất động sản không hợp lệ'),
    body('projectName')
      .optional()
      .isString()
      .withMessage('Tên dự án không hợp lệ')
      .isLength({ min: 0, max: 100 })
      .withMessage('Tên dự án cho phép tối đa 100 ký tự'),
    body('address')
      .optional()
      .isString()
      .withMessage('Địa chỉ không hợp lệ'),
    body('numBedrooms')
      .optional()
      .isInt()
      .withMessage('Số phòng ngủ không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      }),
    body('numBathrooms')
      .optional()
      .isInt()
      .withMessage('Số phòng tắm không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      }),
    body('balconDirection')
      .optional()
      .isIn(directions)
      .withMessage('Hướng ban công không hợp lệ'),
    body('mainDoorDirection')
      .optional()
      .isIn(directions)
      .withMessage('Hướng cửa chính không hợp lệ'),
    body('legalDocsStatus')
      .optional()
      .isIn(['dacoso', 'dangchoso', 'khac'])
      .withMessage('Giấy tờ pháp lý không hợp lệ'),
    body('furnitureStatus')
      .optional()
      .isIn(['daydu', 'caocap', 'coban', 'khong'])
      .withMessage('Tình trạng nội thất không hợp lệ'),
    body('area')
      .optional()
      .isFloat()
      .withMessage('Diện tích không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      }),
    body('price')
      .optional()
      .isInt()
      .withMessage('Giá không hợp lệ')
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Giá cần lớn hơn 0')
        }
        return true;
      }),
    body('deposit')
      .isInt()
      .withMessage('Số tiền đặt cọc không hợp lệ')
      .optional({ values: 'falsy' })
      .custom((value, { req, res }) => {
        if(Number(value) < 0) {
          throw new Error('Diện tích cần lớn hơn 0')
        }
        return true;
      })
      ,
    body('postTitle')
      .optional()
      .isString()
      .withMessage('Tiêu đề không hợp lệ')
      .isLength({ min: 10, max: 100 })
      .withMessage('Tiêu đề cần ít nhất 10 ký tự và tối đa 100 ký tự'),
    body('description')
      .optional()
      .isString()
      .withMessage('Miêu tả không hợp lệ')
      .isLength({ min: 6, max: 200 })
      .withMessage('Miêu tả cần ít nhất 6 ký tự và tối đa 200 ký tự'),
  ];
}


// const productsValidation = [
//   check('title')
//     .isString()
//     .withMessage('Product title must be a string')
//     .isLength({ min: 3, max: 30 })
//     .withMessage('Product title must has be between 3 and 30 characters long'),
//   check('price')
//     .isFloat()
//     .withMessage('Product price must be a number')
//     .custom((value, { req, res }) => {
//       if (value < 0) {
//         throw new Error('Product price must not be a negative number')
//       }
//       return true;
//     }),
//   check('description')
//     .isLength({ min: 0, max: 400 })
//     .withMessage('Product description must has be between 0 and 400 characters long')
//     .optional({ nullable: true }),
//   check('image-url')
//     .isURL()
//     .withMessage('Product image URL is invalid')
//     .optional({ nullable: true }),
// ]



module.exports = { validateCreateProduct, validateUpdateProduct, validateGetProduct }