const {
  override,
  useBabelRc
} = require("customize-cra");


const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const addWebpackPlugins = config => {
  config.plugins.push(new UglifyJsPlugin());
  return config;
}

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addWebpackPlugins,
);

// module.exports = { optimization: { minimizer: [new UglifyJsPlugin()], }, };