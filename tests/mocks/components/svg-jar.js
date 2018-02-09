import Component from '@ember/component';

// Mock the svg-jar helper for testing, to avoid rendering SVGs.
const SvgJar = Component.extend({
  tagName: 'svg',

  // Bind attributes to the element's dataset for testing.
  attributeBindings: [
    'source:data-icon-source',
    'aria-label'
  ],

  source: null,
});

SvgJar.reopenClass({
  positionalParams: ['source'],
});

export default SvgJar;
