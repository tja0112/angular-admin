const webpack = require('webpack');
const { root } = require('./helpers');

module.exports = {
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      // do not use an object for 'process.env' otherwise all other environment
      // variables are set to 'undefined' see issue #291
      'process.env.PORT': JSON.stringify('3001'),
      'process.env.BASE_URL': JSON.stringify('http://localhost:3001')
    })
  ]
};
