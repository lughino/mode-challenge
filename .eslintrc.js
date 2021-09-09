const overrides = require('./.eslintrc.overrides');

const root = true;

module.exports = {
  extends: ['airbnb-base', 'prettier'],
  overrides,
  root,
};
