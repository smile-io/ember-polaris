import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { FilterType } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/filter-value-selector';
import DateSelectorComponent, {
  DateFilterOption,
} from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/date-selector';

const operators = [
  {
    optionLabel: 'equal to',
    filterLabel: 'is',
    key: 'times_used',
  },
  {
    optionLabel: 'not equal to',
    filterLabel: 'is not',
    key: 'times_used_not',
  },
  {
    optionLabel: 'less than',
    filterLabel: 'is less than',
    key: 'times_used_max',
  },
  {
    optionLabel: 'greater than',
    filterLabel: 'is greater than',
    key: 'times_used_min',
  },
];

const selectFilter = {
  key: 'filterKey1',
  label: 'Product type',
  operatorText: 'is',
  type: FilterType.Select,
  options: [
    'Bundle',
    {
      value: 'electronic_value',
      label: 'Electronic',
      disabled: true,
    },
    {
      value: 'beauty_value',
      label: 'Beauty',
    },
  ],
};

const textFieldFilter = {
  key: 'filterKey2',
  label: 'Tagged with',
  type: FilterType.TextField,
};

const dateSelectorFilter = {
  key: 'filterKey1',
  minKey: 'ends_min',
  maxKey: 'ends_max',
  label: 'Starts',
  type: FilterType.DateSelector,
  dateOptionType: 'past',
};

function getOptionsListForOperators(operators) {
  return operators.map(({ key, optionLabel }) => {
    return { value: key, label: optionLabel };
  });
}

async function triggerChangeEventWithValue(
  selector,
  value,
  eventName = 'change'
) {
  find(selector).value = value;
  await triggerEvent(selector, eventName);
}

