import Component from '@ember/component';
import { computed } from '@ember/object';
import { capitalize } from '@ember/string';
import { className, classNames } from '@ember-decorators/component';

const allowedSizes = ['small', 'medium', 'large'];

@classNames('Polaris-SkeletonThumbnail')
export default class PolarisSkeletonThumbnailComponent extends Component {
  /**
   * Size of the thumbnail
   *
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = 'medium';

  /**
   * Class to apply the thumbnail size.
   *
   * @type {String}
   */
  @computed('size')
  @className
  get sizeClass() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = 'medium';
    }

    return `Polaris-SkeletonThumbnail--size${capitalize(size)}`;
  }
}
