const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss')(
      path.resolve(__dirname, '../src/tailwind.config.js')
    ),
    isProduction && require('autoprefixer'),
    isProduction &&
      require('postcss-prefix-selector')({
        prefix: '#webspecial',
        exclude: []
      })
  ]
}
