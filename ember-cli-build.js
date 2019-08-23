'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
// NOTE: We should be using `sass` instead of `node-sass` which is the default/recommended
// by `ember-cli-sass` and it's the Dart implementation and should be much faster.
// We're using this because Polaris uses multi-line which is not supported
// ex: @shopify/polaris/styles/foundation/colors.scss#57
const nodeSass = require('node-sass');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    'ember-cli-babel': {
      includePolyfill: true,
    },

    sassOptions: {
      implementation: nodeSass,
    },
  });

  /**
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import('node_modules/ember-source/dist/ember-template-compiler.js');

  return app.toTree();
};
