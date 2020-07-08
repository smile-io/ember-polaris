import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify, htmlSafe } from '@ember/string';
import { isPresent } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-progress-bar';
import deprecateClassArgument from '../utils/deprecate-class-argument';

const allowedSizes = ['small', 'medium', 'large'];
const defaultSize = 'medium';

/**
 * Polaris progress bar component.
 * See https://polaris.shopify.com/components/feedback-indicators/progress-bar
 *
 * @component polaris-progress-bar
 */
@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisProgressBar extends Component {
  /**
   * The progression of certain tasks
   *
   * @public
   * @type {Number}
   * @default 0
   */
  progress = 0;

  /**
   * Size of progressbar
   *
   * @public
   * @type {String}
   * @default 'medium'
   */
  size = defaultSize;

  @(computed('size').readOnly())
  get sizeClass() {
    let { size } = this;
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-ProgressBar--size${classify(size)}`;
  }

  @(computed('progress').readOnly())
  get parsedProgress() {
    let { progress } = this;
    let parsedProgress;

    if (typeof progress !== 'number') {
      return null;
    }

    if (progress < 0) {
      parsedProgress = 0;
    } else if (progress > 100) {
      parsedProgress = 100;
    } else {
      parsedProgress = progress;
    }

    return parsedProgress;
  }

  @(computed('parsedProgress').readOnly())
  get progressStyle() {
    let { parsedProgress } = this;
    if (isPresent(parsedProgress)) {
      return htmlSafe(`width: ${parsedProgress}%;`);
    }

    return null;
  }
}
