import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click, find, triggerEvent } from '@ember/test-helpers';
import { computed } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { FilterType } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/filter-value-selector';
import { DateFilterOption } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/date-selector';
import ContextService from '@smile-io/ember-polaris/services/polaris-resource-list/context';

ContextService.reopen({
  selectMode: false,
  resourceName: computed(function() {
    return {
      singular: 'item',
      plural: 'items,',
    };
  }),
  selectable: false,
});

const mockFilters = [
  {
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
  },
  {
    key: 'filterKey2',
    label: 'Tagged',
    operatorText: 'with',
    type: FilterType.TextField,
  },
];

const mockAppliedFilters = [
  {
    key: 'filterKey1',
    value: 'Bundle',
  },
  {
    key: 'filterKey1',
    value: 'beauty_value',
  },
];

async function triggerAddFilter(filter) {
  // Open the filter creator popover.
  await click(`[data-test-id="filter-activator"]`);

  // Select a filter.
  find('.Polaris-Select select').value = filter.key;
  await triggerEvent('.Polaris-Select select', 'change');

  // Give the filter a value.
  const textFieldFilterControlSelector =
    '.Polaris-Popover .Polaris-TextField input';
  if (find(textFieldFilterControlSelector)) {
    await fillIn(textFieldFilterControlSelector, filter.value);
  } else {
    const selectFilterControlSelector = '[data-test-select="filter"]';
    find(selectFilterControlSelector).value = filter.value;
    await triggerEvent(selectFilterControlSelector, 'change');
  }

  // Submit the filter form.
  await triggerEvent('[data-test-form]', 'submit');
}

