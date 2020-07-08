import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-skeleton-display-text';
import deprecateClassArgument from '../utils/deprecate-class-argument';

const defaultSize = 'medium';
const allowedSizes = ['small', defaultSize, 'large', 'extraLarge'];

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisSkeletonDisplayText extends Component {
  /**
   * Size of the text
   *
   * @type {String}
   * @default 'medium'
   * @public
   */
  size = defaultSize;

  /**
   * Class name to set the display text size.
   *
   * @type {String}
   */
  @computed('size')
  get sizeClass() {
    let { size } = this;
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-SkeletonDisplayText--size${classify(size)}`;
  }
}
