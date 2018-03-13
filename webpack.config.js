const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonPartial = require('./webpack/webpack.config.common');
const browserPartial = require('./webpack/webpack.config.browser');
const serverPartial = require('./webpack/webpack.config.server');
const prodPartial = require('./webpack/webpack.config.prod');
const devPartial = require('./webpack/webpack.config.dev');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { root } = require('./webpack/helpers');

module.exports = function (options) {

  options = options || {};

  const env = options.prod ? 'production' : 'development';

  const entries = {
    jit: {
      no_universal: {
        browser: {
          entry: root('./src/main/jit/main.browser.ts'),
          tsconfig: root('./tsconfig/jit/tsconfig.jit.browser.json'),
        },
        server: {
          entry: root('./src/main/jit/main.server.ts'),
          tsconfig: root('./tsconfig/jit/tsconfig.jit.server.json'),
        },
      },
      universal: {
        browser: {
          entry: root('./src/main/jit.universal/main.browser.ts'),
          tsconfig: root('./tsconfig/jit.universal/tsconfig.jit.universal.browser.json'),
        },
        server: {
          entry: root('./src/main/jit.universal/main.server.ts'),
          tsconfig: root('./tsconfig/jit.universal/tsconfig.jit.universal.server.json'),
        },
      },
    },
    aot: {
      no_universal: {
        browser: {
          entry: root('./src/main/aot/main.browser.ts'),
          tsconfig: root('./tsconfig/aot/tsconfig.aot.browser.json'),
        },
        server: {
          entry: root('./src/main/aot/main.server.ts'),
          tsconfig: root('./tsconfig/aot/tsconfig.aot.server.json'),
        },
      },
      universal: {
        browser: {
          entry: root('./src/main/aot.universal/main.browser.ts'),
          tsconfig: root('./tsconfig/aot.universal/tsconfig.aot.universal.browser.json'),
        },
        server: {
          entry: root('./src/main/aot.universal/main.server.ts'),
          tsconfig: root('./tsconfig/aot.universal/tsconfig.aot.universal.server.json'),
        },
      },
    },
  };

  var entry = '';
  var tsconfig = '';

  var config = {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': { ENV: JSON.stringify(env) },
      }),
    ],
  };

  if (options.browser) {

    if (options.aot) {
      if (options.universal) {
        entry = entries.aot.universal.browser.entry;
        tsconfig = entries.aot.universal.browser.tsconfig;
      } else {
        entry = entries.aot.no_universal.browser.entry;
        tsconfig = entries.aot.no_universal.browser.tsconfig;
      }
    } else {
      if (options.universal) {
        entry = entries.jit.universal.browser.entry;
        tsconfig = entries.jit.universal.browser.tsconfig;
      } else {
        entry = entries.jit.no_universal.browser.entry;
        tsconfig = entries.jit.no_universal.browser.tsconfig;
      }
    }

    config = webpackMerge(config, commonPartial, browserPartial);

  } else if (options.server) {

    if (options.aot) {
      if (options.universal) {
        entry = entries.aot.universal.server.entry;
        tsconfig = entries.aot.universal.server.tsconfig;
      } else {
        entry = entries.aot.no_universal.server.entry;
        tsconfig = entries.aot.no_universal.server.tsconfig;
      }
    } else {
      if (options.universal) {
        entry = entries.jit.universal.server.entry;
        tsconfig = entries.jit.universal.server.tsconfig;
      } else {
        entry = entries.jit.no_universal.server.entry;
        tsconfig = entries.jit.no_universal.server.tsconfig;
      }
    }

    config = webpackMerge(config, commonPartial, serverPartial);

  } else {

    throw new Error('Error: no platform selected, use --env.(browser|server) to select one');

  }

  // Prod or Dev
  if (options.prod) {
    config = webpackMerge(config, prodPartial);
  } else {
    config = webpackMerge(config, devPartial);
  }

  config = webpackMerge(config, {
    entry: entry,
    plugins: [
      new AngularCompilerPlugin({
        tsConfigPath: tsconfig,
        // skipCodeGeneration: !options.aot,// Comment this out as it was part of the old AotPlugin. Removed in new AngularCompilerPlugin
      }),
    ],
  });

  return config;

};
