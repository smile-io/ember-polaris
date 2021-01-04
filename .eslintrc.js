/* eslint-env node */
'use strict';

module.exports = {
  plugins: ['smile-ember'],
  extends: ['plugin:smile-ember/addon'],
  rules: {
    // Temporary while upgrading to Ember Octane & Glimmer components
    'ember/no-get': 'off',
    'ember/no-mixins': 'off',
    'ember/no-classic-components': 'off',
    'ember/no-classic-classes': 'off',
    'ember/classic-decorator-hooks': 'off',
    'ember/classic-decorator-no-classic-methods': 'off',
    'ember/require-tagless-components': 'off',
    'ember/no-computed-properties-in-native-classes': 'off',
    'ember/no-component-lifecycle-hooks': 'off',
    // These are a lil broken right now (eslint-plugin-ember also disabled these)
    'smile-ember/order-in-components': 'off',
  },
};
