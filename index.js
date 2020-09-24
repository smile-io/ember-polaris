'use strict';

const path = require('path');
const resolve = require('resolve');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const BroccoliDebug = require('broccoli-debug');

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

  init() {
    this._super.init.apply(this, arguments);

    this.debugTree = BroccoliDebug.buildDebugCallback(
      `ember-polaris:${this.name}`
    );
  },

  included(/* app */) {
    this._super.included.apply(this, arguments);

    let vendorPath = path.join('vendor', 'ember-polaris');
    this.import(path.join(vendorPath, 'styles.css'));
  },

  treeForStyles(tree) {
    tree = this.debugTree(tree, 'treeForStyles:input');
    let trees = [tree];

    let packageRoot = path.dirname(
      resolve.sync('@shopify/polaris/package.json', {
        basedir: this.app.project.root,
      })
    );
    let stylesPath = path.join.apply(path, [packageRoot, 'dist', 'styles']);
    let polarisStylesTree = new Funnel(stylesPath, {
      include: [
        '_public-api.scss',
        'foundation/**.scss',
        'shared/**.scss',
        'polaris-tokens/**.scss',
      ],
      destDir: 'ember-polaris',
      annotation: 'PolarisTreeForStylesFunnel',
    });
    polarisStylesTree = this.debugTree(
      polarisStylesTree,
      'treeForStyles:polarisStylesTree'
    );
    trees.push(polarisStylesTree);

    let stylesTree = new MergeTrees(trees, { overwrite: true });
    stylesTree = this.debugTree(stylesTree, 'treeForStyles:output');

    return stylesTree;
  },

  treeForVendor(tree) {
    tree = this.debugTree(tree, 'treeForVendor:input');
    let trees = [tree];

    let packageRoot = path.dirname(
      resolve.sync('@shopify/polaris/package.json', {
        basedir: this.app.project.root,
      })
    );
    let stylesPath = path.join.apply(path, [packageRoot, 'dist']);
    trees.push(
      new Funnel(stylesPath, {
        include: ['styles.css'],
        destDir: 'ember-polaris',
        annotation: 'PolarisTreeForVendorFunnel',
      })
    );

    let vendorTree = new MergeTrees(trees, { overwrite: true });
    vendorTree = this.debugTree(vendorTree, 'treeForVendor:output');

    return vendorTree;
  },

  isDevelopingAddon() {
    return process.env.SMILE_DEV;
  },
};
