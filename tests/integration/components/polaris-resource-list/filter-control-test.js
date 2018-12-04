import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
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
  }
);
