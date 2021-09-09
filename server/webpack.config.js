/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-undef */
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { merge } = require('../webpack.base');

module.exports = (() => {
  const root = path.join(__dirname);
  const wMerge = merge({
    context: root,
    output: {
      libraryTarget: 'commonjs',
      path: path.join(root, 'dist'),
    },
    externals: [nodeExternals()],
  });
  wMerge.entry = ['./src/main.ts'];
  wMerge.module = {
    rules: [
      {
        test: /\.[tj]sx?$/,
        loader: 'ts-loader',
        exclude: [
          [
            /node_modules/,
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'dist'),
            path.resolve(__dirname, 'test'),
          ],
        ],
        options: {
          configFile: 'tsconfig.build.json',
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  };
  console.log(wMerge);
  return wMerge;
})();
