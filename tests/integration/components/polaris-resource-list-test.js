import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, triggerEvent } from '@ember/test-helpers';
import Component from '@ember/component';
import { computed } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import BulkActionsComponent from '@smile-io/ember-polaris/components/polaris-resource-list/bulk-actions';
import SelectComponent from '@smile-io/ember-polaris/components/polaris-select';

const itemsNoID = [{ url: 'item 1' }, { url: 'item 2' }];
const singleItemNoID = [{ url: 'item 1' }];
const singleItemWithID = [{ id: '1', url: 'item 1' }];

const itemsWithID = [
  { id: '5', name: 'item 1', url: 'www.test.com', title: 'title 1' },
  { id: '6', name: 'item 2', url: 'www.test.com', title: 'title 2' },
  { id: '7', name: 'item 3', url: 'www.test.com', title: 'title 3' },
];
const promotedBulkActions = [
  { content: 'action', onAction() {} },
  { content: 'action 2', onAction() {} },
];
const bulkActions = [
  { content: 'action 3', onAction() {} },
  { content: 'action 4', onAction() {} },
];
const sortOptions = [
  'Product title (A-Z)',
  {
    value: 'PRODUCT_TITLE_DESC',
    label: 'Product title (Z-A)',
  },
  {
    value: 'EXTRA',
    label: 'Disabled Option',
    disabled: true,
  },
];

function idForItem(item) {
  return JSON.stringify(item);
}

const ShallowItemComponent = Component.extend({
  tagName: '',
  layout: hbs`{{item}}`,
});

const CustomMarkupComponent = Component.extend({
  tagName: 'p',
  layout: hbs`{{item.title}}`,
});

const ItemComponent = Component.extend({
  layout: hbs`
    {{#polaris-resource-list/item
      url=item.url
      accessibilityLabel=accessibilityLabel
      itemId=itemId
    }}
      <div>Item {{itemId}}</div>
      <div>{{item.title}}</div>
    {{/polaris-resource-list/item}}
  `,

  accessibilityLabel: computed('item.title', function() {
    return `View details for ${this.get('item.title')}`;
  }).readOnly(),
});

function setUpAttributeCaptureOnComponent(
  testContext,
  componentPath,
  componentClass,
  attributeName
) {
  testContext.owner.register(
    `component:${componentPath}`,
    componentClass.extend({
      didReceiveAttrs() {
        this._super(...arguments);

        testContext.set(attributeName, this.get(attributeName));
      },
    })
  );
}

