'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },
    autoImport: {
      watchDependencies: ['@smile-io/ember-polaris'],
    },
  });

  return app.toTree();

  // NOTE: Not using Embroider right now because DX is not great. If any file is
  // changed in the addon, the test-app needs to be rebuilt manually, so using
  // classic ember-cli build with ember-auto-import for now.
  // const { Webpack } = require('@embroider/webpack');

  // return require('@embroider/compat').compatBuild(app, Webpack, {
  //   extraPublicTrees: [],
  //   staticAddonTrees: true,
  //   staticAddonTestSupportTrees: true,
  //   staticHelpers: true,
  //   staticModifiers: true,
  //   staticComponents: true,
  //   staticEmberSource: true,
  //   packagerOptions: {
  //     webpackConfig: {
  //       devtool: 'source-map',
  //     },
  //   },
  // });
};
