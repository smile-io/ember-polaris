import Component from '@ember/component';
import { not } from '@ember/object/computed';
import { handleMouseUpByBlurring } from '../utils/focus';
import layout from '../templates/components/polaris-pagination';

export default Component.extend({
  tagName: 'nav',
  classNames: ['Polaris-Pagination'],
  classNameBindings: ['plain:Polaris-Pagination--plain'],
  attributeBindings: ['accessibilityLabel:aria-label'],

  layout,

  /**
   * A more subdued control for use in headers
   *
   * @property plain
   * @type {Boolean}
   * @default false
   */
  plain: false,

  /**
   * The URL of the next page
   *
   * @property nextUrl
   * @type {String}
   * @default null
   * TODO not implemented
   */
  nextUrl: null,

  /**
   * The URL of the previous page
   *
   * @property previousUrl
   * @type {String}
   * @default null
   * TODO not implemented
   */
  previousUrl: null,

  /**
   * Whether there is a next page to show
   *
   * @property hasNext
   * @type {Boolean}
   * @default false
   */
  hasNext: false,

  /**
   * Whether there is a previous page to show
   *
   * @property hasPrevious
   * @type {Boolean}
   * @default false
   */
  hasPrevious: false,

  /**
   * Visually hidden text for screen readers
   *
   * @property accessibilityLabel
   * @type {string}
   * @default 'Pagination'
   */
  accessibilityLabel: 'Pagination',

  /**
   * Callback when next button is clicked
   *
   * @property onNext
   * @type {function}
   * @default no-op
   */
  onNext() {},

  /**
   * Callback when previous button is clicked
   *
   * @property onPrevious
   * @type {function}
   * @default no-op
   */
  onPrevious() {},

  isPreviousDisabled: not('hasPrevious').readOnly(),
  isNextDisabled: not('hasNext').readOnly(),

  handleMouseUpByBlurring,
});
