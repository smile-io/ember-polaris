import Component from '@ember/component';
import layout from '../../templates/components/resource-list/filtering';

export default Component.extend({
  layout,

  searchValue: '',
  appliedFilters: null,

  init() {
    this._super(...arguments);

    this.set('appliedFilters', [
      {
        key: 'accountStatusFilter',
        value: 'Account enabled',
      },
    ]);
  },
});
