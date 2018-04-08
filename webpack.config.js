const webpack = require('webpack');
const path = require('path');

const packageInfo = require('./package.json');
const libraryName = packageInfo.library || packageInfo.name;
const version = packageInfo.version;
const minify = process.env.NODE_ENV === 'production';
const fileExtension = minify ? '.min.js' : '.js';
const outputFile = `${libraryName}-${version}${fileExtension}`;

const config = {
  entry: __dirname + '/src/core.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  externals: {
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      root: '$',
    },
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: minify
    ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
    ]
    : [],
};

module.exports = config;
