import Component from '@ember/component';
import { computed, get } from '@ember/object';
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

  showOperatorOptions: computed('filter.{type,operatorText}', function() {
    let filter = this.get('filter');
    let type = get(filter, 'type');
    let operatorText = get(filter, 'operatorText');

    return (
      type !== FilterType.DateSelector &&
      operatorText &&
      typeof operatorText !== 'string'
    );
  }).readOnly(),

  operatorOptions: computed(
    'filter.{label,operatorText}',
    'filterKey',
    function() {
      let { filter, filterKey } = this.getProperties('filter', 'filterKey');

      return {
        componentName: 'polaris-select',
        props: {
          labelHidden: true,
          label: get(filter, 'label'),
          options: buildOperatorOptions(get(filter, 'operatorText')),
          value: filterKey,
          onChange: (...args) => this.handleOperatorOptionChange(...args),
        },
      };
    }
  ).readOnly(),

  handleOperatorOptionChange(operatorKey) {
    let { value, onChange, onFilterKeyChange } = this.getProperties(
      'value',
      'onChange',
      'onFilterKeyChange'
    );
    onFilterKeyChange(operatorKey);

    if (!value) {
      return;
    }

    onChange(value);
  },
});

function buildOperatorOptions(operatorText) {
  if (!operatorText || typeof operatorText === 'string') {
    return [];
  }

  return operatorText.map(({ key, optionLabel }) => {
    return { value: key, label: optionLabel };
  });
}
