const multer = require("multer");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { passErrorToHandler, throwError } = require("../controllers/errors.controller");
const { rootDir } = require("../utils/path.util");
const { mkDirIfNotExists } = require("../utils/file.util");
const { returnError } = require("../utils/error.util");
const { uploadDir } = require("../utils/variables.util");


// function uploadAvatarImage(req, res, next) {

//   const options = {
//     storage: multer.diskStorage({
//       destination: (req, file, cb) => {

//         const dest = path.join(uploadDir, 'images');
//         mkDirIfNotExists(dest);
        
//         cb(null, dest); // error = null, destination = 'uploads'
//       },
//       filename: (req, file, cb) => {
//         req.imageName = new Date().toISOString() + '-' +
//                         uuidv4().toString() + '-' +
//                         file.originalname
//         cb(null, req.imageName);
//       }
//     }),
//     fileFilter: function(req, file, cb) {

//       if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         cb(null, true); // error = null, acceptFile = true
//       } else {
//         cb(null, false); // error = null, acceptFile = false
//       }
//     },
//     limits: {
//       fileSize: 5 * 1024 * 1024 // 5mb
//     }
//   }

//   const uploads = multer({ ...options }).single('image');

//   return uploads(req, res, (error) => {

//     if(error) {
//       returnError(res, 422, error);
//     }

//     return next();
//   });

// }

function uploadSingleFile() {

  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images'); // error = null, destination = 'uploads'
    },
    filename: (req, file, cb) => {
      const fileName =  new Date().toISOString() + '-' +
                        uuidv4().toString() + '-' +
                        file.originalname;
      cb(null, fileName)
    }
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true); // error = null, acceptFile = true
    } else {
      cb(null, false); // error = null, acceptFile = false
    }
  }

  const limits = {
    fileSize: 1000 * 500 // bytes
  }

  return multer({ storage: fileStorage, limits: limits, fileFilter: fileFilter }).single('image');
}


function uploadImage(req, res, next) {

  const options = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {

        const dest = path.join(uploadDir, 'images');
        mkDirIfNotExists(dest);
        
        cb(null, dest); // error = null, destination = 'uploads'
      },
      filename: (req, file, cb) => {
        req.imageName = new Date().toISOString() + '-' +
                        uuidv4().toString() + '-' +
                        file.originalname
        cb(null, req.imageName);
      }
    }),
    fileFilter: function(req, file, cb) {

      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true); // error = null, acceptFile = true
      } else {
        cb(null, false); // error = null, acceptFile = false
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024 // 5mb
    }
  }

  const uploads = multer({ ...options }).single('image');

  return uploads(req, res, (error) => {

    if(error) {
      returnError(res, 422, error);
    }

    return next();
  });

}


function uploadMultipleImages(req, res, next) {

  const options = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {

        const dest = path.join(uploadDir, 'images');
        mkDirIfNotExists(dest);
        
        cb(null, dest); // error = null, destination = 'uploads'
      },
      filename: (req, file, cb) => {
        req.imageName = new Date().toISOString() + '-' +
                        uuidv4().toString() + '-' +
                        file.originalname;
        cb(null, req.imageName);
      }
    }),
    fileFilter: function(req, file, cb) {

      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true); // error = null, acceptFile = true
      } else {
        cb(null, false); // error = null, acceptFile = false
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024 // 5mb
    }
  }

  const uploads = multer({ ...options }).array('images', 6);

  return uploads(req, res, (error) => {

    if(error) {
      returnError(res, 422, error);
    }

    next();
  });

}


function uploadVideo(req, res, next) {

  const options = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {

        const dest = path.join(uploadDir, 'videos');
        mkDirIfNotExists(dest);
        cb(null, dest); // error = null, destination = 'uploads'
      },
      filename: (req, file, cb) => {
        req.videoName = new Date().toISOString() + '-' +
                        uuidv4().toString() + '-' +
                        file.originalname;
        cb(null, req.videoName)
      }
    }),
    fileFilter: function(req, file, cb) {

      if (file.mimetype === 'video/mp4') {
        cb(null, true);
      } else {
        cb('wrong file format', false); // error = null, acceptFile = false
      }
    },
    limits: {
      fileSize: 50 * 1024 * 1024 // bytes
    }
  }

  const uploads = multer({ ...options }).single('video');

  return uploads(req, res, (error) => {

    if(error) {
      returnError(res, 422, error);
    }

    next();
  });

}

function uploadMedia(req, res, next) {

  const options = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        
        const dest = path.join(uploadDir);
        mkDirIfNotExists(dest);
        cb(null, dest); // error = null, destination = 'uploads'
      },
      filename: (req, file, cb) => {
        const fileName =  new Date().toISOString() + '-' +
                          uuidv4().toString() + '-' +
                          file.originalname;
        cb(null, fileName)
      }
    }),
    fileFilter: function(req, file, cb) {

      if (file.mimetype === 'video/mp4') {
        cb(null, true); // error = null, acceptFile = true
      } else {
        cb(null, false); // error = null, acceptFile = false
      }
    },
    limits: {
      fileSize: 50 * 1024 * 1024 // bytes
    }
  }

  const uploads = multer({ ...options }).fields([
    { name: 'images', maxCount: 6 },
    { name: 'video', maxCount: 1 }
  ]);

  return uploads(req, res, (error) => {

    if(error) {
      returnError(res, 422, error);
    }

    next();
  });

}


module.exports = {
  uploadSingleFile,
  uploadMultipleImages,
  uploadVideo,
  uploadImage,
  uploadMedia,
  // uploadAvatarImage
};