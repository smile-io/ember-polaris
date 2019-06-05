import { className, classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { capitalize } from '@ember/string';

const allowedSizes = ['small', 'medium', 'large'];

@classNames('Polaris-SkeletonThumbnail')
export default class PolarisSkeletonThumbnail extends Component {
  /**
   * Size of the thumbnail
   *
   * @property size
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = 'medium';

  /**
   * Class to apply the thumbnail size.
   *
   * @property sizeClass
   * @type {String}
   * @private
   */
  @(computed('size').readOnly())
  @className
  get sizeClass() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = 'medium';
    }

    return `Polaris-SkeletonThumbnail--size${capitalize(size)}`;
  }
}
