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
   *  - destructive
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

  itemClasses: computed('item.{destructive,disabled}', function() {
    let classNames = ['Polaris-ActionList__Item'];
    let item = this.get('item');
    let { destructive, disabled } = item;

    if (destructive) {
      classNames.push('Polaris-ActionList--destructive');
    }

    if (disabled) {
      classNames.push('Polaris-ActionList--disabled');
    }

    return classNames.join(' ');
  }),

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
    return url ? htmlSafe(`background-image: url(${url})`) : '';
  }).readOnly(),
});
