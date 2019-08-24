import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { className, classNames } from '@ember-decorators/component';

const allowedSizes = ['small', 'medium', 'large', 'extraLarge'];
const defaultSize = 'medium';

@classNames('Polaris-SkeletonDisplayText__DisplayText')
export default class PolarisSkeletonDisplayTextComponent extends Component {
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
  @className
  get sizeClass() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-SkeletonDisplayText--size${classify(size)}`;
  }
}
