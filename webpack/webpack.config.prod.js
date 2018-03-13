const webpack = require('webpack');

/**
 * This is a prod config to be merged with the Client config
 */
module.exports = {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      // do not use an object for 'process.env' otherwise all other environment
      // variables are set to 'undefined' see issue #291
      'process.env.PORT': JSON.stringify('8000'),
      'process.env.BASE_URL': JSON.stringify('https://preview.angular-templates.io')
    })
  ]
};
