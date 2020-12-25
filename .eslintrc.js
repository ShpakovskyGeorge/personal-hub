/* eslint-disable */
const { resolve } = require('path');

const webpackConfigPath = './webpack.config.js';

module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:react-hooks/recommended'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'camelcase': "off"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    __DEV__: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: resolve(__dirname, webpackConfigPath)
      }
    }
  },
  plugins: ['react', 'prettier', 'react-hooks']
};
