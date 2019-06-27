/* eslint-env node */
'use strict';

module.exports = {
  plugins: ['./node_modules/@smile-io/ember-styleguide/.template-lintrc'],
  extends: ['@smile-io/ember-styleguide:recommended'],
  rules: {
    'attribute-indentation': false,
    'no-inline-styles': false,
  },
};
