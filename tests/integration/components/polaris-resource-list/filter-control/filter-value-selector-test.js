import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { FilterType } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/filter-value-selector';

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

function getOptionsListForOperators(operators) {
  return operators.map(({ key, optionLabel }) => {
    return { value: key, label: optionLabel };
  });
}

async function triggerChangeEventWithValue(selector, value) {
  find(selector).value = value;
  await triggerEvent(selector, 'change');
}

module(
  'Integration | Component | polaris-resource-list/filter-control/filter-value-selector',
  function(hooks) {
    setupRenderingTest(hooks);

    module('filter.type', function() {
      module(
        'FilterType.Select',
        {
          beforeEach() {
            this.set('filter', JSON.parse(JSON.stringify(selectFilter)));
          },
        },
        function() {
          test('renders a Select field', async function(assert) {
            await render(hbs`
            {{polaris-resource-list/filter-control/filter-value-selector
              filter=filter
            }}
          `);

            assert.dom('.Polaris-Select').exists();
          });

          test('renders label using operatorText when it is a string', async function(assert) {
            await render(hbs`
            {{polaris-resource-list/filter-control/filter-value-selector
              filter=filter
            }}
          `);

            assert
              .dom('.Polaris-Label')
              .hasText(this.get('filter.operatorText'));
          });

          test('renders a Select with options using operatorText when it is a list of operators', async function(assert) {
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

          test('renders value using the value prop', async function(assert) {
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

          test('calls onChange when the Select was changed', async function(assert) {
            await render(hbs`
            {{polaris-resource-list/filter-control/filter-value-selector
              filter=filter
              onChange=(action (mut wasOnChangeCalled) true)
            }}
          `);

            await triggerEvent('.Polaris-Select select', 'change');
            assert.ok(this.get('wasOnChangeCalled'));
          });

          test('calls onFilterKeyChange when operator is changed', async function(assert) {
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

          test('calls onChange with filter value when operator is changed and filter value is set', async function(assert) {
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
    });
  }
);
