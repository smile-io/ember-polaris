import Ember from 'ember';

const {
  Component,
} = Ember;

// Mock polaris-icon component for testing, to avoid rendering SVGs.
export default Component.extend({
  tagName: 'span',
  classNames: 'Polaris-Icon',

  // Bind attributes to the element's dataset for testing.
  attributeBindings: [
    'source:data-icon-source',
  ],

  source: null,
});