module(
  'Integration | Component | polaris-resource-list/filter-control/filter-value-selector',
  function (hooks) {
    setupRenderingTest(hooks);

    module('filter.type', function () {
      module(
        'FilterType.Select',
        {
          beforeEach() {
            this.set('filter', JSON.parse(JSON.stringify(selectFilter)));
          },
        },
        function () {
          test('renders a Select field', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert.dom('.Polaris-Select').exists();
          });

          test('renders label using operatorText when it is a string', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert
              .dom('.Polaris-Label')
              .hasText(this.get('filter.operatorText'));
          });

          test('renders a Select with options using operatorText when it is a list of operators', async function (assert) {
            this.set('filter.operatorText', operators);
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            const expectedOptions = getOptionsListForOperators(operators);

            const operatorsSelectOptions = findAll(
              '[data-test-select="operator"] option:not([disabled])'
            ).map((option) => {
              return {
                value: option.getAttribute('value'),
                label: option.textContent.trim(),
              };
            });
            assert.deepEqual(operatorsSelectOptions, expectedOptions);
          });

          test('renders value using the value prop', async function (assert) {
            const value = 'beauty_value';
            this.set('value', value);
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                value=value
              }}
            `);

            assert.dom('.Polaris-Select select').hasValue(value);
          });

          test('calls onChange when the Select was changed', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                onChange=(action (mut wasOnChangeCalled) true)
              }}
            `);

            await triggerEvent('.Polaris-Select select', 'change');
            assert.ok(this.get('wasOnChangeCalled'));
          });

          test('calls onFilterKeyChange when operator is changed', async function (assert) {
            const newOperator = operators[1].key;
            this.set('filter.operatorText', operators);

            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                onFilterKeyChange=(action (mut wasOnFilterKeyChangeCalled) true)
              }}
            `);

            await triggerChangeEventWithValue(
              '[data-test-select="operator"]',
              newOperator
            );

            assert.ok(this.get('wasOnFilterKeyChangeCalled'));
          });

          test('calls onChange with filter value when operator is changed and filter value is set', async function (assert) {
            const newFilterValue = 'beauty_value';
            this.set('filter.operatorText', operators);

            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                onChange=(action (mut newFilterValue))
              }}
            `);

            await triggerChangeEventWithValue(
              '[data-test-select="filter"]',
              newFilterValue
            );

            await triggerChangeEventWithValue(
              '[data-test-select="operator"]',
              operators[1].key
            );

            assert.equal(this.get('newFilterValue'), newFilterValue);
          });
        }
      );

      module(
        'FilterType.TextField',
        {
          beforeEach() {
            this.set('filter', JSON.parse(JSON.stringify(textFieldFilter)));
          },
        },
        function () {
          test('renders a TextField', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert.dom('.Polaris-TextField').exists();
          });

          test('does not render a label if operatorText does not exist', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert.dom('.Polaris-Label').doesNotExist();
          });

          test('renders a Select with options using operatorText when it is a list of operators', async function (assert) {
            this.set('filter.operatorText', operators);
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            const expectedOptions = getOptionsListForOperators(operators);

            const operatorsSelectOptions = findAll(
              '[data-test-select="operator"] option:not([disabled])'
            ).map((option) => {
              return {
                value: option.getAttribute('value'),
                label: option.textContent.trim(),
              };
            });
            assert.deepEqual(operatorsSelectOptions, expectedOptions);
          });

          test('renders value using the value prop', async function (assert) {
            const value = 'test';
            this.set('value', value);
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                value=value
              }}
            `);

            assert.dom('.Polaris-TextField input').hasValue(value);
          });

          test('renders type using the textFieldType prop', async function (assert) {
            const textFieldType = 'number';
            this.set('filter.textFieldType', textFieldType);

            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert
              .dom('.Polaris-TextField input')
              .hasAttribute('type', textFieldType);
          });

          test('renders undefined type when the textFieldType prop is not passed', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert.dom('.Polaris-TextField input').doesNotHaveAttribute('type');
          });

          test('calls onChange when the text field was changed', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                onChange=(action (mut wasOnChangeCalled) true)
              }}
            `);

            await triggerEvent('.Polaris-TextField input', 'input');
            assert.ok(this.get('wasOnChangeCalled'));
          });

          test('calls onFilterKeyChange when operator is changed', async function (assert) {
            const newOperator = operators[1].key;
            this.set('filter.operatorText', operators);

            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                onFilterKeyChange=(action (mut newFilterKey))
              }}
            `);

            await triggerChangeEventWithValue(
              '.Polaris-Select select',
              newOperator
            );

            assert.equal(this.get('newFilterKey'), newOperator);
          });

          test('calls onChange with filter value when operator is changed and filter value is set', async function (assert) {
            const newFilterValue = 'foo';
            this.set('filter.operatorText', operators);

            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                onChange=(action (mut newFilterValue))
              }}
            `);

            await triggerChangeEventWithValue(
              '.Polaris-TextField input',
              newFilterValue,
              'input'
            );

            await triggerChangeEventWithValue(
              '[data-test-select="operator"]',
              operators[1].key
            );

            assert.equal(this.get('newFilterValue'), newFilterValue);
          });
        }
      );

      module(
        'FilterType.DateSelector',
        {
          beforeEach() {
            this.setProperties({
              filter: JSON.parse(JSON.stringify(dateSelectorFilter)),
              overrideDateSelectorTemplate(layout) {
                this.owner.register(
                  'component:polaris-resource-list/filter-control/date-selector',
                  DateSelectorComponent.extend({
                    layout,
                  })
                );
              },
            });
          },
        },
        function () {
          test('renders a DateSelector', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert.dom('[data-test-select="date-selector"]').exists();
          });

          test('renders filterValue using the value prop', async function (assert) {
            const value = DateFilterOption.PastMonth;
            this.set('value', value);
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                value=value
              }}
            `);

            assert.dom('[data-test-select="date-selector"]').hasValue(value);
          });

          test('renders filterKey using the filterKey prop', async function (assert) {
            this.overrideDateSelectorTemplate(hbs`
              <div id="filter-key" data-test-filter-key={{filterKey}}></div>
            `);

            const filterKey = 'test';
            this.set('filterKey', filterKey);
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                filterKey=filterKey
              }}
            `);

            assert
              .dom('#filter-key')
              .hasAttribute('data-test-filter-key', filterKey);
          });

          test('renders filterMinKey using the min key of filter on filter prop', async function (assert) {
            this.overrideDateSelectorTemplate(hbs`
              <div id="filter-min-key" data-test-filter-min-key={{filterMinKey}}></div>
            `);

            const filterMinKey = 'test';
            this.set('filter.minKey', filterMinKey);

            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert
              .dom('#filter-min-key')
              .hasAttribute('data-test-filter-min-key', filterMinKey);
          });

          test('renders filterMaxKey using the max key of filter on filter prop', async function (assert) {
            this.overrideDateSelectorTemplate(hbs`
              <div id="filter-max-key" data-test-filter-max-key={{filterMaxKey}}></div>
            `);

            const filterMaxKey = 'test';
            this.set('filter.maxKey', filterMaxKey);

            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert
              .dom('#filter-max-key')
              .hasAttribute('data-test-filter-max-key', filterMaxKey);
          });

          test('does not render Select with operator options', async function (assert) {
            this.set('filter.operatorText', operators);
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
              }}
            `);

            assert.dom('[data-test-select="operator"]').doesNotExist();
          });

          test('calls onChange when the filter key was changed', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                filterKey="test"
                onChange=(action (mut wasOnChangeCalled) true)
              }}
            `);

            await triggerEvent('[data-test-select="date-selector"]', 'change');
            assert.ok(this.get('wasOnChangeCalled'));
          });

          test('calls onFilterKeyChange when the filter key was changed', async function (assert) {
            await render(hbs`
              {{polaris-resource-list/filter-control/filter-value-selector
                filter=filter
                filterKey="test"
                onFilterKeyChange=(action (mut wasOnFilterKeyChangeCalled) true)
              }}
            `);

            await triggerEvent('[data-test-select="date-selector"]', 'change');
            assert.ok(this.get('wasOnFilterKeyChangeCalled'));
          });
        }
      );
    });
  }
);
