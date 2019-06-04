import { className, classNames, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
import { classify, htmlSafe } from '@ember/string';
import { isPresent } from '@ember/utils';
import layout from '../templates/components/polaris-progress-bar';

const allowedSizes = ['small', 'medium', 'large'];
const defaultSize = 'medium';

/**
 * Polaris progress bar component.
 * See https://polaris.shopify.com/components/feedback-indicators/progress-bar
 *
 * @component polaris-progress-bar
 */
@classNames('Polaris-ProgressBar')
@templateLayout(layout)
export default class PolarisProgressBar extends Component {
  /**
   * The progression of certain tasks
   *
   * @public
   * @property progress
   * @type {Number}
   * @default: 0
   */
  progress = 0;

  /**
   * Size of progressbar
   *
   * @public
   * @property size
   * @type {String}
   * @default: 'medium'
   */
  size = defaultSize;

  'data-test-progress-bar' = true;

  /**
   * @private
   */
  @(computed('size').readOnly())
  @className
  get sizeClass() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-ProgressBar--size${classify(size)}`;
  }

  /**
   * @private
   */
  @(computed('progress').readOnly())
  get parsedProgress() {
    let progress = this.get('progress');
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

  /**
   * @private
   */
  @(computed('parsedProgress').readOnly())
  get progressStyle() {
    let parsedProgress = this.get('parsedProgress');
    if (isPresent(parsedProgress)) {
      return htmlSafe(`width: ${parsedProgress}%;`);
    }

    return null;
  }
}
