import Component from '@ember/component';
import layout from '../../templates/components/polaris-resource-list/filter-control';

export default Component.extend({
  tagName: '',

  layout,

  /**
   * @property searchValue
   * @type {String}
   * @default null
   * @public
   */
  searchValue: null,

  /**
   * @property appliedFilters
   * @type {Object[]}
   * @default null
   * @public
   */
  appliedFilters: null,

  /**
   * @property additionalAction
   * @type {Object}
   * @default null
   * @public
   */
  additionalAction: null,

  /**
   * @property focused
   * @type {Boolean}
   * @default false
   * @public
   */
  focused: false,

  /**
   * @property filters
   * @type {Object[]}
   * @default null
   * @public
   */
  filters: null,

  /**
   * @property onSearchBlur
   * @type {Function}
   * @default noop
   * @public
   */
  onSearchBlur() {},

  /**
   * @property onSearchChange
   * @type {Function}
   * @default noop
   * @public
   */
  onSearchChange() {},

  /**
   * @property onFiltersChange
   * @type {Function}
   * @default noop
   * @public
   */
  onFiltersChange() {},
});
