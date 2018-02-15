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
   * Supported properties:
   *  - content
   *  - url (not currently supported)
   *  - disabled
   *  - icon
   *  - image (not currently supported)
   *  - onAction
   *
   * @property item
   * @public
   * @type {Object}
   * @default null
   */
  item: null,

  /**
   * Callback for the item when clicked
   *
   * @property onAction
   * @public
   * @type {function}
   * @default no-op
   */
  onAction() {},
});
