'use strict';

module.exports = {
  printWidth: 100,
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{js,ts,cjs,mjs}',
      options: {
        singleQuote: true,
        trailingComma: 'es5',
      },
    },
    {
      files: ['*.gjs', '*.gts'],
      options: {
        parser: 'ember-template-tag',
        singleQuote: true,
        templateSingleQuote: false,
        trailingComma: 'es5',
      },
    },
  ],
};
