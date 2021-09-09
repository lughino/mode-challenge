const webpack = require('webpack');
const webpackMerge = require('webpack-merge').merge;
const path = require('path');
const { author } = require('./package.json');

const ENVIRONMENT = (process.env.NODE_ENV || 'development').toLowerCase();
const IS_PRODUCTION = ENVIRONMENT === 'production';

const root = process.cwd();
const withRoot = (...fragments) => path.join(root, ...fragments);
const src = withRoot('src');
const dist = withRoot('dist', ENVIRONMENT);
// eslint-disable-next-line import/no-dynamic-require
const { name, version } = require(path.join(root, 'package.json'));

const nodeExternals = () => /^(?!@what-webook)[a-z0-9@-].+$/i;

const merge = (custom) =>
  webpackMerge(
    {
      target: 'node',
      mode: ENVIRONMENT,
      devtool: `${IS_PRODUCTION ? 'nosources-' : ''}source-map`,
      context: src,
      entry: {
        index: ['./index'],
      },
      output: {
        path: dist,
        filename: '[name].js',
        publicPath: '/',
      },
      plugins: [
        new webpack.BannerPlugin({
          raw: true,
          entryOnly: true,
          banner: `/*! ${name}@${version} - ${author} */\n`,
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(ENVIRONMENT),
          __WEBPACK_PACKAGE_NAME__: JSON.stringify(name),
          __WEBPACK_PACKAGE_VERSION__: JSON.stringify(version),
          __WEBPACK_IS_PRODUCTION__: JSON.stringify(IS_PRODUCTION),
          __WEBPACK_IS_DEVELOPMENT__: JSON.stringify(!IS_PRODUCTION),
        }),
      ],
      resolve: {
        extensions: ['.wasm', '.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.[tj]sx?$/,
            loader: 'ts-loader',
            exclude: [/node_modules/],
          },
        ],
      },
    },
    custom,
  );

module.exports = {
  merge,
  nodeExternals,
  withRoot,
  ENVIRONMENT,
};
