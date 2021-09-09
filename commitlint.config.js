const scopes = ['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'revert', 'ci'];

const rules = {
  'type-enum': [2, 'always', scopes],
  'type-case': [2, 'always', ['lower-case']],
  'subject-case': [2, 'always', ['lower-case']],
  'body-leading-blank': [2, 'always'],
  'footer-leading-blank': [2, 'always'],
};

module.exports = {
  rules,
};