module('Integration | Component | polaris-resource-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setProperties({
      itemsNoID,
      singleItemNoID,
      singleItemWithID,
      itemsWithID,
      promotedBulkActions,
      bulkActions,
      sortOptions,
      idForItem,
    });

    this.owner.register(
      'component:shallow-item-component',
      ShallowItemComponent
    );
    this.owner.register(
      'component:custom-markup-component',
      CustomMarkupComponent
    );
    this.owner.register('component:item-component', ItemComponent);
  });

  module('itemComponent', function() {
    test('renders list items', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="shallow-item-component"
        }}
      `);
      assert.dom('li').exists({ count: 3 });
    });

    test('renders custom markup', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="custom-markup-component"
        }}
      `);
      assert.dom('li:first-of-type > p').hasText('title 1');
    });
  });

  module('Selectable', function() {
    test('does not render bulk actions if the promotedBulkActions and the bulkActions props are not provided', async function(assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent="item-component"}}
      `);
      assert.dom('[data-test-bulk-actions]').doesNotExist();
    });

    test('does render bulk actions if the promotedBulkActions prop is provided', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="item-component"
          promotedBulkActions=promotedBulkActions
        }}
      `);
      assert.dom('[data-test-bulk-actions]').exists();
    });

    test('renders bulk actions if the bulkActions prop is provided', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="item-component"
          bulkActions=bulkActions
        }}
      `);
      assert.dom('[data-test-bulk-actions]').exists();
    });
  });

  module(
    'hasMoreItems',
    {
      beforeEach() {
        setUpAttributeCaptureOnComponent(
          this,
          'polaris-resource-list/bulk-actions',
          BulkActionsComponent,
          'paginatedSelectAllAction'
        );
      },
    },
    function() {
      test('does not add a prop of paginatedSelectAllAction to BulkActions if omitted', async function(assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          itemComponent="item-component"
          bulkActions=bulkActions
        }}
      `);
        assert.notOk(this.get('paginatedSelectAllAction'));
      });

      test('adds a prop of paginatedSelectAllAction to BulkActions if included', async function(assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          hasMoreItems=true
          itemComponent="item-component"
          bulkActions=bulkActions
        }}
      `);
        assert.ok(this.get('paginatedSelectAllAction'));
      });
    }
  );

  module('resourceName', function() {
    module('resoureName.singular', function() {
      test('renders default singular resource name when resourceName isn’t provided', async function(assert) {
        await render(hbs`
          {{polaris-resource-list
            showHeader=true
            items=singleItemNoID
            itemComponent="item-component"
          }}
        `);
        assert
          .dom('[data-test-id="item-count-text-wrapper"]')
          .hasText('Showing 1 item');
      });

      test('renders the given singular resource name when resourceName is provided', async function(assert) {
        await render(hbs`
          {{polaris-resource-list
            items=singleItemNoID
            itemComponent="item-component"
            resourceName=(hash singular="product" plural="products")
            showHeader=true
          }}
        `);
        assert
          .dom('[data-test-id="item-count-text-wrapper"]')
          .hasText('Showing 1 product');
      });
    });

    module('resoureName.plural', function() {
      test('renders default plural resource name when resourceName isn’t provided', async function(assert) {
        await render(hbs`
          {{polaris-resource-list items=itemsNoID itemComponent="item-component" showHeader=true}}
        `);
        assert
          .dom('[data-test-id="item-count-text-wrapper"]')
          .hasText('Showing 2 items');
      });

      test('renders the given plural resource name when resourceName is provided', async function(assert) {
        await render(hbs`
          {{polaris-resource-list
            items=itemsNoID
            itemComponent="item-component"
            resourceName=(hash singular="product" plural="products")
            showHeader=true
          }}
        `);
        assert
          .dom('[data-test-id="item-count-text-wrapper"]')
          .hasText('Showing 2 products');
      });
    });
  });

  module(
    'bulkActionsAccessibilityLabel',
    {
      beforeEach() {
        setUpAttributeCaptureOnComponent(
          this,
          'polaris-resource-list/bulk-actions',
          BulkActionsComponent,
          'accessibilityLabel'
        );
      },
    },
    function() {
      test('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it isn’t selected', async function(assert) {
        await render(hbs`
        {{polaris-resource-list
          items=singleItemWithID
          itemComponent="item-component"
          bulkActions=bulkActions
        }}
      `);
        assert.equal(this.get('accessibilityLabel'), 'Select item');
      });

      test('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it is selected ', async function(assert) {
        await render(hbs`
        {{polaris-resource-list
          items=singleItemWithID
          itemComponent="item-component"
          bulkActions=bulkActions
          selectedItems=(array "1")
        }}
      `);
        assert.equal(this.get('accessibilityLabel'), 'Deselect item');
      });

      test('provides the BulkActions with the right accessibilityLabel if there’s multiple items and they are all selected', async function(assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="item-component"
          bulkActions=bulkActions
          selectedItems=(array "5" "6" "7")
        }}
      `);
        assert.equal(this.get('accessibilityLabel'), 'Deselect all 3 items');
      });

      test('provides the BulkActions with the right accessibilityLabel if there’s multiple items and some or none are selected', async function(assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="item-component"
          bulkActions=bulkActions
        }}
      `);
        assert.equal(this.get('accessibilityLabel'), 'Select all 3 items');
      });
    }
  );

  module('idForItem()', function() {
    test('generates a key using the index if there’s no idForItem prop and no ID in data', async function(assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsNoID itemComponent="shallow-item-component"}}
      `);
      assert.dom('li:first-of-type').hasAttribute('data-test-item-id', '0');
    });

    test('generates a key using the ID if there’s no idForItem prop but there and ID key in the data', async function(assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent="shallow-item-component"}}
      `);
      assert.dom('li:first-of-type').hasAttribute('data-test-item-id', '5');
    });

    test('generates a key using the idForItem prop callback when one is provided', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          idForItem=(action idForItem)
          items=itemsWithID
          itemComponent="shallow-item-component"
        }}
      `);
      assert
        .dom('li:first-of-type')
        .hasAttribute('data-test-item-id', idForItem(itemsWithID[0]));
    });
  });

  module('onSelectionChange()', function() {
    test('calls onSelectionChange() when an item is clicked', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          selectedItems=(array)
          promotedBulkActions=promotedBulkActions
          itemComponent="item-component"
          onSelectionChange=(action (mut wasOnSelectionChangeCalled) true)
        }}
      `);
      await click(
        '.Polaris-ResourceList-Item:first-of-type [data-test-id="larger-selection-area"]'
      );
      assert.ok(this.get('wasOnSelectionChangeCalled'));
    });
  });

  module('header markup', function() {
    test('renders header markup if the list isn’t selectable but the showHeader prop is true', async function(assert) {
      await render(hbs`
        {{polaris-resource-list showHeader=true items=itemsWithID itemComponent="item-component"}}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('does not render when items is empty', async function(assert) {
      await render(hbs`
        {{polaris-resource-list items=(array) itemComponent="item-component"}}
      `);
      assert.dom('[data-test-id="resource-list-header"]').doesNotExist();
    });

    test('renders when sort options are given', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          sortOptions=sortOptions
          items=itemsWithID
          itemComponent="item-component"
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('renders when bulkActions are given', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          bulkActions=bulkActions
          items=itemsWithID
          itemComponent="item-component"
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('renders when promotedBulkActions are given', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          promotedBulkActions=promotedBulkActions
          items=itemsWithID
          itemComponent="item-component"
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('does not render when sort options, bulkActions and promotedBulkActions are not given', async function(assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent="item-component"}}
      `);
      assert.dom('[data-test-id="resource-list-header"]').doesNotExist();
    });
  });

  module('filterControl', function() {
    test('renders when exist', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          itemComponent="shallow-item-component"
          filterControl=(component "wrapper-element" id="test123")
        }}
      `);
      assert.dom('#test123').exists();
    });
  });

  module('emptySearchResult', function() {
    test('renders when filterControl exists and items is empty', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=(array)
          itemComponent="shallow-item-component"
          filterControl="wrapper-element"
        }}
      `);
      assert.dom('.Polaris-EmptySearchResult').exists();
    });

    test('does not render when filterControl does not exist', async function(assert) {
      await render(hbs`
        {{polaris-resource-list items=(array) itemComponent="shallow-item-component"}}
      `);
      assert.dom('.Polaris-EmptySearchResult').doesNotExist();
    });

    test('does not render when items is not empty', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          itemComponent="shallow-item-component"
          filterControl=(component "wrapper-element" id="test123")
        }}
      `);
      assert.dom('.Polaris-EmptySearchResult').doesNotExist();
    });
  });

  module('Sorting', function() {
    test('does not render a sort select if sortOptions aren’t provided', async function(assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent="item-component"}}
      `);
      assert.dom('.Polaris-Select').doesNotExist();
    });

    test('renders a sort select if sortOptions are provided', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          sortOptions=sortOptions
          itemComponent="item-component"
        }}
      `);
      assert.dom('.Polaris-Select').exists();
    });

    module(
      'sortOptions',
      {
        beforeEach() {
          setUpAttributeCaptureOnComponent(
            this,
            'polaris-select',
            SelectComponent,
            'options'
          );
        },
      },
      function() {
        test('passes a sortOptions to the Select options', async function(assert) {
          await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            sortOptions=sortOptions
            itemComponent="item-component"
          }}
        `);
          assert.deepEqual(this.get('options'), sortOptions);
        });
      }
    );

    module(
      'sortValue',
      {
        beforeEach() {
          setUpAttributeCaptureOnComponent(
            this,
            'polaris-select',
            SelectComponent,
            'value'
          );
        },
      },
      function() {
        test('passes a sortValue to the Select value', async function(assert) {
          await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            sortOptions=sortOptions
            sortValue="sortValue"
            onSortChange=(action (mut dummy))
            itemComponent="item-component"
          }}
        `);
          assert.equal(this.get('value'), 'sortValue');
        });
      }
    );

    module('onSortChange', function() {
      test('calls onSortChange when the Sort Select changes', async function(assert) {
        await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            onSortChange=(action (mut sortChangeParam))
            sortOptions=sortOptions
            itemComponent="item-component"
          }}
        `);
        find('.Polaris-Select select').value = 'PRODUCT_TITLE_DESC';
        await triggerEvent('.Polaris-Select select', 'change');
        assert.equal(this.get('sortChangeParam'), 'PRODUCT_TITLE_DESC');
      });
    });
  });

  module('loading', function() {
    test('renders a spinner', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          sortOptions=sortOptions
          itemComponent="item-component"
          loading=true
        }}
      `);

      // Checking for spinner container here because currently
      // our tests can't render SVGs so the spinner doesn't appear.
      assert.dom('.Polaris-ResourceList__SpinnerContainer').exists();
    });
  });
});
