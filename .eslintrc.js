module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['react-app', 'airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
}
