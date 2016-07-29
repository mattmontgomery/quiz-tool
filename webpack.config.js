var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './lib/index.js',
  output: {
      path: './dist',
      filename: 'index.js'
  },
  module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'lib/index.ejs'
    })
  ]
}
