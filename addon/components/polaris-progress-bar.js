import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify, htmlSafe } from '@ember/string';
import layout from '../templates/components/polaris-progress-bar';

/**
 * Polaris progress bar component.
 * See https://polaris.shopify.com/components/feedback-indicators/progress-bar
 */
export default Component.extend({
  classNames: ['Polaris-ProgressBar'],
  classNameBindings: ['sizeClass'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The progression of certain tasks
   *
   * @property progress
   * @type {number}
   * @default: null
   */
  progress: null,

  /**
   * Size of progressbar
   *
   * @property size
   * @type {string}
   * @default: null
   */
  size: null,

  /*
   * Internal properties.
   */
  sizeClass: computed('size', function() {
    let size = this.get('size') || 'medium';

    return `Polaris-ProgressBar--size${ classify(size) }`;
  }).readOnly(),

  progressStyle: computed('progress', function() {
    const progress = this.get('progress') || 0;

    return htmlSafe(`width: ${ progress }%;`);
  }).readOnly()
});
