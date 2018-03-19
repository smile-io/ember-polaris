import Component from '@ember/component';
import { classify } from '@ember/string';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import layout from '../templates/components/polaris-thumbnail';

export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Thumbnail'],
  classNameBindings: ['sizeClass'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Size of thumbnail
   *
   * @property size
   * @type {string}
   * @default: null
   */
  size: null,

  /**
   * URL for the image
   *
   * @property source
   * @type {string}
   * @default: null
   */
  source: null,

  /**
   * Alt text for the thumbnail image
   *
   * @property alt
   * @type {string}
   * @default: null
   */
  alt: null,

  /*
   * Internal properties.
   */
  sizeClass: computed('size', function() {
    let size = this.get('size') || 'medium';

    return `Polaris-Thumbnail--size${ classify(size) }`;
  })
});
