'use strict';

module.exports = {
  ...require('@smile-io/ember-styleguide/.prettierrc'),
  overrides: [{ files: '*.hbs', options: { singleQuote: false } }],
};
