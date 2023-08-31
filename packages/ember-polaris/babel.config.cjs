'use strict';

module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    // Can't be used yet, because the content-tag implementation
    // totally ruins the ability to reference things in the template.
    // "@babel/plugin-transform-class-static-block",
    // ["babel-plugin-ember-template-compilation", {
    //   "targetFormat": "hbs",
    //   "transforms": []
    // }],
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
    'ember-template-imports/src/babel-plugin',
    '@embroider/addon-dev/template-colocation-plugin',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-private-methods',
  ],
};
