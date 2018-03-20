import Component from '@ember/component';
import { classify } from '@ember/string';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-thumbnail';

const SIZES = ['small', 'medium', 'large'];
const DEFAULT_SIZE = 'medium';

/**
 * Polaris thumbnail component.
 * See https://polaris.shopify.com/components/images-and-icons/thumbnail
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Thumbnail'],
  classNameBindings: ['sizeClass'],

  layout,

  /**
   * Size of thumbnail
   *
   * @public
   * @property size
   * @type {String}
   * @default: 'medium'
   */
  size: DEFAULT_SIZE,

  /**
   * URL for the image
   *
   * @public
   * @property source
   * @type {String}
   * @default: null
   */
  source: null,

  /**
   * Alt text for the thumbnail image
   *
   * @public
   * @property alt
   * @type {String}
   * @default: null
   */
  alt: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (SIZES.indexOf(this.get('size')) === -1) {
      this.set('size', DEFAULT_SIZE);
      Ember.assert('Invalid `size` attribute. Please use `small`, `medium`, or `large`');
    }
  },

  /*
   * Internal properties.
   */
  sizeClass: computed('size', function() {
    let size = this.get('size') || 'medium';

    return `Polaris-Thumbnail--size${ classify(size) }`;
  }).readOnly()
});
