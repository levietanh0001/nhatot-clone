const { override, useBabelRc, adjustStyleLoaders, addWebpackAlias } = require('customize-cra');
const glob = require('glob');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const PurgecssPlugin = require('purgecss-webpack-plugin');


const addWebpackPlugins = (config, env) => {
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: { unused: true, dead_code: true } 
      },
    })
  );
  // config.plugins.push(new PurgecssPlugin({
  //   paths: glob.sync(`${path.join(__dirname, 'build')}/*`)
  // }));
  return config;
};

const disableChunking = (config) => {
  config.optimization.runtimeChunk = false;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false
    }
  };
  return config;
};

const cssLoader = adjustStyleLoaders(({ use: [ , css, postcss, resolve, processor ] }) => {
  css.options.sourceMap = true;         // css-loader
  postcss.options.sourceMap = true;     // postcss-loader
  // when enable pre-processor,
  // resolve-url-loader will be enabled too
  if (resolve) {
    resolve.options.sourceMap = true;   // resolve-url-loader
  }
  // pre-processor
  if (processor && processor.loader.includes('sass-loader')) {
    processor.options.sourceMap = true; // sass-loader
  }
})

// const cssLoader = adjustStyleLoaders(({ use }) => {
//   use.forEach((loader) => {
//     if (/mini-css-extract-plugin/.test(loader.loader)) {
//       loader.loader = require.resolve('style-loader');
//       loader.options = {};
//     }
//     // loader.loader = require.resolve('sass-loader');
//     // loader.loader = require.resolve('css-loader');
//   });
// });

const isProd = process.env.NODE_ENV.includes('prod');

console.log({ isProd });

// production
module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addWebpackAlias({
    '@styles': path.resolve(__dirname, './src/styles'),
  }),
  isProd ? addWebpackPlugins : null,
  isProd ? disableChunking : null,
  isProd ? cssLoader : null,
);
