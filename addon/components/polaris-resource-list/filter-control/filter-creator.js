import Component from '@ember/component';
import layout from '../../../templates/components/polaris-resource-list/filter-control/filter-creator';

export default Component.extend({
  layout,

  /**
   * @property filters
   * @type {Object[]}
   * @default null
   * @public
   */
  filters: null,

  /**
   * Object with `singular` and `plural` properties.
   *
   * @property resourceName
   * @type {Object}
   * @default null
   * @public
   */
  resourceName: null,

  /**
   * @property disabled
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled: false,

  /**
   * @property onAddFilter
   * @type {Function}
   * @default noop
   * @public
   */
  onAddFilter() {},

  /**
   * @property popoverActive
   * @type {Boolean}
   * @default false
   * @private
   */
  popoverActive: false,

  /**
   * @property selectedFilter
   * @type {Object}
   * @default null
   * @private
   */
  selectedFilter: null,

  /**
   * @property selectedFilterKey
   * @type {String}
   * @default null
   * @private
   */
  selectedFilterKey: null,

  /**
   * @property selectedFilterValue
   * @type {String}
   * @default null
   * @private
   */
  selectedFilterValue: null,
});
