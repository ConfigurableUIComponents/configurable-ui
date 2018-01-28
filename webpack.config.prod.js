const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {

  entry: [
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'configurable-ui.js',
    publicPath: '/',
    library: 'configurable-ui',
    libraryTarget: 'umd',
  },
  externals: ['react-dom', 'react'],

});
