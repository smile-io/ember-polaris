import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  find,
  findAll,
  triggerEvent,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import FilterValueSelectorComponent, {
  FilterType,
} from '@smile-io/ember-polaris/components/polaris-resource-list/filter-control/filter-value-selector';

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

  willDestroyElement() {
    filterValueSelector = null;
    this._super(...arguments);
  },
});

async function activatePopover() {
  await click('.Polaris-Button[data-test-id="filter-activator"]');
}

function findFilterKeySelect() {
  return find('.Polaris-Select select');
}

async function selectFilterKey(filterKey) {
  find('.Polaris-Select select').value = filterKey;
  await triggerEvent('.Polaris-Select select', 'change');
}

async function selectFilterValue(filterValue) {
  // This can update either a select or text field value...
  const selectFilterControlSelector =
    '[data-test-select="filter"], [data-test-text-field-input]';
  find(selectFilterControlSelector).value = filterValue;
  await triggerEvent(selectFilterControlSelector, 'change');
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
      await selectFilterKey(filters[0].key);
      await selectFilterValue('Bundle');
      await clickAddFilter();

      assert.ok(this.get('wasOnAddFilterCalled'));
      assert.dom('.Polaris-Popover').doesNotExist();
    });

    test('does not renders FilterValueSelector after add filter button was clicked', async function(assert) {
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
      await selectFilterKey(filters[0].key);
      await selectFilterValue('Bundle');

      assert.ok(filterValueSelector);
      await clickAddFilter();
      assert.notOk(filterValueSelector);
    });

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
      await selectFilterKey(filters[0].key);
      await selectFilterValue('Bundle');

      assert.dom('[data-test-select="filter"]').hasAnyValue();
      await clickAddFilter();
      assert.dom('[data-test-select="filter"]').hasNoValue();
    });

    module('filters', function() {
      test('has the correct options prop when popover is active', async function(assert) {
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

        assert.deepEqual(
          findAll('option:not([disabled])', findFilterKeySelect()).map(
            (option) => {
              return {
                value: option.getAttribute('value'),
                label: option.textContent.trim(),
              };
            }
          ),
          [
            {
              value: filters[0].key,
              label: filters[0].label,
            },
            {
              value: filters[1].key,
              label: filters[1].label,
            },
            {
              value: filters[2].key,
              label: filters[2].label,
            },
          ]
        );
      });
    });

    module('filter value selector', function() {
      test('does not render by default', async function(assert) {
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

        assert.notOk(filterValueSelector);
      });

      test('updates FilterValueSelector when user selects a filter key', async function(assert) {
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
        await selectFilterKey(filters[1].key);

        assert.deepEqual(filterValueSelector.get('filter'), filters[1]);
        assert.equal(filterValueSelector.get('value'), undefined);
      });

      test('updates value correctly when user selects a filter value', async function(assert) {
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
        await selectFilterKey(filters[0].key);
        await selectFilterValue('Bundle');

        assert.dom('[data-test-select="filter"]').hasValue('Bundle');
      });

      test('updates FilterValueSelector when filter key is updated to existing operator key', async function(assert) {
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

        const newOperatorKey = 'times_used_max';

        await activatePopover();
        await selectFilterKey(filters[2].key);
        await selectFilterValue('Bundle');

        filterValueSelector.onFilterKeyChange(newOperatorKey);

        assert.equal(filterValueSelector.get('filterKey'), newOperatorKey);
      });
    });

    module('filter add button', function() {
      test('is enabled when filter key and filter value are both selected', async function(assert) {
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
        await selectFilterKey(filters[0].key);
        await selectFilterValue('Bundle');

        assert
          .dom('[data-test-id="add-filter"]')
          .doesNotHaveAttribute('disabled');
      });

      test('is disabled when filter key and value are not selected', async function(assert) {
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
        await selectFilterKey(filters[0].key);

        assert.dom('[data-test-id="add-filter"]').hasAttribute('disabled');
      });

      test('is disabled when filter value is an empty string', async function(assert) {
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
        await selectFilterKey(filters[0].key);
        await selectFilterValue('');

        assert.dom('[data-test-id="add-filter"]').hasAttribute('disabled');
      });
    });
  }
);
