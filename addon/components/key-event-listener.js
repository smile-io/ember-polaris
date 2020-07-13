import Component from '@ember/component';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import {
  EKMixin,
  EKOnInsertMixin,
  keyDown,
  keyUp,
  keyPress,
} from 'ember-keyboard';
import layout from '../templates/components/key-event-listener';

/**
 * A container component that helps in handling keyboard events
 *
 * @component key-event-listener
 */
export default Component.extend(EKMixin, EKOnInsertMixin, {
  tagName: '',

  layout,

  /**
   * The key (or key combination) that triggers the keyDown/keyPress/keyUp event
   * @type {KeyboardEvent.code} https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
   * @default null
   * @public
   * @required
   */
  key: null,

  /**
   * Corresponds to the native `onKeyPress` event that gets
   * triggered when `key` is pressed
   *
   * @type {Function}
   * @default null
   * @public
   */
  onKeyPress: null,

  /**
   * Corresponds to the native `onKeyDown` event that gets
   * triggered when `key` is pressed
   *
   * @type {Function}
   * @default null
   * @public
   */
  onKeyDown: null,

  /**
   * Corresponds to the native `onKeyUp` event that gets
   * triggered when `key` is pressed
   *
   * @type {Function}
   * @default null
   * @public
   */
  onKeyUp: null,

  init() {
    this._super(...arguments);
    assert(
      'ember-polaris::key-event-listener `key` should be passed',
      isPresent(this.key)
    );
    assert(
      'ember-polaris::key-event-listener One of `onKeyPress`, `onKeyDown` or `onKeyUp` should be passed',
      this.onKeyUp || this.onKeyDown || this.onKeyPress
    );
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.onKeyUp) {
      this.on(keyUp(this.key), this.onKeyUp);
    }

    if (this.onKeyDown) {
      this.on(keyDown(this.key), this.onKeyDown);
    }

    if (this.onKeyPress) {
      this.on(keyPress(this.key), this.onKeyPress);
    }
  },
});
