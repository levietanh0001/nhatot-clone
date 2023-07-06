const multer = require("multer");

function multerWrapper() {

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

    
    return multer({
        storage: fileStorage,
        limits: {
            fileSize: 1000 * 500 // bytes
        },
        fileFilter: fileFilter
    }).single('image');
}


module.exports = {
    multerWrapper
}


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