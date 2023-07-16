const fs = require('fs');

function deleteFileByPath(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = {
  deleteFileByPath,
};
