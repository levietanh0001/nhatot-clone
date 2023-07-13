const { override, useBabelRc, adjustStyleLoaders } = require('customize-cra');
const glob = require('glob');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const addWebpackPlugins = (config, env) => {
  config.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: { compress: { unused: true, dead_code: true } },
    })
  );
  // config.plugins.push(new PurgecssPlugin({
  //   paths: glob.sync(`${path.join(__dirname, 'build')}/*`)
  // }));
  return config;
};

const disableChunking = (config) => {
  config.optimization.splitChunks = {
    cacheGroups: { default: false },
  };
  config.optimization.runtimeChunk = false;

  return config;
};

const cssLoader = adjustStyleLoaders(({ use }) => {
  use.forEach((loader) => {
    if (/mini-css-extract-plugin/.test(loader.loader)) {
      loader.loader = require.resolve('style-loader');
      loader.options = {};
    }
  });
});

const isProd = process.env.NODE_ENV.includes('prod');

// production
module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  isProd ? addWebpackPlugins : null,
  isProd ? disableChunking : null,
  isProd ? cssLoader : null
);
