const { root } = require('./helpers');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  output: {
    filename: 'server.js',
  },
  target: 'node',
};
