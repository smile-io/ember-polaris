/* eslint-env node */
'use strict';

var path = require('path');
var resolve = require('resolve');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-polaris',

  treeForStyles(tree) {
    var packageRoot = path.dirname(resolve.sync('@shopify/polaris/package.json', { basedir: __dirname }));
    var polarisScssFiles = new Funnel(packageRoot, {
      include: ['styles.scss', 'styles/**/*'],
      srcDir: './',
      destDir: 'ember-polaris',
      annotation: 'PolarisScssFunnel'
    });

    return this._super.treeForStyles(mergeTrees([polarisScssFiles, tree], { overwrite: true }));
  },

  treeForPublic(tree) {
    var packageRoot = path.dirname(resolve.sync('@shopify/polaris/package.json', { basedir: __dirname }));
    var polarisSvgFiles = new Funnel(packageRoot, {
      include: ['*.svg'],
      srcDir: './src/icons/',
      destDir: 'ember-polaris/icons',
      annotation: 'PolarisSvgFunnel'
    });

    const trees = [polarisSvgFiles];

    // tree can be undefined, which breaks the build.
    return polarisSvgFiles;
    // if (tree) {
    //   trees.push(tree);
    // }
    // return this._super.treeForPublic(mergeTrees(trees, { overwrite: true }));
  },

  // TODO remove this once shipping to prod
  isDevelopingAddon() {
    return true;
  }
};
