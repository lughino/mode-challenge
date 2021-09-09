const env = {
  node: true,
  browser: false,
};

const parserOptions = {
  // eslint-disable-next-line no-undef
  tsconfigRootDir: __dirname,
  project: ['./tsconfig.json'],
};

const rules = {
  'no-useless-constructor': 0,
};

module.exports = {
  env,
  parserOptions,
  rules,
};
