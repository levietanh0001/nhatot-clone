const path = require('path');
const { rootDir } = require('./path.util');


const directions = ['dong', 'tay', 'nam', 'bac', 'dongnam', 'dongbac', 'taynam', 'taybac', ''];
const uploadDir = path.join(rootDir, 'uploads');


module.exports = {
  directions,
  uploadDir
}