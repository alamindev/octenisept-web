const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    // fix for github code spaces - properly live reload twig files
    watchFiles: {
      paths: [path.resolve(__dirname, '../../src/twig/**/*')],
      options: {
        usePolling: false
      }
    },
    allowedHosts: ['.githubpreview.dev'],
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    },
    hot: false,
    static: path.resolve(__dirname, '../../assets'),
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/.*$/,
          to: (context) => `${context.parsedUrl.pathname}.html`
        }
      ]
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: require(path.resolve(
                __dirname,
                '../postcss.config.js'
              ))
            }
          }
        ]
      }
    ]
  }
})
