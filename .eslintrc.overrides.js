const filenames = {
  files: ['*.*'],
  plugins: ['unicorn'],
  rules: {
    'unicorn/filename-case': [
      2,
      {
        case: 'kebabCase',
      },
    ],
  },
};

const react = {
  files: ['*.jsx', '*.tsx'],
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/boolean-prop-naming': 2,
    'react/jsx-boolean-value': 2,
    'react/jsx-handler-names': 2,
    'react/jsx-no-useless-fragment': 2,
  },
};

const typescript = {
  files: ['*.ts', '*.tsx'],
  parser: '@typescript-eslint/parser',
  plugins: [],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  extends: [
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  rules: {
    'no-use-before-define': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};

const imports = {
  files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  rules: {
    'import/no-extraneous-dependencies': [2, {}],
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'no-restricted-imports': [
      2,
      {
        name: 'uuid',
        message: 'Importing directly from `uuid` is now deprecated. Please import from `uuid/[version]` instead.',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};

const jest = {
  files: ['*.test.ts', '*.test.tsx', '*.test.js', '*.test.jsx'],
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-dom/recommended',
    // 'plugin:testing-library/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    'jest/lowercase-name': [1, { ignore: ['describe'] }],
    'jest/expect-expect': [
      1,
      {
        assertFunctionNames: ['expect', 'expectObservable'],
      },
    ],
  },
};

module.exports = [react, filenames, typescript, imports, jest];
