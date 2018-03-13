const { root } = require('./helpers');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');

/**
 * This is a browser config which should be merged on top of common config
 */
module.exports = {
  output: {
    filename: 'browser.js',
  },
  target: 'web',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
    }),
    new HtmlWebpackPlugin({
      template: root('./src/index.html'),
      output: root('dist'),
      inject: 'head',
    }),
    new ScriptExtPlugin({
      defaultAttribute: 'defer',
    }),
  ]
};
