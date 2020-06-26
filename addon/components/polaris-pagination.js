import Component from '@ember/component';
import { computed } from '@ember/object';
import { not, and } from '@ember/object/computed';
import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-pagination';
import { handleMouseUpByBlurring } from '../utils/focus';

@tagName('')
@templateLayout(layout)
export default class PolarisPagination extends Component {
  /**
   * A more subdued control for use in headers
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  plain = false;

  /**
   * The URL of the next page
   *
   * TODO not implemented
   * @type {String}
   * @default null
   * @public
   */
  nextUrl = null;

  /**
   * The URL of the previous page
   *
   * TODO not implemented
   * @type {String}
   * @default null
   * @public
   */
  previousUrl = null;

  /**
   * Whether there is a next page to show
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  hasNext = false;

  /**
   * Whether there is a previous page to show
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  hasPrevious = false;

  /**
   * Visually hidden text for screen readers
   *
   * @type {string}
   * @default 'Pagination'
   * @public
   */
  accessibilityLabel = 'Pagination';

  /**
   * Keyboard shortcuts for the previous button
   *
   * @type {KeyEvent.code[]}
   * @default null
   * @public
   */
  previousKeys = null;

  /**
   * Keyboard shortcuts for the next button
   *
   * @type {KeyEvent.code[]}
   * @default null
   * @public
   */
  nextKeys = null;

  /**
   * Callback when next button is clicked
   *
   * @type {function}
   * @default no-op
   * @public
   */
  onNext() {}

  /**
   * Callback when previous button is clicked
   *
   * @type {function}
   * @default no-op
   * @public
   */
  onPrevious() {}

  /** @private */
  handleMouseUpByBlurring = handleMouseUpByBlurring;

  /** @private */
  @(not('hasPrevious').readOnly())
  isPreviousDisabled;

  /** @private */
  @(not('hasNext').readOnly())
  isNextDisabled;

  /** @private */
  @(computed('nextKeys.[]').readOnly())
  get hasNextKeysConfigured() {
    let { nextKeys } = this;

    if (isEmpty(nextKeys)) {
      return false;
    }

    assert(
      'ember-polaris:polaris-pagination `nextKeys` should be an array',
      isArray(nextKeys)
    );

    return true;
  }

  /** @private */
  @(computed('previousKeys.[]').readOnly())
  get hasPreviousKeysConfigured() {
    let { previousKeys } = this;

    if (isEmpty(previousKeys)) {
      return false;
    }

    assert(
      'ember-polaris:polaris-pagination `previousKeys` should be an array',
      isArray(previousKeys)
    );

    return true;
  }

  /** @private */
  @(and('hasNext', 'hasNextKeysConfigured', 'onNext').readOnly())
  isNextKeyListenerEnabled;

  /** @private */
  @(and('hasPrevious', 'hasPreviousKeysConfigured', 'onPrevious').readOnly())
  isPreviousKeyListenerEnabled;
}
