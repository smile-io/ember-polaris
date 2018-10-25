import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const actionListSelector = 'div.Polaris-ActionList';
const actionListItemButtonSelector = buildNestedSelector(
  'ul.Polaris-ActionList__Actions',
  'li',
  'button.Polaris-ActionList__Item'
);
const actionListItemSelector = buildNestedSelector(
  actionListSelector,
  'div',
  actionListItemButtonSelector
);
const actionListItemContentSelector = buildNestedSelector(
  actionListItemSelector,
  'div.Polaris-ActionList__Content'
);
const actionListItemContentImageSelector = buildNestedSelector(
  actionListItemContentSelector,
  'div.Polaris-ActionList__Image'
);
const actionListItemContentImageIconSelector = buildNestedSelector(
  actionListItemContentImageSelector,
  'span.Polaris-Icon',
  'svg'
);
const actionListItemContentTextSelector = buildNestedSelector(
  actionListItemContentSelector,
  'div.Polaris-ActionList__Text'
);
const sectionedActionListSelector = 'ul.Polaris-ActionList';
const sectionedActionListSectionSelector = buildNestedSelector(
  sectionedActionListSelector,
  'li.Polaris-ActionList__Section',
  'div'
);
const actionListSectionTitleSelector = 'p.Polaris-ActionList__Title';
const itemIconSelector = buildNestedSelector(
  'div.Polaris-ActionList__Image',
  'span.Polaris-Icon',
  'svg'
);

