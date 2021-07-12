'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  // NOTE removed eslint-plugin-smile-ember for now, it's hard to maintain between ember upgrades.
  // Will look to just have a plugin with our rules instead of Ember's too
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    // Temporary while upgrading to Ember Octane & Glimmer components
    'ember/no-jquery': 'off',
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
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
