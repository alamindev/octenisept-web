const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es6: true
  },
  ignorePatterns: [
    /**
     * ignore certain files
     * docs: https://eslint.org/docs/user-guide/configuring#ignorepatterns-in-config-files
     */
    // 'my-file.js',
    // '**/my-directory/*.js'
  ],
  rules: {
    /**
     * add custom rules
     * docs: https://eslint.org/docs/rules
     */
    'no-unused-vars': isDevelopment ? 'off' : 'error'
    // 'indent': ['error', 4]
  }
}
