import Component from '@ember/component';
import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { and, not } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import layout from '../templates/components/polaris-pagination';
import { handleMouseUpByBlurring } from '../utils/focus';

export default Component.extend({
  tagName: 'nav',

  attributeBindings: ['accessibilityLabel:aria-label'],

  classNames: ['Polaris-Pagination'],

  classNameBindings: ['plain:Polaris-Pagination--plain'],

  layout,

  /**
   * A more subdued control for use in headers
   *
   * @property plain
   * @type {Boolean}
   * @default false
   * @public
   */
  plain: false,

  /**
   * The URL of the next page
   *
   * TODO not implemented
   * @property nextUrl
   * @type {String}
   * @default null
   * @public
   */
  nextUrl: null,

  /**
   * The URL of the previous page
   *
   * TODO not implemented
   * @property previousUrl
   * @type {String}
   * @default null
   * @public
   */
  previousUrl: null,

  /**
   * Whether there is a next page to show
   *
   * @property hasNext
   * @type {Boolean}
   * @default false
   * @public
   */
  hasNext: false,

  /**
   * Whether there is a previous page to show
   *
   * @property hasPrevious
   * @type {Boolean}
   * @default false
   * @public
   */
  hasPrevious: false,

  /**
   * Visually hidden text for screen readers
   *
   * @property accessibilityLabel
   * @type {string}
   * @default 'Pagination'
   * @public
   */
  accessibilityLabel: 'Pagination',

  /**
   * Keyboard shortcuts for the previous button
   *
   * @property previousKeys
   * @type {KeyEvent.code[]}
   * @default null
   * @public
   */
  previousKeys: null,

  /**
   * Keyboard shortcuts for the next button
   *
   * @property nextKeys
   * @type {KeyEvent.code[]}
   * @default null
   * @public
   */
  nextKeys: null,

  /**
   * Callback when next button is clicked
   *
   * @property onNext
   * @type {function}
   * @default no-op
   * @public
   */
  onNext() {},

  /**
   * Callback when previous button is clicked
   *
   * @property onPrevious
   * @type {function}
   * @default no-op
   * @public
   */
  onPrevious() {},

  /** @private */
  handleMouseUpByBlurring,

  /** @private */
  isPreviousDisabled: not('hasPrevious').readOnly(),

  /** @private */
  isNextDisabled: not('hasNext').readOnly(),

  /** @private */
  hasNextKeysConfigured: computed('nextKeys.[]', function() {
    if (isEmpty(this.nextKeys)) {
      return false;
    }

    assert(
      'ember-polaris:polaris-pagination `nextKeys` should be an array',
      isArray(this.nextKeys)
    );

    return true;
  }).readOnly(),

  /** @private */
  hasPreviousKeysConfigured: computed('previousKeys.[]', function() {
    if (isEmpty(this.previousKeys)) {
      return false;
    }

    assert(
      'ember-polaris:polaris-pagination `previousKeys` should be an array',
      isArray(this.previousKeys)
    );

    return true;
  }).readOnly(),

  /** @private */
  isNextKeyListenerEnabled: and(
    'hasNext',
    'hasNextKeysConfigured',
    'onNext'
  ).readOnly(),

  /** @private */
  isPreviousKeyListenerEnabled: and(
    'hasPrevious',
    'hasPreviousKeysConfigured',
    'onPrevious'
  ).readOnly(),
});
