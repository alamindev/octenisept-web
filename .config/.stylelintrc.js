module.exports = {
  extends: 'stylelint-config-recommended',
  ignoreFiles: [
    /**
     * ignore certain files
     * docs: https://stylelint.io/user-guide/configure#ignorefiles
     */
    // 'my-file.css',
    // '**/my-directory/*.css'
  ],
  rules: {
    /**
     * add custom rules
     * docs: https://stylelint.io/user-guide/rules/list
     */
    // 'indentation': 4
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer'
        ]
      }
    ],
    'no-descending-specificity': null
  }
}
