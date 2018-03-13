const { root } = require('./helpers');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: root('dist'),
  },
  module: {
    rules: [
      { test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, use: '@ngtools/webpack' },
      { test: /\.(scss|sass)$/, use: ['raw-loader', 'sass-loader?sourceMap'] },
      { test: /\.css$/, use: 'raw-loader' },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(jpe?g|gif|png|svg|ico)$/, use: 'file-loader' },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: root('src/assets'),
        to: 'assets',
      },
      {
        from: root('node_modules/font-awesome/fonts'),
        to: 'assets/fonts',
      },
    ]),
  ],
};
