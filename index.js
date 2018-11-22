'use strict';

const path = require('path');
const resolve = require('resolve');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  options: {
    svgJar: {
      sourceDirs: [
        'public',
        'tests/dummy/public/assets/images/svg',
        'node_modules/@smile-io/ember-polaris/public',
      ],
    },
  },

  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  },

  treeForStyles(tree) {
    let packageRoot = path.dirname(
      resolve.sync('@shopify/polaris/package.json', { basedir: __dirname })
    );
    let polarisScssFiles = new Funnel(packageRoot, {
      include: ['styles.scss', 'styles/**/*'],
      srcDir: './',
      destDir: 'ember-polaris',
      annotation: 'PolarisScssFunnel',
    });

    return this._super.treeForStyles(
      new MergeTrees([polarisScssFiles, tree], { overwrite: true })
    );
  },

  isDevelopingAddon() {
    return process.env.SMILE_DEV;
  },
};
