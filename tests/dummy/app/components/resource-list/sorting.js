import Component from '@ember/component';
import layout from '../../templates/components/resource-list/sorting';

export default Component.extend({
  layout,

  sortValue: 'DATE_MODIFIED_DESC',
});
