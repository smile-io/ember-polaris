import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify, htmlSafe } from '@ember/string';
import layout from '../templates/components/polaris-progress-bar';

const allowedSizes = [
  'small',
  'medium',
  'large'
];
const defaultSize = 'medium';

/**
 * Polaris progress bar component.
 * See https://polaris.shopify.com/components/feedback-indicators/progress-bar
 */
export default Component.extend({
  classNames: ['Polaris-ProgressBar'],
  classNameBindings: ['sizeClass'],

  layout,

  /**
   * The progression of certain tasks
   *
   * @public
   * @property progress
   * @type {Number}
   * @default: 0
   */
  progress: 0,

  /**
   * Size of progressbar
   *
   * @public
   * @property size
   * @type {String}
   * @default: 'medium'
   */
  size: defaultSize,

  /*
   * Internal properties.
   */
  sizeClass: computed('size', function() {
    let size = this.get('size');
    if (allowedSizes.indexOf(size) === -1) {
      size = defaultSize;
    }

    return `Polaris-ProgressBar--size${ classify(size) }`;
  }).readOnly(),

  parsedProgress: computed('progress', function() {
    let progress = this.get('progress');
    let parsedProgress;

    if (progress < 0) {
      parsedProgress = 0;
    } else if (progress > 100) {
      parsedProgress = 100;
    } else {
      parsedProgress = progress;
    }

    return parsedProgress;
  }).readOnly(),

  progressStyle: computed('parsedProgress', function() {
    return htmlSafe(`width: ${ this.get('parsedProgress') }%;`);
  }).readOnly()
});
