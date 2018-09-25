/* eslint-env node */
'use strict';

const OFF = false;

module.exports = {
  plugins: ['./node_modules/@smile-io/ember-styleguide/.template-lintrc'],
  extends: ['@smile-io/ember-styleguide:recommended'],
  rules: {
    'attribute-indentation': OFF,
    'no-inline-styles': OFF,
  },
};
