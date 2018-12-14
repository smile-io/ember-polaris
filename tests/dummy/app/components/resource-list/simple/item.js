import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../../templates/components/resource-list/simple/item';

export default Component.extend({
  tagName: '',

  layout,

  // `item` and `itemId` will be passed in by `polaris-resource-list`.
  item: null,
  itemId: null,

  accessibilityLabel: computed('item.name', function() {
    return `View details for ${this.get('item.name')}`;
  }).readOnly(),
});
