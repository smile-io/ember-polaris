import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import layout from '../../templates/components/polaris-action-list/item';

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
   *  - image
   *  - ellipsis (not currently supported)
   *  - badge (not currently supported)
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

  imageBackgroundStyle: computed('item.image', function() {
    let url = this.get('item.image');
    return url ? htmlSafe(`background-image: url(${ url })`) : '';
  }).readOnly(),
});
