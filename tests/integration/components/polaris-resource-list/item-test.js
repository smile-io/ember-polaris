import { hbs } from 'ember-cli-htmlbars';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

const mockDefaultContext = {
  selectMode: false,
  selectable: false,
  selectedItems: [],
  onSelectionChange() {},
  resourceName: {
    singular: 'item',
    plural: 'items,',
  },
};

const itemId = 'itemId';
const selectedItemId = 'selectedId';
const accessibilityLabel = 'link anchor aria-label';
const shortcutActions = [{ text: 'actions', onAction: () => {} }];

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

const url = '#test-link';
const ariaLabel = 'View Item';
const mediaSelector = '[data-test-id="media"]';
const shorcutActionsSelector = '.Polaris-ResourceList-Item__Actions';

module('Integration | Component | polaris-resource-list/item', function (
  hooks
) {
  setupRenderingTest(hooks);

  let origWindowOpen = window.open;

  hooks.beforeEach(function () {
    this.setProperties({
      mockDefaultContext,
      mockSelectableContext: getMockSelectableContext(this),
      mockSelectModeContext: getMockSelectModeContext(this),
      mockLoadingContext: getMockLoadingContext(this),
    });

    window.open = (...params) => this.set('windowOpenParams', params);
  });

  hooks.afterEach(function () {
    window.open = origWindowOpen;
  });

  module('accessibilityLabel', function () {
    test('is used on the <UnstyledLink /> for the aria-label attribute', async function (assert) {
      this.setProperties({ accessibilityLabel, itemId });
      await render(hbs`
        {{#polaris-resource-list/provider value=mockDefaultContext}}
          {{polaris-resource-list/item
            accessibilityLabel=accessibilityLabel
            itemId=itemId
            url="https://shopify.com"
          }}
        {{/polaris-resource-list/provider}}
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
    function () {
      test('does not render an <UnstyledLink /> by default', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId="itemId"
              accessibilityLabel=ariaLabel
              onClick=(action (mut dummy))
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom('a[data-polaris-unstyled]').doesNotExist();
      });

      test('renders an <UnstyledLink />', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId="itemId"
              url=url
              accessibilityLabel=ariaLabel
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom('a[data-polaris-unstyled]').exists();
      });

      test('renders an <UnstyledLink /> with url', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId="itemId"
              url=url
              accessibilityLabel=ariaLabel
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom('a[data-polaris-unstyled]').hasAttribute('href', url);
      });

      test('renders an <UnstyledLink /> with an aria-label of ariaLabel', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId="itemId"
              url=url
              accessibilityLabel=ariaLabel
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert
          .dom('a[data-polaris-unstyled]')
          .hasAttribute('aria-label', ariaLabel);
      });

      test('adds a data-href to the wrapper element', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId="itemId"
              url=url
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert
          .dom('[data-test-id="item-wrapper"]')
          .hasAttribute('data-href', url);
      });
    }
  );

  module('itemId', function () {
    test('is used on the content node and for the description of a link', async function (assert) {
      this.setProperties({ itemId, ariaLabel });
      await render(hbs`
        {{#polaris-resource-list/provider value=mockDefaultContext}}
          {{polaris-resource-list/item
            itemId=itemId
            url="https://shopify.com"
            accessibilityLabel=ariaLabel
          }}
        {{/polaris-resource-list/provider}}
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
    function () {
      test('calls onClick when clicking on the item when onClick exists', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              accessibilityLabel=ariaLabel
              onClick=(action (mut passedItemId))
            }}
          {{/polaris-resource-list/provider}}
        `);

        await click('[data-test-id="item-wrapper"]');
        assert.equal(this.get('passedItemId'), itemId);
      });

      test('calls onClick when clicking on the item when both onClick and url exist', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              accessibilityLabel=ariaLabel
              onClick=(action (mut passedItemId))
            }}
          {{/polaris-resource-list/provider}}
        `);

        await click('[data-test-id="item-wrapper"]');
        assert.equal(this.get('passedItemId'), itemId);
      });

      test('calls window.open on metaKey + click', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              accessibilityLabel=ariaLabel
            }}
          {{/polaris-resource-list/provider}}
        `);

        await click('[data-test-id="item-wrapper"]', { metaKey: true });
        assert.deepEqual(this.get('windowOpenParams'), [url, '_blank']);
      });

      test('calls window.open on ctrlKey + click', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              accessibilityLabel=ariaLabel
            }}
          {{/polaris-resource-list/provider}}
        `);

        await click('[data-test-id="item-wrapper"]', { ctrlKey: true });
        assert.deepEqual(this.get('windowOpenParams'), [url, '_blank']);
      });
    }
  );

  module(
    'Selectable',
    {
      beforeEach() {
        this.setProperties({ itemId, url });
      },
    },
    function () {
      test("does not call the Item 'onClick' when clicking the 'LargerSelectionArea'", async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockSelectableContext}}
            {{polaris-resource-list/item
              itemId=itemId
              onClick=(action (mut wasOnClickCalled) true)
            }}
          {{/polaris-resource-list/provider}}
        `);

        await click('[data-test-id="larger-selection-area"]');
        assert.notOk(this.get('wasOnClickCalled'));
      });

      test('calls onSelectionChange with the id of the item when clicking the LargerSelectionArea', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockSelectableContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
            }}
          {{/polaris-resource-list/provider}}
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
    function () {
      test('does not call onClick when clicking the item', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockSelectModeContext}}
            {{polaris-resource-list/item
              itemId=itemId
              accessibilityLabel=ariaLabel
              onClick=(action (mut wasOnClickCalled) true)
            }}
          {{/polaris-resource-list/provider}}
        `);

        await click('[data-test-id="item-wrapper"]');
        assert.notOk(this.get('wasOnClickCalled'));
      });

      /**
       * Skipping this test because the React version
       * seems to be passing erroneously...
       */
      skip('calls onSelectionChange with the id of the item even if url or onClick is present', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockSelectableContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              accessibilityLabel=ariaLabel
              onClick=(action (mut dummy))
             }}
           {{/polaris-resource-list/provider}}
         `);

        await click('[data-test-id="item-wrapper"]');
        assert.deepEqual(this.get('passedOnSelectionChangeParams'), [
          true,
          itemId,
        ]);
      });

      test('renders a checked Checkbox if the item is in the selectedItems context', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockSelectableContext}}
            {{polaris-resource-list/item
              itemId=selectedItemId
              url=url
            }}
          {{/polaris-resource-list/provider}}
        `);
        assert
          .dom('[data-test-checkbox-input]')
          .hasAttribute('data-test-checkbox-input-checked');
      });

      test('does not call window.open when clicking the item with metaKey', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockSelectModeContext}}
            {{polaris-resource-list/item
              itemId=selectedItemId
              url=url
            }}
          {{/polaris-resource-list/provider}}
        `);
        await click('[data-test-id="item-wrapper"]', { metaKey: true });
        assert.notOk(this.get('windowOpenParams'));
      });

      test('does not call window.open when clicking the item with ctrlKey', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockSelectModeContext}}
            {{polaris-resource-list/item
              itemId=selectedItemId
              url=url
            }}
          {{/polaris-resource-list/provider}}
        `);
        await click('[data-test-id="item-wrapper"]', { ctrlKey: true });
        assert.notOk(this.get('windowOpenParams'));
      });
    }
  );

  module(
    'media',
    {
      beforeEach() {
        this.setProperties({ itemId, selectedItemId, url });
      },
    },
    function () {
      test('does not include media if not provided', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom('[data-test-id="media"]').doesNotExist();
      });

      test('renders a disabled checked Checkbox if `loading` context is true', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockLoadingContext}}
            {{polaris-resource-list/item
              id=selectedItemId
              url=url
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom('[data-test-checkbox-input]').hasAttribute('disabled');
      });

      test('includes an <Avatar /> if one is provided', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              media=(component "polaris-avatar")
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom(`${mediaSelector} > .Polaris-Avatar`).exists();
      });

      test('includes a <Thumbnail /> if one is provided', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              media=(component "polaris-thumbnail")
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom(`${mediaSelector} > .Polaris-Thumbnail`).exists();
      });
    }
  );

  module(
    'shortcutActions',
    {
      beforeEach() {
        this.setProperties({ itemId, url, shortcutActions });
      },
    },
    function () {
      test('does not render shortcut actions if none are provided', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom(shorcutActionsSelector).doesNotExist();
      });

      test('renders shortcut actions when some are provided', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              shortcutActions=shortcutActions
            }}
          {{/polaris-resource-list/provider}}
        `);

        assert.dom(shorcutActionsSelector).exists();
      });

      test('renders persistent shortcut actions if persistActions is true', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockDefaultContext}}
            {{polaris-resource-list/item
              persistActions=true
              itemId=itemId
              url=url
              shortcutActions=shortcutActions
            }}
          {{/polaris-resource-list/provider}}
        `);

        // Checking the 'Disclosure' class here because the react implementation
        // tests for ButtonGroup in this case, but our implementation has a
        // ButtonGroup rendered either way, whereas the 'Disclosure' class only
        // gets applied if `persistActions` is `true` so it's more accurate to
        // check the class.
        assert.dom('.Polaris-ResourceList-Item__Disclosure').exists();
      });

      test('does not render while loading', async function (assert) {
        await render(hbs`
          {{#polaris-resource-list/provider value=mockLoadingContext}}
            {{polaris-resource-list/item
              itemId=itemId
              url=url
              shortcutActions=shortcutActions
              persistActions=true
            }}
          {{/polaris-resource-list/provider}}
        `);
        assert.dom('[data-test-button-group]').doesNotExist();
      });
    }
  );

  module(
    'accessibleMarkup',
    {
      beforeEach() {
        this.setProperties({ itemId, url, shortcutActions });
      },
    },
    function () {
      test('renders with a tab index of -1 when loading is true', async function (assert) {
        await render(hbs`
        {{#polaris-resource-list/provider value=mockLoadingContext}}
          {{polaris-resource-list/item
            itemId=itemId
            url=url
            shortcutActions=shortcutActions
            persistActions=true
          }}
        {{/polaris-resource-list/provider}}
      `);

        assert.dom('[data-polaris-unstyled]').hasAttribute('tabindex', '-1');
      });

      test('renders with a tab index of 0 when loading is false', async function (assert) {
        await render(hbs`
        {{#polaris-resource-list/provider value=mockDefaultContext}}
          {{polaris-resource-list/item
            itemId=itemId
            url=url
            shortcutActions=shortcutActions
            persistActions=true
          }}
        {{/polaris-resource-list/provider}}
      `);
        assert.dom('[data-polaris-unstyled]').hasAttribute('tabindex', '0');
      });
    }
  );
});
