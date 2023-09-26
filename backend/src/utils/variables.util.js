const path = require('path');
const { rootDir } = require('./path.util');

const directions = ['', 'dong', 'tay', 'nam', 'bac', 'dongnam', 'dongbac', 'taynam', 'taybac'];
const uploadDir = path.join(rootDir, 'uploads');
const databaseName = process.env.MYSQL_DATABASE_NAME;



module.exports = {
  directions,
  uploadDir,
  databaseName
}