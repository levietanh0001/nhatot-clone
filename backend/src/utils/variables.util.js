const path = require('path');
const { rootDir } = require('./path.util');

const directions = ['', 'dong', 'tay', 'nam', 'bac', 'dongnam', 'dongbac', 'taynam', 'taybac'];
const uploadDir = path.join(rootDir, 'uploads');
const databaseName = 'nhatot';



module.exports = {
  directions,
  uploadDir,
  databaseName
}