module('Integration | Component | polaris action list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  test('it renders the correct HTML in basic usage', async function(assert) {
    await render(hbs`
      {{polaris-action-list
        items=(array
          (hash
            text="This is the first item"
          )
          (hash
            text="This is item number two"
          )
        )
      }}
    `);

    const actionLists = findAll(actionListSelector);
    assert.equal(actionLists.length, 1, 'renders one action list');

    const actionListItems = findAll(actionListItemSelector);
    assert.equal(actionListItems.length, 2, 'renders two action list items');
    assert
      .dom(actionListItems[0])
      .hasText(
        'This is the first item',
        'first item - renders the correct content'
      );
    assert
      .dom(actionListItems[1])
      .hasText(
        'This is item number two',
        'second item - renders the correct content'
      );
  });

  test('it renders the correct HTML when using icons', async function(assert) {
    await render(hbs`
      {{polaris-action-list
        items=(array
          (hash
            text="Import some things"
            icon="import"
          )
          (hash
            text="Export stuff"
            icon="export"
          )
        )
      }}
    `);

    const actionLists = findAll(actionListSelector);
    assert.equal(actionLists.length, 1, 'renders one action list');

    const actionListItemContents = findAll(actionListItemContentSelector);
    assert.equal(
      actionListItemContents.length,
      2,
      'renders two action list items'
    );

    const actionListItemContentImages = findAll(
      actionListItemContentImageSelector
    );
    assert.equal(
      actionListItemContentImages.length,
      2,
      'renders two action list item images'
    );

    const actionListItemContentImageIcons = findAll(
      actionListItemContentImageIconSelector
    );
    assert.equal(
      actionListItemContentImageIcons.length,
      2,
      'renders two action list item image icons'
    );
    assert.equal(
      actionListItemContentImageIcons[0].dataset.iconSource,
      'polaris/import',
      'first item image icon - renders the correct icon'
    );
    assert.equal(
      actionListItemContentImageIcons[1].dataset.iconSource,
      'polaris/export',
      'second item image icon - renders the correct icon'
    );

    const actionListItemContentTexts = findAll(
      actionListItemContentTextSelector
    );
    assert.equal(
      actionListItemContentTexts.length,
      2,
      'renders two action list item texts'
    );
    assert
      .dom(actionListItemContentTexts[0])
      .hasText(
        'Import some things',
        'first item text - renders the correct content'
      );
    assert
      .dom(actionListItemContentTexts[1])
      .hasText(
        'Export stuff',
        'second item text - renders the correct content'
      );
  });

  test('it handles item actions correctly', async function(assert) {
    let action1Fired = false;
    this.set('action1', () => {
      action1Fired = true;
    });
    this.set('action2Fired', false);

    await render(hbs`
      {{polaris-action-list
        items=(array
          (hash
            text="Item 1"
            onAction=(action action1)
          )
          (hash
            text="Item 2"
            onAction=(action (mut action2Fired) true)
          )
        )
      }}
    `);

    const actionLists = findAll(actionListSelector);
    assert.equal(actionLists.length, 1, 'renders one action list');

    const itemButtons = findAll('li button');
    await click(itemButtons[0]);
    assert.ok(action1Fired, 'after pressing first button - first action fired');
    assert.notOk(
      this.get('action2Fired'),
      'after pressing first button - second action not fired'
    );

    await click(itemButtons[1]);
    assert.ok(
      this.get('action2Fired'),
      'after pressing second button - second action fired'
    );
  });

  test('it does not bubble item actions', async function(assert) {
    this.setProperties({
      parentActionFired: false,
      action1Fired: false,
      action2Fired: false,
    });

    await render(hbs`
      <div {{action (action (mut parentActionFired) true)}}>
        {{polaris-action-list
          items=(array
            (hash
              text="Item 1"
              onAction=(action (mut action2Fired) true)
            )
            (hash
              text="Item 2"
              onAction=(action (mut action2Fired) true)
            )
          )
        }}
      </div>
    `);

    const actionLists = findAll(actionListSelector);
    assert.equal(actionLists.length, 1, 'renders one action list');

    const listItems = findAll('li');
    await click('button', listItems[0]);
    assert.notOk(
      this.get('parentActionFired'),
      'after pressing first button - parent action not fired'
    );

    await click('button', listItems[1]);
    assert.notOk(
      this.get('parentActionFired'),
      'after pressing second button - parent action not fired'
    );
  });

  test('it handles the "any item" action correctly', async function(assert) {
    this.setProperties({
      itemActionFired: false,
      anyItemActionCount: 0,
    });

    this.set('anyItem', () => {
      this.set('anyItemActionCount', this.get('anyItemActionCount') + 1);
    });

    await render(hbs`
      {{polaris-action-list
        items=(array
          (hash
            text="Item 1"
          )
          (hash
            text="Item 2"
            onAction=(action (mut itemActionFired) true)
          )
        )
        onActionAnyItem=(action anyItem)
      }}
    `);

    const itemButtons = findAll('li button');
    await click(itemButtons[0]);
    assert.equal(
      this.get('anyItemActionCount'),
      1,
      'after pressing first button - any item action fired once'
    );
    assert.notOk(
      this.get('itemActionFired'),
      'after pressing first button - item action not fired'
    );

    await click(itemButtons[1]);
    assert.equal(
      this.get('anyItemActionCount'),
      2,
      'after pressing second button - any item action fired twice'
    );
    assert.ok(
      this.get('itemActionFired'),
      'after pressing second button - item action fired'
    );
  });

  test('it renders the correct HTML when using sections', async function(assert) {
    this.set('sections', [
      {
        title: 'Section 2',
        items: [
          {
            text: 'Section 2 item 1',
            icon: 'notes',
          },
          {
            text: 'Section 2 item 2',
          },
        ],
      },
      {
        items: [
          {
            text: 'Section 3 item',
          },
        ],
      },
    ]);

    await render(hbs`
      {{polaris-action-list
        items=items
        sections=sections
      }}
    `);

    const actionLists = findAll(sectionedActionListSelector);
    assert.equal(actionLists.length, 1, 'renders one sectioned action list');

    // Test sections without any additional items passed in.
    let actionListSections = findAll(sectionedActionListSectionSelector);
    assert.equal(
      actionListSections.length,
      2,
      'with no items and two sections - renders two action list sections'
    );

    // Add some items alongside the sections.
    this.set('items', [{ text: 'Section 1 item' }]);

    actionListSections = findAll(sectionedActionListSectionSelector);
    assert.equal(
      actionListSections.length,
      3,
      'with items and two sections - renders three action list sections'
    );

    // First section should have no title, one item with no icon.
    let section = actionListSections[0];
    assert
      .dom(section)
      .hasClass(
        'Polaris-ActionList__Section--withoutTitle',
        'first section has "without title" class'
      );

    let sectionTitle = section.querySelector(actionListSectionTitleSelector);
    assert.notOk(sectionTitle, 'first section does not have a title');

    let items = section.querySelectorAll(actionListItemButtonSelector);
    assert.equal(items.length, 1, 'first section has one item');
    assert
      .dom(items[0])
      .hasText('Section 1 item', 'first section item renders the correct text');

    // Second section should have a title and two items, the first with an icon and the second without.
    section = actionListSections[1];
    assert
      .dom(section)
      .hasNoClass(
        'Polaris-ActionList__Section--withoutTitle',
        'second section does not have "without title" class'
      );

    sectionTitle = section.querySelector(actionListSectionTitleSelector);
    assert.ok(sectionTitle, 'second section has a title');
    assert
      .dom(sectionTitle)
      .hasText('Section 2', 'second section renders the correct title text');

    items = section.querySelectorAll(actionListItemButtonSelector);
    assert.equal(items.length, 2, 'second section has two items');
    assert
      .dom(items[0])
      .hasText(
        'Section 2 item 1',
        "second section's first item renders the correct text"
      );
    assert
      .dom(items[1])
      .hasText(
        'Section 2 item 2',
        "second section's second item renders the correct text"
      );

    let item = items[0];
    let itemIcon = item.querySelector(itemIconSelector);
    assert.ok(itemIcon, "second section's first item renders an icon");
    assert.equal(
      itemIcon.dataset.iconSource,
      'polaris/notes',
      "second section's first item renders the correct icon"
    );

    item = items[1];
    itemIcon = item.querySelector(itemIconSelector);
    assert.notOk(
      itemIcon,
      "second section's second item does not render an icon"
    );

    // Third section should have no title, one item with no icon.
    section = actionListSections[2];
    assert
      .dom(section)
      .hasClass(
        'Polaris-ActionList__Section--withoutTitle',
        'third section has "without title" class'
      );

    sectionTitle = section.querySelector(actionListSectionTitleSelector);
    assert.notOk(sectionTitle, 'third section does not have a title');

    items = section.querySelectorAll(actionListItemButtonSelector);
    assert.equal(items.length, 1, 'third section has one item');
    assert
      .dom(items[0])
      .hasText('Section 3 item', 'third section item renders the correct text');
  });
});
