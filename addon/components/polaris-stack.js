import Ember from 'ember';
import layout from '../templates/components/polaris-stack';

const {
  Component,
  computed,
  isBlank,
  String: EmberString,
} = Ember;

const {
  classify,
} = EmberString;

/**
 * Polaris stack component.
 * See https://polaris.shopify.com/components/structure/stack
 */
 export default Component.extend({
  classNames: ['Polaris-Stack'],
  classNameBindings: [
    'vertical:Polaris-Stack--vertical',
    'spacingClassName',
    'alignmentClassName',
    'distributionClassName',
  ],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Elements to display inside stack
   *
   * @property text
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * Stack the elements vertically
   *
   * @property vertical
   * @type {boolean}
   * @default false
   */
  vertical: false,

  /**
   * Adjust spacing between elements
   *
   * @property spacing
   * @type {enum}
   * @default none
   */
  spacing: 'none',

  /**
   * Adjust alignment of elements
   *
   * @property alignment
   * @type {enum}
   * @default null
   */
  alignment: null,

  /**
   * Adjust distribution of elements
   *
   * @property distribution
   * @type {enum}
   * @default baseline
   */
  distribution: 'baseline',

  /*
   * Internal properties.
   */
  spacingClassName: computed('spacing', function() {
    const spacing = this.get('spacing');
    if (isBlank(spacing) || spacing === 'none') {
      return null;
    }

    return `Polaris-Stack--spacing${classify(spacing)}`;
  }).readOnly(),

  alignmentClassName: computed('alignment', function() {
    const alignment = this.get('alignment');
    if (isBlank(alignment)) {
      return null;
    }

    return `Polaris-Stack--alignment${classify(alignment)}`;
  }).readOnly(),

  distributionClassName: computed('distribution', function() {
    const distribution = this.get('distribution');
    if (isBlank(distribution) || distribution === 'baseline') {
      return null;
    }

    return `Polaris-Stack--distribution${classify(distribution)}`;
  }).readOnly(),

  /**
   * Lifecycle hooks.
   */
  didInsertElement() {
    this._super(...arguments);

    // Wrap each child element that isn't already a stack item.
    this.$().children()
      .not('div.Polaris-Stack__Item')
      .wrap('<div class="Polaris-Stack__Item"></div>');
  },
});
