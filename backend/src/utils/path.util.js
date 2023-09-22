const path = require('path');

// global `process` variable
// module.exports = path.dirname(process.mainModule.filename);

const rootDir = path.dirname(require.main.filename);
const uploadDir = path.join(rootDir, 'uploads');
const uploadedImagesDir = path.join(uploadDir, 'images');
const uploadedVideosDir = path.join(uploadDir, 'videos');

module.exports = { rootDir, uploadDir, uploadedImagesDir, uploadedVideosDir };