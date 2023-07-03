const path = require('path');

// global `process` variable
// module.exports = path.dirname(process.mainModule.filename);

const rootDir = path.dirname(require.main.filename);


module.exports = { rootDir };