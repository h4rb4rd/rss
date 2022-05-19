module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  globals: {
    window: true,
    document: true,
  },
  rules: {},
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
      ],
      rules: {
        indent: ['error', 2, { SwitchCase: 1 }],
        'linebreak-style': 'off',
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'always'],
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
