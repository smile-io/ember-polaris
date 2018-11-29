import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import FilterValueSelectorComponent, { FilterType } from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/filter-value-selector';

const filters = [
  {
    key: 'filterKey',
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
    label: 'Tagged with',
    type: FilterType.TextField,
  },
  {
    key: 'filterKey3',
    label: 'Times used',
    operatorText: [
      {
        optionLabel: 'less than',
        key: 'times_used_max',
      },
      {
        optionLabel: 'greater than',
        key: 'times_used_min',
      },
    ],
    type: FilterType.TextField,
  },
];

const resourceName = {
  singular: 'Item',
  plural: 'Items',
};

// Grab the filter value selector instance for later use.
let filterValueSelector = null;
FilterValueSelectorComponent.reopen({
  init() {
    this._super(...arguments);
    filterValueSelector = this;
  },
});

async function activatePopover() {
  await click('.Polaris-Button[data-test-id="filter-activator"]');
}

async function selectFilterKey(filterKey) {
  find('.Polaris-Select select').value = filterKey;
  await triggerEvent('.Polaris-Select select', 'change');
}

function selectFilterValue(filterValue) {
  filterValueSelector.onChange(filterValue);
}

async function clickAddFilter() {
  await click('.Polaris-Button[data-test-id="add-filter"]');
}

module(
  'Integration | Component | polaris-resource-list/filter-control/filter-creator',
  function(hooks) {
    setupRenderingTest(hooks);

    test('renders just a button by default', async function(assert) {
      this.setProperties({
        filters,
        resourceName,
        disabled: false,
      });

      await render(hbs`
        {{polaris-resource-list/filter-control/filter-creator
          filters=filters
          resourceName=resourceName
          disabled=disabled
        }}
      `);

      assert.dom('.Polaris-Button').exists({ count: 1 });
      assert.dom('.Polaris-Select').doesNotExist();
    });

    test('renders a non-active popover on default', async function(assert) {
      this.setProperties({
        filters,
        resourceName,
        disabled: false,
      });

      await render(hbs`
        {{polaris-resource-list/filter-control/filter-creator
          filters=filters
          resourceName=resourceName
          disabled=disabled
        }}
      `);

      assert.dom('.Polaris-Popover').doesNotExist();
    });

    test('renders a active popover with a Select on click of the activator button', async function(assert) {
      this.setProperties({
        filters,
        resourceName,
        disabled: false,
      });

      await render(hbs`
        {{polaris-resource-list/filter-control/filter-creator
          filters=filters
          resourceName=resourceName
          disabled=disabled
        }}
      `);

      await activatePopover();

      assert.dom('.Polaris-Popover').exists();
    });

    test('renders a non-active popover after add filter button was clicked and onAddFilter was triggered', async function(assert) {
      this.setProperties({
        filters,
        resourceName,
        disabled: false,
      });

      await render(hbs`
        {{polaris-resource-list/filter-control/filter-creator
          filters=filters
          resourceName=resourceName
          disabled=disabled
          onAddFilter=(action (mut wasOnAddFilterCalled) true)
        }}
      `);

      await activatePopover();
      await selectFilterKey(this.get('filters.0.key'));
      selectFilterValue('Bundle');
      await clickAddFilter();

      assert.ok(this.get('wasOnAddFilterCalled'));
      assert.dom('.Polaris-Popover').doesNotExist();
    });

    /**
     * Skipping this test because it's basically
     * a duplicate of the previous one, and it
     * isn't easily testable in Ember-land.
     */
    skip('does not renders FilterValueSelector after add filter button was clicked', async function(assert) {
      this.setProperties({
        filters,
        resourceName,
        disabled: false,
      });

      await render(hbs`
        {{polaris-resource-list/filter-control/filter-creator
          filters=filters
          resourceName=resourceName
          disabled=disabled
          onAddFilter=(action (mut wasOnAddFilterCalled) true)
        }}
      `);

      await activatePopover();
      await selectFilterKey(this.get('filters.0.key'));
      selectFilterValue('Bundle');

      // TODO: assert that a filter value selector is rendered.
      await clickAddFilter();
      // TODO: assert that no filter value selector is rendered.
    });

    /**
     * Skipping this test for similar reasons
     * to the previous one.
     */
    skip('renders Select with no value after add filter button was clicked', async function(assert) {
      this.setProperties({
        filters,
        resourceName,
        disabled: false,
      });

      await render(hbs`
        {{polaris-resource-list/filter-control/filter-creator
          filters=filters
          resourceName=resourceName
          disabled=disabled
          onAddFilter=(action (mut wasOnAddFilterCalled) true)
        }}
      `);

      await activatePopover();
      await selectFilterKey(this.get('filters.0.key'));
      selectFilterValue('Bundle');

      assert.dom('.Polaris-Select select').hasAnyValue();
      await clickAddFilter();
      assert.dom('.Polaris-Select select').hasNoValue();
    });
  }
);
