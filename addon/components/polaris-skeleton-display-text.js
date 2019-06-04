import { className, classNames } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';
import { classify } from '@ember/string';

const allowedSizes = ['small', 'medium', 'large', 'extraLarge'];
const defaultSize = 'medium';

@classNames('Polaris-SkeletonDisplayText__DisplayText')
export default class PolarisSkeletonDisplayText extends Component {
  /**
   * Size of the text
   *
   * @property size
   * @public
   * @type {String}
   * @default 'medium'
   */
  size = defaultSize;

  /**
   * Class name to set the display text size.
   *
   * @property sizeClass
   * @private
   * @type {String}
   */
  @(computed('size').readOnly())
  @className
  get sizeClass() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-SkeletonDisplayText--size${classify(size)}`;
  }
}
