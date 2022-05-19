module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'airbnb-base/legacy', 'plugin:prettier/recommended'],
  globals: {
    window: true,
    document: true,
  },
  rules: {
    'max-classes-per-file': ['error', { ignoreExpressions: true, max: 2 }],
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off,',
  },
};
