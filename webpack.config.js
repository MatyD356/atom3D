const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: '/src/App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 3000,
    compress: true,
    hotOnly: true
  }
}