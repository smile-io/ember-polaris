'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // This only affects the dummy app, not a real host app.
    // The latter will need to duplicate these options
    // in their `ember-cli-build.js` for icons to work.
    svgJar: {
      strategy: 'inline',
      sourceDirs: [
        'tests/dummy/public/assets/images/svg'
      ],
      stripPath: false
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
