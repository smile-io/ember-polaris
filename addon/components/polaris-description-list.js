import Component from '@ember/component';
import layout from '../templates/components/polaris-description-list';
import { warn } from '@ember/debug';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'dl',
  classNames: ['Polaris-DescriptionList'],

  layout,

  /**
   * Collection of items for list
   *
   * format with `term` and `description` keys:
   *
   * [{
   *   term: 'Term here',
   *   description: 'Description here'
   * }]
   *
   * @public
   * @property items
   * @type {Array}
   * @default: null
   */
  items: null,

  /*
   * Internal properties.
   */
  /*
   * Only render items that have the correct keys.
   */
  displayItems: computed('items.[]', function() {
    let items = this.get('items');

    if (!items) {
      return [];
    }

    return items.filter((item) => {
      if (item.term && item.description) {
        return true;
      } else {
        warn('Unsupported key(s) for `description-list`. Supported keys: `term` `description`');
      }
    });
  })
});
