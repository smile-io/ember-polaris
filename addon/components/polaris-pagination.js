import Ember from 'ember';
import layout from '../templates/components/polaris-pagination';

const {
  Component,
  computed,
} = Ember;

const {
  not,
} = computed;

export default Component.extend({
  layout,
  tagName: 'span',

  classNames: ['Polaris-Pagination'],
  classNameBindings: ['plain:Polaris-Pagination--plain'],

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
   * @propety nextUrl
   * @type {String}
   * @default null
   * TODO not implemented
   */
  nextUrl: null,

  /**
   * The URL of the previous page
   *
   * @propety previousUrl
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
});
