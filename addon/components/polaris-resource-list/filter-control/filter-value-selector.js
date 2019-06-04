import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../../../templates/components/polaris-resource-list/filter-control/filter-value-selector';

export const FilterType = {
  Select: 'select',
  TextField: 'text_field',
  DateSelector: 'date_selector',
};

@tagName('')
@templateLayout(layout)
export default class FilterValueSelector extends Component {
  /**
   * @property filter
   * @type {Object}
   * @default null
   * @public
   */
  filter = null;

  /**
   * @property filterKey
   * @type {String}
   * @default null
   * @public
   */
  filterKey = null;

  /**
   * @property value
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * @property onChange
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {}

  /**
   * @property onFilterKeyChange
   * @type {Function}
   * @default noop
   * @public
   */
  onFilterKeyChange() {}

  FilterType = FilterType;

  @(computed('filter.{type,operatorText}').readOnly())
  get showOperatorOptions() {
    let filter = this.get('filter');
    let type = get(filter, 'type');
    let operatorText = get(filter, 'operatorText');

    return (
      type !== FilterType.DateSelector &&
      operatorText &&
      typeof operatorText !== 'string'
    );
  }

  @(computed('filter.{label,operatorText}', 'filterKey').readOnly())
  get operatorOptionsMarkup() {
    let { filter, filterKey } = this.getProperties('filter', 'filterKey');

    return {
      componentName: 'polaris-select',
      props: {
        labelHidden: true,
        dataTestSelect: 'operator',
        label: get(filter, 'label'),
        options: buildOperatorOptions(get(filter, 'operatorText')),
        value: filterKey,
        onChange: (...args) => this.handleOperatorOptionChange(...args),
      },
    };
  }

  @(computed('filter.operatorText').readOnly())
  get selectedFilterLabel() {
    let operatorText = this.get('filter.operatorText');
    return typeof operatorText === 'string' ? operatorText : '';
  }

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
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    let filter = this.get('filter');
    let { operatorText, type } = filter;

    if (
      type === FilterType.DateSelector ||
      !operatorText ||
      typeof operatorText === 'string' ||
      operatorText.length === 0
    ) {
      return;
    }

    this.handleOperatorOptionChange(operatorText[0].key);
  }
}

function buildOperatorOptions(operatorText) {
  if (!operatorText || typeof operatorText === 'string') {
    return [];
  }

  return operatorText.map(({ key, optionLabel }) => {
    return { value: key, label: optionLabel };
  });
}
