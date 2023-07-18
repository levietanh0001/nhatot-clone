const fs = require('fs');

function deleteFileByPath(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) {
      throw error;
    }
  });
}

function mkDirIfNotExists(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

module.exports = {
  deleteFileByPath,
  mkDirIfNotExists
};
