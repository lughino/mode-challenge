const env = {
  node: false,
  browser: true,
};

const parserOptions = {
  // eslint-disable-next-line no-undef
  tsconfigRootDir: __dirname,
  project: ['./tsconfig.json'],
};

const rules = {
  'no-useless-constructor': 0,
};

// eslint-disable-next-line no-undef
module.exports = {
  env,
  parserOptions,
  rules,
};
