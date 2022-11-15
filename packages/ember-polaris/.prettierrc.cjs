'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  singleQuote: true,
  overrides: [
    {
      files: ['**/*.hbs'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['**/*.gjs', '**/*.gts'],
      plugins: ['prettier-plugin-ember-template-tag'],
    },
  ],
};
