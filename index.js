/* eslint-env node */
'use strict';

var fs = require('fs');
var path = require('path');

var path_join = function() {
  // fix path with windows back slash with path_join
  return path.join.apply(this, arguments).replace(/\\/g, '/');
};

module.exports = {
  name: 'ember-polaris',

  included: function included(app) {
    this._super.included.apply(this, arguments);

    var modulePath      = path.relative(app.project.root, __dirname);
    var shopifySassPath = 'vendor/@shopify';

    // Non-destructively add paths to SASS.
    app.options.sassOptions = app.options.sassOptions || {};
    app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];

    app.options.sassOptions.includePaths.push(path_join(modulePath, shopifySassPath));
  }
};
