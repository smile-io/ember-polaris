import Component from '@ember/component';
import { computed } from '@ember/object';
import { capitalize } from '@ember/string';

const allowedSizes = ['small', 'medium', 'large'];

export default Component.extend({
  classNames: ['Polaris-SkeletonThumbnail'],
  classNameBindings: ['sizeClass'],

  /**
   * Size of the thumbnail
   *
   * @property size
   * @type {String}
   * @default 'medium'
   * @public
   */
  size: 'medium',

  /**
   * Class to apply the thumbnail size.
   *
   * @property sizeClass
   * @type {String}
   * @private
   */
  sizeClass: computed('size', function() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = 'medium';
    }

    return `Polaris-SkeletonThumbnail--size${capitalize(size)}`;
  }).readOnly(),
});
