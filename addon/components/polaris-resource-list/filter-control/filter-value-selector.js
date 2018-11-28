import Component from '@ember/component';
import layout from '../../../templates/components/polaris-resource-list/filter-control/filter-value-selector';

const FilterType = {
  Select: 'select',
  TextField: 'text_field',
  DateSelector: 'date_selector',
};

export default Component.extend({
  tagName: '',

  layout,

  FilterType,

  /**
   * @property filter
   * @type {Object}
   * @default null
   * @public
   */
  filter: null,

  /**
   * @property filterKey
   * @type {String}
   * @default null
   * @public
   */
  filterKey: null,

  /**
   * @property value
   * @type {String}
   * @default null
   * @public
   */
  value: null,

  /**
   * @property onChange
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {},

  /**
   * @property onFilterKeyChange
   * @type {Function}
   * @default noop
   * @public
   */
  onFilterKeyChange() {},
});
