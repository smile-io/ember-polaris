import Component from '@ember/component';
import layout from '../../templates/components/polaris-action-list/item';

/**
 * TODO: support link items and items with an `image`.
 */
export default Component.extend({
  tagName: 'li',

  layout,

  /**
   * The item to display
   *
   * @property item
   * @type {Object}
   * @default null
   */
  item: null,

  /**
   * Callback for the item when clicked
   *
   * @property onAction
   * @type {function}
   * @default no-op
   */
  onAction() {},
});
