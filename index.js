'use strict';

const path = require('path');
const resolve = require('resolve');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: '@smile-io/ember-polaris',

  isDevelopingAddon() {
    return process.env.SMILE_DEV;
  },

  treeForStyles(tree) {
    let packageRoot = path.dirname(resolve.sync('@shopify/polaris/package.json', { basedir: __dirname }));
    let polarisScssFiles = new Funnel(packageRoot, {
      include: ['styles.scss', 'styles/**/*'],
      srcDir: './',
      destDir: 'ember-polaris',
      annotation: 'PolarisScssFunnel'
    });

    return this._super.treeForStyles(new MergeTrees([polarisScssFiles, tree], { overwrite: true }));
  },

  options: {
    svgJar: {
      sourceDirs: [
        'public',
        'tests/dummy/public/assets/images/svg',
        'node_modules/@smile-io/ember-polaris/public',
      ]
    }
  }
};
