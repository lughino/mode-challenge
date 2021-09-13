module.exports = {
  '**/*.(js|jsx|ts|tsx)': ['prettier --write', 'eslint --fix'],
  'server/**/*.(ts|tsx)': ['yarn workspace server run test --findRelatedTests'],
  'client/**/*.(ts|tsx)': ['yarn workspace client run test --findRelatedTests'],
  '**/*.(md|mdx|yml|yaml)': ['prettier --write'],
};
