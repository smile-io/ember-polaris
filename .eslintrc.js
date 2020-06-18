/* eslint-env node */
'use strict';

module.exports = {
  plugins: ['smile-ember'],
  extends: ['plugin:smile-ember/addon'],
  rules: {
    // Temporary while upgrading to Ember Octane
    'ember/no-get': 'off',
    'ember/no-mixins': 'off',
    // These are a lil broken right now (eslint-plugin-ember also disabled these)
    'smile-ember/order-in-components': 'off',
  },
};
