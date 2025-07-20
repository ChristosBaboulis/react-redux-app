module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // .eslintrc.js
  rules: {
    'react/prop-types': 'off'
  }
};
