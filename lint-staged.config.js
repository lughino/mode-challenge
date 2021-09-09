module.exports = {
  '**/*.(js|jsx|ts|tsx)': ['prettier --write', 'eslint --fix'],
  '**/*.(md|mdx|yml|yaml)': ['prettier --write'],
};
