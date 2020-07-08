import Component from '@ember/component';
import { computed } from '@ember/object';
import { capitalize } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-skeleton-thumbnail';
import deprecateClassArgument from '../utils/deprecate-class-argument';

const defaultSize = 'medium';
const allowedSizes = ['small', defaultSize, 'large'];

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisSkeletonThumbnail extends Component {
  /**
   * Size of the thumbnail
   *
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = defaultSize;

  /**
   * Class to apply the thumbnail size.
   *
   * @type {String}
   */
  @computed('size')
  get sizeClass() {
    let { size } = this;
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-SkeletonThumbnail--size${capitalize(size)}`;
  }
}
