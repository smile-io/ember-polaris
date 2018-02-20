import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';

const allowedSizes = [
  'small',
  'medium',
  'large',
  'extraLarge'
];
const defaultSize = 'medium';

export default Component.extend({
  classNames: ['Polaris-SkeletonDisplayText__DisplayText'],
  classNameBindings: ['sizeClass'],

  /**
   * Size of the text
   *
   * @property size
   * @public
   * @type {String}
   * @default 'medium'
   */
  size: defaultSize,

  /**
   * Class name to set the display text size.
   *
   * @property sizeClass
   * @private
   * @type {String}
   */
  sizeClass: computed('size', function() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-SkeletonDisplayText--size${ classify(size) }`;
  }).readOnly(),
});
