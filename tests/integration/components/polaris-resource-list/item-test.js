import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { computed } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import ContextService from '@smile-io/ember-polaris/services/polaris-resource-list/context';

ContextService.reopen({
  selectMode: false,
  selectable: false,

  selectedItems: computed(function() {
    return [];
  }),

  resourceName: computed(function() {
    return {
      singular: 'item',
      plural: 'items,',
    };
  }),

  onSelectionChange() {},
});

const itemId = 'itemId';
const selectedItemId = 'selectedId';
const accessibilityLabel = 'link anchor aria-label';

function getMockSelectableContext(testContext) {
  return {
    selectedItems: [selectedItemId],
    selectMode: false,
    selectable: true,
    onSelectionChange: (...invocationArgs) => {
      testContext.set('passedOnSelectionChangeParams', invocationArgs);
    },
  };
}

function getMockSelectModeContext(testContext) {
  return {
    selectedItems: [selectedItemId],
    selectMode: true,
    selectable: true,
    onSelectionChange: (...invocationArgs) => {
      testContext.set('passedOnSelectionChangeParams', invocationArgs);
    },
  };
}

function getMockLoadingContext(testContext) {
  return {
    selectedItems: [selectedItemId],
    selectMode: true,
    selectable: true,
    loading: true,
    onSelectionChange: (...invocationArgs) => {
      testContext.set('passedOnSelectionChangeParams', invocationArgs);
    },
  };
}

function setContextProperties(testContext, properties) {
  let context = testContext.owner.lookup(
    'service:polaris-resource-list/context'
  );
  context.setProperties(properties);
}

const url = '#test-link';
const ariaLabel = 'View Item';

module('Integration | Component | polaris-resource-list/item', function(hooks) {
  setupRenderingTest(hooks);

  module('accessibilityLabel', function() {
    test('is used on the UnstyledLink for the aria-label attribute', async function(assert) {
      this.setProperties({ accessibilityLabel, itemId });
      await render(hbs`
        {{polaris-resource-list/item
          accessibilityLabel=accessibilityLabel
          id=itemId
          url="https://shopify.com"
        }}
      `);

      assert
        .dom('a[data-polaris-unstyled]')
        .hasAttribute('aria-label', accessibilityLabel);
    });
  });

  module(
    'url',
    {
      beforeEach() {
        this.setProperties({ url, ariaLabel });
      },
    },
    function() {
      test('does not renders a UnstyledLink by default', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id="itemId"
            accessibilityLabel=ariaLabel
            onClick=(action (mut dummy))
          }}
        `);

        assert.dom('a[data-polaris-unstyled]').doesNotExist();
      });

      test('renders a UnstyledLink', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id="itemId"
            url=url
            accessibilityLabel=ariaLabel
          }}
        `);

        assert.dom('a[data-polaris-unstyled]').exists();
      });

      test('renders a UnstyledLink with url', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id="itemId"
            url=url
            accessibilityLabel=ariaLabel
          }}
        `);

        assert.dom('a[data-polaris-unstyled]').hasAttribute('href', url);
      });

      test(`renders a UnstyledLink with an aria-label of ${ariaLabel}`, async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id="itemId"
            url=url
            accessibilityLabel=ariaLabel
          }}
        `);

        assert
          .dom('a[data-polaris-unstyled]')
          .hasAttribute('aria-label', ariaLabel);
      });
    }
  );

  module('id', function() {
    test('is used on the content node and for the description of a link', async function(assert) {
      this.setProperties({ itemId, ariaLabel });
      await render(hbs`
        {{polaris-resource-list/item
          id=itemId
          url="https://shopify.com"
          accessibilityLabel=ariaLabel
        }}
      `);

      assert.dom('[data-test-id="item-content"]').hasAttribute('id', itemId);
      assert
        .dom('a[data-polaris-unstyled]')
        .hasAttribute('aria-describedby', itemId);
    });
  });

  module(
    'onClick()',
    {
      beforeEach() {
        this.setProperties({ itemId, ariaLabel, url });
      },
    },
    function() {
      test('calls onClick when clicking on the item when onClick exist', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id=itemId
            accessibilityLabel=ariaLabel
            onClick=(action (mut passedItemId))
          }}
        `);

        await click('[data-test-id="item-wrapper"]');
        assert.equal(this.get('passedItemId'), itemId);
      });

      test('calls onClick when clicking on the item when both onClick and url exist', async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id=itemId
            url=url
            accessibilityLabel=ariaLabel
            onClick=(action (mut passedItemId))
          }}
        `);

        await click('[data-test-id="item-wrapper"]');
        assert.equal(this.get('passedItemId'), itemId);
      });
    }
  );

  module(
    'Selectable',
    {
      beforeEach() {
        this.setProperties({ itemId, url });

        setContextProperties(this, getMockSelectableContext(this));
      },
    },
    function() {
      test("it should not call the Item 'onClick' when clicking the 'LargerSelectionArea'", async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id=itemId
            onClick=(action (mut wasOnClickCalled) true)
          }}
        `);

        await click('[data-test-id="larger-selection-area"]');
        assert.notOk(this.get('wasOnClickCalled'));
      });

      test("it should call 'onSelectionChange' with the id of the item when clicking the 'LargerSelectionArea'", async function(assert) {
        await render(hbs`
          {{polaris-resource-list/item
            id=itemId
            url=url
          }}
        `);

        await click('[data-test-id="larger-selection-area"]');
        assert.deepEqual(this.get('passedOnSelectionChangeParams'), [
          true,
          itemId,
        ]);
      });
    }
  );

  module(
    'SelectMode',
    {
      beforeEach() {
        this.setProperties({ itemId, selectedItemId, ariaLabel, url });
      },
    },
    function() {
      test("it should not call 'onClick' when clicking the item", async function(assert) {
        setContextProperties(this, getMockSelectModeContext(this));
        await render(hbs`
        {{polaris-resource-list/item
          id=itemId
          accessibilityLabel=ariaLabel
          onClick=(action (mut wasOnClickCalled) true)
        }}
      `);

        await click('[data-test-id="item-wrapper"]');
        assert.notOk(this.get('wasOnClickCalled'));
      });

      /*
       * Skipping this test because the React version
       * seems to be passing erroneously...
       */
      skip("it should call 'onSelectionChange' with the id of the item even if url or onClick is present", async function(assert) {
        setContextProperties(this, getMockSelectableContext(this));
        await render(hbs`
        {{polaris-resource-list/item
          id=itemId
          url=url
          accessibilityLabel=ariaLabel
          onClick=(action (mut dummy))
         }}
      `);

        await click('[data-test-id="item-wrapper"]');
        assert.deepEqual(this.get('passedOnSelectionChangeParams'), [
          true,
          itemId,
        ]);
      });

      test("should render a checked Checkbox if the item is in the 'selectedItems' context", async function(assert) {
        setContextProperties(this, getMockSelectableContext(this));
        await render(hbs`
        {{polaris-resource-list/item
          id=selectedItemId
          url=url
        }}
      `);
        assert
          .dom('[data-test-checkbox-input]')
          .hasAttribute('data-test-checkbox-input-checked');
      });

      test("renders a disabled checked Checkbox if 'loading' context is true", async function(assert) {
        setContextProperties(this, getMockLoadingContext(this));
        await render(hbs`
        {{polaris-resource-list/item
          id=selectedItemId
          url=url
        }}
      `);
        assert.dom('[data-test-checkbox-input]').hasAttribute('disabled');
      });
    }
  );
});
