const multer = require("multer");
const path = require('path');
const { passErrorToHandler, throwError } = require("../controllers/errors.controller");
const { rootDir } = require("../utils/path.util");
const { mkDirIfNotExists } = require("../utils/file.util");
const { returnError } = require("../utils/error.util");
const { uploadDir } = require("../utils/variables.util");


function uploadSingleFile() {

  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images'); // error = null, destination = 'uploads'
    },
    filename: (req, file, cb) => {
      cb(
        null,
        new Date().toISOString()
        + '-' + file.fieldname
        + '-' + file.originalname
      )
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


function uploadMultipleImages(req, res, next) {

  const options = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {

        const dest = path.join(uploadDir, 'images');
        mkDirIfNotExists(dest);
        
        cb(null, dest); // error = null, destination = 'uploads'
      },
      filename: (req, file, cb) => {
        req.imageName = new Date().toISOString() + file.originalname;
        cb(null, new Date().toISOString() + file.originalname);
        // cb(null, new Date().toISOString() + '-' + file.fieldname + '-' + file.originalname)
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
      fileSize: 5 * 1024 * 1024 // bytes
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
        req.videoName = new Date().toISOString() + file.originalname;
        cb(null, req.videoName)
        // cb(null, new Date().toISOString() + '-' + file.fieldname + '-' + file.originalname)
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

// function uploadMedia(req, res, next) {

//   const options = {
//     storage: multer.diskStorage({
//       destination: (req, file, cb) => {
        
//         const dest = path.join(uploadDir);
//         mkDirIfNotExists(dest);
//         cb(null, dest); // error = null, destination = 'uploads'
//       },
//       filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.fieldname + '-' + file.originalname)
//       }
//     }),
//     fileFilter: function(req, file, cb) {

//       if (file.mimetype === 'video/mp4') {
//         cb(null, true); // error = null, acceptFile = true
//       } else {
//         cb(null, false); // error = null, acceptFile = false
//       }
//     },
//     limits: {
//       fileSize: 50 * 1024 * 1024 // bytes
//     }
//   }

//   const uploads = multer({ ...options }).fields([
//     { name: 'images', maxCount: 6 },
//     { name: 'video', maxCount: 1 }
//   ]);

//   return uploads(req, res, (error) => {

//     if(error) {
//       returnError(res, 422, error);
//     }

//     next();
//   });

// }


module.exports = {
  uploadSingleFile,
  uploadMultipleImages,
  uploadVideo,
};


// function uploadFile(req, res, next) {
//     const upload = multer().single('yourFileNameHere');

//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             // A Multer error occurred when uploading.
//         } else if (err) {
//             // An unknown error occurred when uploading.
//         }
//         // Everything went fine. 
//         next()
//     })
// }