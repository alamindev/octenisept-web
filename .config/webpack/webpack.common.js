const path = require('path')
const ProgressPlugin = require('progress-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const yaml = require('js-yaml')
const requireContext = require('require-context')

// config
const config = require('../webspecial.config')
const assetPath = config.path

if (['development', 'preview'].includes(process.env.NODE_ENV)) {
  Object.keys(assetPath).forEach((key) => (assetPath[key] = `${key}/`))
}

module.exports = {
  stats: 'minimal',
  entry: path.resolve(__dirname, '../../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.twig$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                '@layouts': path.resolve(__dirname, '../../src/twig/layouts'),
                '@templates': path.resolve(
                  __dirname,
                  '../../src/twig/templates'
                ),
                '@components': path.resolve(
                  __dirname,
                  '../../src/twig/components'
                )
              },
              data: (context) => {
                let data = {
                  env: process.env.NODE_ENV,
                  development: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'preview',
                  production: process.env.NODE_ENV === 'production',
                  path: assetPath,
                  templates: null
                }

                // force webpack to watch folder
                context.addContextDependency(
                  path.resolve(__dirname, '../../src/twig/templates')
                )

                // get all templates
                data.templates = requireContext(
                  path.resolve(__dirname, '../../src/twig/templates'),
                  true,
                  /\.twig$/
                )
                  .keys()
                  .map((template) => template.replace('.twig', ''))

                // get all yml data
                requireContext(
                  path.resolve(__dirname, '../../src/data'),
                  true,
                  /\.ya?ml$/
                )
                  .keys()
                  .forEach((file) => {
                    // force webpack to watch files
                    context.addDependency(
                      path.resolve(__dirname, `../../src/data/${file}`)
                    )

                    const contents = context.fs.readFileSync(
                      path.resolve(__dirname, `../../src/data/${file}`)
                    )
                    data = { ...data, ...yaml.load(contents) }
                  })

                return data
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new ProgressPlugin(), new CleanWebpackPlugin()]
}
