const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: '/(node_modules)/',
        loader: 'babel-loader'
      },
      {
        test: /\.js?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, './release'),
    open: true,
    port: 3000
  }
}
