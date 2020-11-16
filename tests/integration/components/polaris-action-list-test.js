import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import { capitalize } from '@ember/string';
import { matchesIcon } from '../../helpers/matches-icon';

const actionListSelector = '[data-test-action-list]';
const actionListSectionSelector = '[data-test-action-list-section]';
const actionListSectionWrapperSelector =
  '[data-test-action-list-section-wrapper]';
const actionListSectionActionsSelector =
  '[data-test-action-list-section-actions]';
const actionListSectionTitleSelector = '[data-test-action-list-section-title]';
const actionListItemSelector = '[data-test-action-list-item]';
const actionListItemButtonSelector = '[data-test-action-list-item-button]';
const actionListItemLinkSelector = '[data-test-action-list-item-link]';
const actionListItemContentSelector = '[data-test-action-list-item-content]';
const actionListItemTextSelector = '[data-test-action-list-item-text]';
const actionListItemPrefixSelector = '[data-test-action-list-item-prefix]';
const actionListItemSuffixSelector = '[data-test-action-list-item-suffix]';

module('Integration | Component | polaris action list', function (hooks) {
  setupRenderingTest(hooks);

  module('HTML rendered', function () {
    test('it renders correct HTML', async function (assert) {
      await render(hbs`
        <PolarisActionList
          @actionRole={{this.actionRole}}
          @items={{array
            (hash text="This is the first item")
            (hash text="This is item number two")
          }}
        />
      `);

      assert
        .dom(actionListSelector)
        .exists({ count: 1 }, 'renders one action list')
        .hasTagName('div', 'action list renders as a div')
        .hasClass('Polaris-ActionList', 'action list has correct CSS class');
      assert
        .dom(actionListSectionSelector)
        .doesNotExist('does not nest items in section');
      assert
        .dom(actionListSectionWrapperSelector)
        .hasClass(
          'Polaris-ActionList__Section--withoutTitle',
          'section wrapper has correct CSS class'
        );
      assert
        .dom(
          buildNestedSelector(
            actionListSelector,
            actionListSectionWrapperSelector,
            actionListSectionActionsSelector,
            actionListItemSelector
          )
        )
        .exists({ count: 2 }, 'renders 2 action list items');
      assert
        .dom(actionListSectionTitleSelector)
        .doesNotExist('does not render a section title');
      assert
        .dom(actionListSectionActionsSelector)
        .hasClass(
          'Polaris-ActionList__Actions',
          'section actions has correct CSS class'
        )
        .doesNotHaveAttribute(
          'role',
          'section actions does not have role attribute'
        );
      assert
        .dom(actionListItemSelector)
        .doesNotHaveAttribute(
          'role',
          'action list item does not have role attribute'
        )
        .doesNotHaveAria(
          'aria-selected',
          'action list item does not have aria-selected attribue'
        );

      this.set('actionRole', 'option');
      assert
        .dom(actionListSectionActionsSelector)
        .hasAttribute(
          'role',
          'presentation',
          'section actions has role attribute `presentation` when @actionRole is `option`'
        );
      assert
        .dom(actionListItemSelector)
        .hasAttribute(
          'role',
          'option',
          'action list item has role attribute `option`'
        );
    });

    test('it renders correct HTML with sections', async function (assert) {
      this.set('sections', [
        {
          title: 'Section 1',
          items: [{ text: 'Section 1 item 1' }, { text: 'Section 1 item 2' }],
        },
        { items: [{ text: 'Section 2 item' }] },
      ]);

      await render(hbs`
        <PolarisActionList @sections={{this.sections}} @items={{this.items}} />
      `);

      assert
        .dom(actionListSelector)
        .hasTagName('ul', 'action list renders as a ul');
      assert
        .dom(buildNestedSelector(actionListSelector, actionListSectionSelector))
        .exists(
          { count: 2 },
          'with no items & 2 sections - renders 2 sections'
        );
      assert
        .dom(
          buildNestedSelector(
            `${actionListSectionSelector}:nth-child(1)`,
            actionListSectionWrapperSelector
          )
        )
        .hasNoClass(
          'Polaris-ActionList__Section--withoutTitle',
          'section with title - has no section wrapper with `Polaris-ActionList__Section--withoutTitle` class'
        );
      assert
        .dom(actionListSectionTitleSelector)
        .exists('section with title - renders the section title')
        .hasClass(
          'Polaris-ActionList__Title',
          'section with title - has `Polaris-ActionList__Title` class'
        )
        .hasText('Section 1', 'section with title - has correct text');

      this.set('items', [{ text: 'Only item' }]);

      assert
        .dom(buildNestedSelector(actionListSelector, actionListSectionSelector))
        .exists(
          { count: 3 },
          'with one item & 2 sections - renders 3 sections'
        );
    });

    test('it renders button items HTML correctly', async function (assert) {
      this.handleBubbledActions = () =>
        assert.notOk('click event does not bubble');
      this.set('item', {
        text: 'My item',
      });

      await render(hbs`
        {{!-- template-lint-disable no-invalid-interactive--}}
        <div {{on "click" this.handleBubbledActions}}>
          <PolarisActionList @items={{array this.item}} />
        </div>
      `);

      assert
        .dom(
          buildNestedSelector(
            actionListItemButtonSelector,
            actionListItemContentSelector,
            actionListItemTextSelector
          )
        )
        .hasText(this.item.text, 'item has correct text');

      this.set('item.accessibilityLabel', 'accessibility');

      assert
        .dom(actionListItemButtonSelector)
        .hasAria(
          'label',
          this.item.accessibilityLabel,
          'item with accessibilityLabel - applies aria-label to button'
        );

      this.set('item.active', true);

      assert
        .dom(actionListItemSelector)
        .hasAria(
          'selected',
          'true',
          'with active item - applies aria-selected to item'
        );
      assert
        .dom(actionListItemButtonSelector)
        .hasClass(
          'Polaris-ActionList--active',
          'with active item - item button has `Polaris-ActionList--active` class'
        );

      this.set('item.badge', {
        status: 'success',
        content: 'Badge content',
      });

      assert
        .dom(
          buildNestedSelector(
            actionListItemButtonSelector,
            actionListItemContentSelector,
            actionListItemSuffixSelector
          )
        )
        .hasTextContaining(
          this.item.badge.content,
          'item with badge - has correct badge text'
        );
      assert
        .dom('[data-test-badge]')
        .hasClass(
          `Polaris-Badge--status${capitalize(this.item.badge.status)}`,
          'item with badge - has correct badge status'
        );

      this.set('item.destructive', true);

      assert
        .dom(actionListItemButtonSelector)
        .hasClass(
          'Polaris-ActionList--destructive',
          'with destructive item - item button has `Polaris-ActionList--destructive` class'
        );

      this.set('item.disabled', true);

      assert
        .dom(actionListItemButtonSelector)
        .hasClass(
          'Polaris-ActionList--disabled',
          'with disabled item - item button has `Polaris-ActionList--disabled` class'
        )
        .hasAttribute(
          'disabled',
          '',
          'with disabled item - item button is disabled'
        );

      this.setProperties({
        'item.ellipsis': true,
        'item.helpText': 'My item help text',
      });

      assert
        .dom(
          buildNestedSelector(
            actionListItemButtonSelector,
            actionListItemContentSelector,
            actionListItemTextSelector,
            'div',
            'div'
          )
        )
        .hasText(
          `${this.item.text}...`,
          'with helpText & ellipsis - item has correct text'
        );
      assert
        .dom(
          buildNestedSelector(
            actionListItemButtonSelector,
            actionListItemContentSelector,
            actionListItemTextSelector,
            'div',
            '[data-test-text-style]'
          )
        )
        .hasText(
          this.item.helpText,
          'with helpText & ellipsis - renders helpText'
        )
        .hasClass(
          'Polaris-TextStyle--variationSubdued',
          'with helpText & ellipsis - renders helpText with subdued class'
        );

      this.set('item.image', 'image-test');

      assert
        .dom(
          buildNestedSelector(
            actionListItemButtonSelector,
            actionListItemContentSelector,
            actionListItemPrefixSelector
          )
        )
        .exists('item with image - renders image as prefix')
        .hasAttribute(
          'role',
          'presentation',
          'item with image - image prefix has attribute `role`'
        )
        .hasClass(
          'Polaris-ActionList__Prefix',
          'item with image - image prefix has `Polaris-ActionList__Prefix` class'
        )
        .hasAttribute(
          'style',
          `background-image: url(${this.item.image})`,
          'item with image - image prefix has correct style attribute'
        );

      this.set('item.icon', 'ExportMinor');

      assert.ok(
        matchesIcon(
          buildNestedSelector(
            actionListItemButtonSelector,
            actionListItemContentSelector,
            actionListItemPrefixSelector,
            '[data-test-icon]'
          ),
          this.item.icon
        ),
        'item with image & icon - renders icon as prefix'
      );

      this.set('item.prefix', 'My item prefix');

      assert
        .dom(
          buildNestedSelector(
            actionListItemButtonSelector,
            actionListItemContentSelector,
            actionListItemPrefixSelector
          )
        )
        .hasText(
          this.item.prefix,
          'item with image & icon & prefix - renders the @prefix'
        );

      this.set('item.onAction', () => {
        assert.ok(true, "fires item's onAction");
      });

      await click(actionListItemButtonSelector);
    });

    test('it renders anchor items HTML correctly', async function (assert) {
      this.handleBubbledActions = () =>
        assert.notOk('click event does not bubble');
      this.set('item', {
        text: 'My item',
        url: '#google.com',
      });

      await render(hbs`
        {{!-- template-lint-disable no-invalid-interactive--}}
        <div {{on "click" this.handleBubbledActions}}>
          <PolarisActionList @items={{array this.item}} />
        </div>
      `);

      assert
        .dom(
          buildNestedSelector(
            actionListItemLinkSelector,
            actionListItemContentSelector,
            actionListItemTextSelector
          )
        )
        .hasText(this.item.text, 'item has correct text');
      assert
        .dom(actionListItemLinkSelector)
        .hasAttribute('href', this.item.url, 'item has correct href');
      assert.dom(actionListItemContentSelector).exists('renders item content');

      this.set('item.accessibilityLabel', 'accessibility');
      assert
        .dom(actionListItemLinkSelector)
        .hasAria(
          'label',
          this.item.accessibilityLabel,
          'item with accessibilityLabel - applies aria-label to anchor'
        );

      this.set('item.active', true);

      assert
        .dom(actionListItemSelector)
        .hasAria(
          'selected',
          'true',
          'with active item - applies aria-selected to item'
        );
      assert
        .dom(actionListItemLinkSelector)
        .hasClass(
          'Polaris-ActionList--active',
          'with active item - item anchor has `Polaris-ActionList--active` class'
        );

      this.set('item.destructive', true);

      assert
        .dom(actionListItemLinkSelector)
        .hasClass(
          'Polaris-ActionList--destructive',
          'with destructive item - item anchor has `Polaris-ActionList--destructive` class'
        );

      this.set('item.disabled', true);

      assert
        .dom(actionListItemLinkSelector)
        .hasClass(
          'Polaris-ActionList--disabled',
          'with disabled item - item anchor has `Polaris-ActionList--disabled` class'
        );

      this.set('item.onAction', () => {
        assert.ok(true, "fires item's onAction");
      });

      await click(actionListItemLinkSelector);
    });

    module('newDesignLanguage', function () {
      test('it supports newDesignLanguage', async function (assert) {
        await render(
          hbs`<PolarisActionList
            @items={{array (hash text="Add discount")}}
            @sections={{array (hash items=(array (hash text="Section")))}}
          />`
        );

        assert
          .dom(actionListSelector)
          .doesNotHaveClass(
            'Polaris-ActionList--newDesignLanguage',
            'when newDesignLanguage is false does not add --newDesignLanguage class'
          );
        assert
          .dom(actionListItemButtonSelector)
          .doesNotHaveClass(
            'Polaris-ActionList--newDesignLanguage',
            'when newDesignLanguage is false does not add --newDesignLanguage class'
          );
        assert
          .dom(actionListSectionActionsSelector)
          .doesNotHaveClass(
            'Polaris-ActionList--newDesignLanguage',
            'when newDesignLanguage is false does not add --newDesignLanguage class'
          );

        this.appProviderService = this.owner.lookup(
          'service:polaris-app-provider'
        );
        this.appProviderService.features = { newDesignLanguage: true };

        await settled();
        assert
          .dom(actionListSelector)
          .hasClass(
            'Polaris-ActionList--newDesignLanguage',
            'when newDesignLanguage is true adds --newDesignLanguage class'
          );
        assert
          .dom(actionListItemButtonSelector)
          .hasClass(
            'Polaris-ActionList--newDesignLanguage',
            'when newDesignLanguage is true adds --newDesignLanguage class'
          );
        assert
          .dom(actionListSectionActionsSelector)
          .hasClass(
            'Polaris-ActionList--newDesignLanguage',
            'when newDesignLanguage is true adds --newDesignLanguage class'
          );
      });
    });
  });

  module('onActionAnyItem', function () {
    test('it fires onActionAnyItem on click of a button item', async function (assert) {
      this.handleBubbledActions = () =>
        assert.notOk('action does not bubble to parent');
      this.handleAnyActionItem = () => {
        assert.ok(true, 'fires @onActionAnyItem');
      };

      await render(hbs`
        {{!-- template-lint-disable no-invalid-interactive--}}
        <div {{on "click" this.handleBubbledActions}}>
          <PolarisActionList
            @items={{array (hash text="Add discount")}}
            @onActionAnyItem={{this.handleAnyActionItem}}
          />
        </div>
      `);

      await click(actionListItemButtonSelector);
    });

    test('it fires onActionAnyItem on click of an anchor item', async function (assert) {
      this.handleBubbledActions = () =>
        assert.notOk('action does not bubble to parent');
      this.handleAnyActionItem = () =>
        assert.ok(true, 'fires @onActionAnyItem');

      await render(hbs`
        <div {{on "click" this.handleBubbledActions}}>
          <PolarisActionList
            @items={{array (hash text="Add discount" url="https://facebook.com" external=true)}}
            @onActionAnyItem={{this.handleAnyActionItem}}
          />
        </div>
      `);

      await click(actionListItemLinkSelector);
    });
  });
});
