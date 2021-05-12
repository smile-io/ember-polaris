'use strict';

module.exports = {
  plugins: ['./node_modules/@smile-io/ember-styleguide/.template-lintrc'],
  extends: ['@smile-io/ember-styleguide:recommended'],
  rules: {
    'attribute-indentation': false,
    'no-inline-styles': false,
    'no-action': false,
    'no-implicit-this': false,
    'no-curly-component-invocation': false,
    'no-down-event-binding': false,
    'no-yield-only': false,
    'no-duplicate-id': false,
  },
};
