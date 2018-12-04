import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { FilterType } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/filter-value-selector';
import ContextService from '@smile-io/ember-polaris/services/polaris-resource-list/context';

ContextService.reopen({
  selectMode: false,
  resourceName: {
    singular: 'item',
    plural: 'items,',
  },
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
        test('renders no <FilterCreator /> if there are no filters', async function(assert) {
          await render(hbs`
            {{polaris-resource-list/filter-control}}
          `);

          assert.dom('[data-test-connected-item="left"]').doesNotExist();
        });

        test('renders <FilterCreator /> if there is filters', async function(assert) {
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
        skip('renders <FilterCreator /> with filters', async function(assert) {
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
  }
);
