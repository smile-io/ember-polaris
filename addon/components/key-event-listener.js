import { tagName, layout as templateLayout } from '@ember-decorators/component';
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
@tagName('')
@templateLayout(layout)
export default class KeyEventListener extends Component.extend(
  EKMixin,
  EKOnInsertMixin
) {
  /**
   * The key (or key combination) that triggers the keyDown/keyPress/keyUp event
   * @property key
   * @type {KeyboardEvent.code} https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
   * @public
   * @default null
   * @required
   */
  key = null;

  /**
   * Corresponds to the native `onKeyPress` event that gets
   * triggered when `key` is pressed
   *
   * @property onKeyPress
   * @type {Function}
   * @public
   * @default null
   */
  onKeyPress = null;

  /**
   * Corresponds to the native `onKeyDown` event that gets
   * triggered when `key` is pressed
   *
   * @property onKeyDown
   * @type {Function}
   * @public
   * @default null
   */
  onKeyDown = null;

  /**
   * Corresponds to the native `onKeyUp` event that gets
   * triggered when `key` is pressed
   *
   * @property onKeyUp
   * @type {Function}
   * @public
   * @default null
   */
  onKeyUp = null;

  init() {
    super.init(...arguments);
    assert(
      'ember-polaris::key-event-listener `key` should be passed',
      isPresent(this.key)
    );
    assert(
      'ember-polaris::key-event-listener One of `onKeyPress`, `onKeyDown` or `onKeyUp` should be passed',
      this.onKeyUp || this.onKeyDown || this.onKeyPress
    );
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    if (this.onKeyUp) {
      this.on(keyUp(this.key), this.onKeyUp);
    }

    if (this.onKeyDown) {
      this.on(keyDown(this.key), this.onKeyDown);
    }

    if (this.onKeyPress) {
      this.on(keyPress(this.key), this.onKeyPress);
    }
  }
}
