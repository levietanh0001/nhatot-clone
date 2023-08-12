const fs = require('fs');

function deleteFileByPath(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) {
      throw error;
    }
  });
}

async function deleteFileByPathAsync(filePath) {
  return fs.unlink(filePath);   
}

function mkDirIfNotExists(dir) {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

function doesPathExist(path) {
  return fs.existsSync(path);
}

module.exports = {
  deleteFileByPath,
  mkDirIfNotExists,
  deleteFileByPathAsync,
  doesPathExist
};
