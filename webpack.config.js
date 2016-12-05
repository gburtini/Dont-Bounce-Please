// webpack.config.js

var webpack = require('webpack');
var path = require('path');

var packageInfo = require("./package.json");

var libraryName = packageInfo.library || packageInfo.name;
var version = packageInfo.version;
var minify = process.env.NODE_ENV === 'production';

var outputFile = libraryName + '-' + version + (minify ? '.min' : '') + '.js';

var config = {
  node: {
    fs: "empty"
  },
  entry: __dirname + '/src/core.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  externals: {
    "jquery": {
        commonjs: "jquery",
        commonjs2: "jquery",
        amd: "jquery",
        root: "$"
    }
  },

  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: minify ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};

module.exports = config;
