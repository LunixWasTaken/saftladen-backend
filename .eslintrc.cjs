module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    "quotes": [0, "double"],
    "max-len": [0, 200],
    "require-jsdoc": [0, false],
  },
};
