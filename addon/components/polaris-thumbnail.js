import Component from '@ember/component';
import { classify } from '@ember/string';
import { computed } from '@ember/object';
import { warn } from '@ember/debug';
import layout from '../templates/components/polaris-thumbnail';

const allowedSizes = [
  'small',
  'medium',
  'large'
];
const defaultSize = 'medium';

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
  size: defaultSize,

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

  /*
   * Internal properties.
   */
  sizeClass: computed('size', function() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
      warn(`Unsupported 'size' attribute for 'polaris-thumbnail'. Supported values: ${ allowedSizes.join(' ') }.`);
    }

    return `Polaris-Thumbnail--size${ classify(size) }`;
  }).readOnly()
});
