import Component from '@ember/component';
import { or } from '@ember/object/computed';
import layout from '../templates/components/polaris-connected';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * An element connected to the left of the yielded content
   *
   * @property left
   * @public
   * @type {String|Component}
   * @default null
   */
  left: null,

  /**
   * An element connected to the right of the yielded content
   *
   * @property right
   * @public
   * @type {String|Component}
   * @default null
   */
  right: null,

  /**
   * Whether or not a `left` or `right` connection has been passed-in
   *
   * @property hasConnection
   * @private
   * @type {Boolean}
   */
  hasConnection: or('left', 'right').readOnly(),
});
