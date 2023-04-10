module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['import', 'unused-imports'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