module(
  'Integration | Component | polaris-resource-list/filter-control',
  function(hooks) {
    setupRenderingTest(hooks);

    module('searchValue', function() {
      test('renders with TextField by default', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/filter-control}}
        `);

        assert.dom('.Polaris-TextField').exists();
      });

      test('renders with searchValue as its value', async function(assert) {
        const searchValue = 'search value';
        this.set('searchValue', searchValue);
        await render(hbs`
          {{polaris-resource-list/filter-control
            searchValue=searchValue
          }}
        `);

        assert.dom('.Polaris-TextField input').hasValue(searchValue);
      });
    });

    module('onSearchChange()', function() {
      test('calls onSearchChange with the new searchValue when onChange is triggered', async function(assert) {
        const newSearchValue = 'new search value';
        await render(hbs`
          {{polaris-resource-list/filter-control
            onSearchChange=(action (mut newSearchValue))
          }}
        `);

        await fillIn('.Polaris-TextField input', newSearchValue);

        assert.equal(this.get('newSearchValue'), newSearchValue);
      });
    });

    module(
      'filters',
      {
        beforeEach() {
          this.set('mockFilters', mockFilters);
        },
      },
      function() {
        test('renders no <FilterCreator/> if there are no filters', async function(assert) {
          await render(hbs`
            {{polaris-resource-list/filter-control}}
          `);

          assert.dom('[data-test-connected-item="left"]').doesNotExist();
        });

        test('renders <FilterCreator/> if there is filters', async function(assert) {
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=mockFilters
            }}
          `);

          assert.dom('[data-test-id="filter-activator"]').exists();
        });

        /**
         * Skipping this for now because there's no clean way to check the filters.
         */
        skip('renders <FilterCreator/> with filters', async function(/* assert */) {
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=mockFilters
            }}
          `);

          // React code:
          // expect(wrapper.find(FilterCreator).prop('filters')).toMatchObject(
          //   mockFilters,
          // );
        });
      }
    );

    module(
      'onFiltersChange()',
      {
        beforeEach() {
          this.setProperties({
            mockFilters,
            mockAppliedFilters,
          });
        },
      },
      function() {
        test('gets call with the new filter when FilterCreator.onAddFilter is triggered', async function(assert) {
          const newFilter = {
            key: 'filterKey2',
            value: 'new value',
          };

          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=mockFilters
              appliedFilters=mockAppliedFilters
              onFiltersChange=(action (mut newAppliedFilters))
            }}
          `);

          await triggerAddFilter(newFilter);

          assert.deepEqual(this.get('newAppliedFilters'), [
            ...mockAppliedFilters,
            newFilter,
          ]);
        });

        test('does not get call if the new filter already exist when FilterCreator.onAddFilter is triggered', async function(assert) {
          const newFilter = mockAppliedFilters[0];
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=mockFilters
              appliedFilters=mockAppliedFilters
              onFiltersChange=(action (mut wasOnFiltersChangeCalled) true)
            }}
          `);

          await triggerAddFilter(newFilter);

          assert.notOk(this.get('wasOnFiltersChangeCalled'));
        });
      }
    );

    module(
      'appliedFilters',
      {
        beforeEach() {
          this.set('mockAppliedFilters', mockAppliedFilters);
        },
      },
      function() {
        test('renders the same number of Tag as appliedFilters', async function(assert) {
          await render(hbs`
            {{polaris-resource-list/filter-control
              appliedFilters=mockAppliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .exists({ count: mockAppliedFilters.length });
        });

        test('calls onFiltersChange without the applied filter when user click remove on the appliedFilter', async function(assert) {
          await render(hbs`
            {{polaris-resource-list/filter-control
              appliedFilters=mockAppliedFilters
              onFiltersChange=(action (mut newAppliedFilters))
            }}
          `);

          await click('[data-test-tag-button]');

          assert.deepEqual(this.get('newAppliedFilters'), [
            ...mockAppliedFilters.slice(1, mockAppliedFilters.length),
          ]);
        });

        test('renders the correct applied filter string when applied filter label exist', async function(assert) {
          const appliedFilterLabel = 'shorten electronic';
          const filter = {
            key: 'filterKey1',
            label: 'Product type',
            operatorText: 'is',
            type: FilterType.Select,
            options: [
              {
                value: 'electronic_value',
                label: 'Electronic',
              },
            ],
          };
          const appliedFilters = {
            key: filter.key,
            value: appliedFilterLabel,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .hasText(
              `${filter.label} ${filter.operatorText} ${appliedFilterLabel}`
            );
        });

        test('renders the correct applied filter string when filter value exist in FilterSelect as an option string', async function(assert) {
          const filterValue = 'Bundle';
          const filter = {
            key: 'filterKey1',
            label: 'Product type',
            operatorText: 'is',
            type: FilterType.Select,
            options: [filterValue],
          };
          const appliedFilters = {
            key: filter.key,
            value: filterValue,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .hasText(`${filter.label} ${filter.operatorText} ${filterValue}`);
        });

        test('renders the correct applied filter string when filter value exist in FilterSelect as an option object', async function(assert) {
          const filterValue = 'Electronic';
          const filter = {
            key: 'filterKey1',
            label: 'Product type',
            operatorText: 'is',
            type: FilterType.Select,
            options: [
              {
                value: 'electronic_value',
                label: filterValue,
              },
            ],
          };
          const appliedFilters = {
            key: filter.key,
            value: filterValue,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .hasText(`${filter.label} ${filter.operatorText} ${filterValue}`);
        });

        test('renders the correct applied filter string when filter value cannot be found in FilterSelect options', async function(assert) {
          const appliedFilterValue = 'new Bundle';
          const filter = {
            key: 'filterKey1',
            label: 'Product type',
            operatorText: 'is',
            type: FilterType.Select,
            options: ['Bundle'],
          };
          const appliedFilters = {
            key: filter.key,
            value: appliedFilterValue,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .hasText(
              `${filter.label} ${filter.operatorText} ${appliedFilterValue}`
            );
        });

        test('renders the correct applied filter string when filter is a FilterTextField', async function(assert) {
          const appliedFilterValue = 'new Bundle';
          const filter = {
            key: 'filterKey2',
            label: 'Tagged',
            operatorText: 'with',
            type: FilterType.TextField,
          };
          const appliedFilters = {
            key: filter.key,
            value: appliedFilterValue,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .hasText(
              `${filter.label} ${filter.operatorText} ${appliedFilterValue}`
            );
        });

        test('only renders the correct localized applied filter string when filter is a FilterDateSelector without date predicate', async function(assert) {
          const appliedFilterValue = DateFilterOption.PastWeek;

          const filter = {
            key: 'starts',
            minKey: 'starts_min',
            maxKey: 'starts_max',
            label: 'Starts',
            operatorText: 'is',
            type: FilterType.DateSelector,
          };
          const appliedFilters = {
            key: filter.key,
            value: appliedFilterValue,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          const expectedLocalizedLabel = 'in the last week';

          assert
            .dom('.Polaris-Tag')
            .hasText(
              `${filter.label} ${filter.operatorText} ${expectedLocalizedLabel}`
            );
        });

        test('renders the correct localized applied filter string when filter is a FilterDateSelector with minimum date predicate (on or after)', async function(assert) {
          const selectedDate = '2018-09-16';
          const filter = {
            key: 'starts',
            minKey: 'starts_min',
            maxKey: 'starts_max',
            label: 'Starts',
            operatorText: 'is',
            type: FilterType.DateSelector,
          };
          const appliedFilters = {
            key: filter.minKey,
            value: selectedDate,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          const expectedLocalizedLabel = `after ${new Date(
            selectedDate.replace(/-/g, '/')
          ).toLocaleDateString()}`;

          assert
            .dom('.Polaris-Tag')
            .hasText(`${filter.label} ${expectedLocalizedLabel}`);
        });

        test('renders the correct localized applied filter string when filter is a FilterDateSelector with maximum date predicate (on or before)', async function(assert) {
          const selectedDate = '2018-09-16';
          const filter = {
            key: 'starts',
            minKey: 'starts_min',
            maxKey: 'starts_max',
            label: 'Starts',
            operatorText: 'is',
            type: FilterType.DateSelector,
          };
          const appliedFilters = {
            key: filter.maxKey,
            value: selectedDate,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          const expectedLocalizedLabel = `before ${new Date(
            selectedDate.replace(/-/g, '/')
          ).toLocaleDateString()}`;

          assert
            .dom('.Polaris-Tag')
            .hasText(`${filter.label} ${expectedLocalizedLabel}`);
        });

        test('renders applied filter value when filter is a FilterDateSelector with invalid date predicate', async function(assert) {
          const selectedDate = 'INVALID';
          const filter = {
            key: 'starts',
            minKey: 'starts_min',
            maxKey: 'starts_max',
            label: 'Starts',
            operatorText: 'is',
            type: FilterType.DateSelector,
          };
          const appliedFilters = {
            key: filter.maxKey,
            value: selectedDate,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          const expectedLocalizedLabel = `before ${selectedDate}`;

          assert
            .dom('.Polaris-Tag')
            .hasText(`${filter.label} ${expectedLocalizedLabel}`);
        });

        test('renders the correct applied filter string when filter uses operators with filter label', async function(assert) {
          const appliedFilterValue = '20';
          const appliedFilterKey = 'times_used';
          const appliedFilterLabel = 'is';

          const filter = {
            key: 'filterKey1',
            label: 'Times used',
            operatorText: [
              {
                optionLabel: 'equal to',
                filterLabel: appliedFilterLabel,
                key: appliedFilterKey,
              },
              {
                optionLabel: 'not equal to',
                filterLabel: 'is not',
                key: 'times_used_not',
              },
            ],
            type: FilterType.TextField,
          };
          const appliedFilters = {
            key: appliedFilterKey,
            value: appliedFilterValue,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .hasText(
              `${filter.label} ${appliedFilterLabel} ${appliedFilterValue}`
            );
        });

        test('renders the correct applied filter string when filter uses operators without filter label', async function(assert) {
          const appliedFilterValue = '20';
          const appliedFilterKey = 'times_used';
          const appliedOperatorOptionLabel = 'equal to';

          const filter = {
            key: 'filterKey1',
            label: 'Times used',
            operatorText: [
              {
                optionLabel: appliedOperatorOptionLabel,
                key: appliedFilterKey,
              },
              {
                optionLabel: 'not equal to',
                key: 'times_used_not',
              },
            ],
            type: FilterType.TextField,
          };
          const appliedFilters = {
            key: appliedFilterKey,
            value: appliedFilterValue,
          };
          this.setProperties({
            filter: [filter],
            appliedFilters: [appliedFilters],
          });
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=filter
              appliedFilters=appliedFilters
            }}
          `);

          assert
            .dom('.Polaris-Tag')
            .hasText(
              `${
                filter.label
              } ${appliedOperatorOptionLabel} ${appliedFilterValue}`
            );
        });

        test('renders the correct applied filter string when filter key cannot be found', async function(assert) {
          const appliedFilterValue = 'new Bundle';
          const appliedFilters = {
            key: 'filter key',
            value: appliedFilterValue,
          };
          this.set('appliedFilters', [appliedFilters]);
          await render(hbs`
            {{polaris-resource-list/filter-control
              filters=(array)
              appliedFilters=appliedFilters
            }}
          `);

          assert.dom('.Polaris-Tag').hasText(appliedFilterValue);
        });
      }
    );

    module('additionalAction', function() {
      test('renders no connectedRight prop on TextField if there is no additionalAction', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/filter-control}}
        `);

        assert.dom('[data-test-connected-item="right"]').doesNotExist();
      });

      test('renders Button if there is additionalAction', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/filter-control
            additionalAction=(hash
              text="button label"
              onAction=(action (mut wasAdditionalActionClicked) true)
            )
          }}
        `);

        assert.dom('.Polaris-Button').exists();

        await click('.Polaris-Button');
        assert.ok(this.get('wasAdditionalActionClicked'));
      });
    });
  }
);
