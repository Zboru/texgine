module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': "off",
    'func-names': "off",
    "no-plusplus": "off",
    "no-continue": "off",
    "no-param-reassign": "off",
    "prefer-destructuring": "off",
    "class-methods-use-this": "off",
  },
};
