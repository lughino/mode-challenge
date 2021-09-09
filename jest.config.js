const { merge } = require('webpack-merge');
const typescript = require('ts-jest/presets').defaults;

const transform = merge({}, typescript.transform);

const globals = {
  __WEBPACK_PACKAGE_NAME__: '__WEBPACK_PACKAGE_NAME__',
  __WEBPACK_PACKAGE_VERSION__: '__WEBPACK_PACKAGE_VERSION__',
  __WEBPACK_IS_PRODUCTION__: false,
  __WEBPACK_IS_DEVELOPMENT__: true,
};

module.exports = {
  coverageReporters: ['html', ['lcov', { projectRoot: '../../' }]],
  coverageDirectory: '<rootDir>/reports/jest-coverage',
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  rootDir: process.cwd(),
  transform,
  globals,
};
