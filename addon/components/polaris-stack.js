import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-stack';

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
    'noWrap:Polaris-Stack--noWrap',
  ],

  layout,

  /**
   * Elements to display inside stack
   *
   * @property text
   * @public
   * @type {string}
   * @default null
   */
  text: null,

  /**
   * Stack the elements vertically
   *
   * @property vertical
   * @public
   * @type {boolean}
   * @default false
   */
  vertical: false,

  /**
   * Adjust spacing between elements
   *
   * @property spacing
   * @public
   * @type {enum}
   * @default null
   */
  spacing: null,

  /**
   * Adjust alignment of elements
   *
   * @property alignment
   * @public
   * @type {enum}
   * @default null
   */
  alignment: null,

  /**
   * Adjust distribution of elements
   *
   * @property distribution
   * @public
   * @type {enum}
   * @default baseline
   */
  distribution: 'baseline',

  /**
   * Wrap stack elements to additional rows as needed on small screens (Defaults to true)
   *
   * @property wrap
   * @public
   * @type {boolean}
   * @default true
   */
  wrap: true,

  /*
  * Internal properties.
  */
  noWrap: equal('wrap', false).readOnly(),

  spacingClassName: computed('spacing', function() {
    const spacing = this.get('spacing');
    if (isBlank(spacing)) {
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
  didRender() {
    this._super(...arguments);

    // Wrap each child element that isn't already a stack item.
    this.$()
      .children()
      .not('div.Polaris-Stack__Item')
      .wrap('<div class="Polaris-Stack__Item"></div>');
  },
});
