import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent('polaris-action-list', 'Integration | Component | polaris action list', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent);
  },
});

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
  'li',
  'div'
);
const actionListSectionTitleSelector = 'p.Polaris-ActionList__Title';
const itemIconSelector = buildNestedSelector(
  'div.Polaris-ActionList__Image',
  'span.Polaris-Icon',
  'svg'
);

test('it renders the correct HTML in basic usage', function(assert) {
  this.render(hbs`
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
  assert.equal(actionListItems[0].textContent.trim(), 'This is the first item', 'first item - renders the correct content');
  assert.equal(actionListItems[1].textContent.trim(), 'This is item number two', 'second item - renders the correct content');
});

test('it renders the correct HTML when using icons', function(assert) {
  this.render(hbs`
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
  assert.equal(actionListItemContents.length, 2, 'renders two action list items');

  const actionListItemContentImages = findAll(actionListItemContentImageSelector);
  assert.equal(actionListItemContentImages.length, 2, 'renders two action list item images');

  const actionListItemContentImageIcons = findAll(actionListItemContentImageIconSelector);
  assert.equal(actionListItemContentImageIcons.length, 2, 'renders two action list item image icons');
  assert.equal(actionListItemContentImageIcons[0].dataset.iconSource, 'polaris/import', 'first item image icon - renders the correct icon');
  assert.equal(actionListItemContentImageIcons[1].dataset.iconSource, 'polaris/export', 'second item image icon - renders the correct icon');

  const actionListItemContentTexts = findAll(actionListItemContentTextSelector);
  assert.equal(actionListItemContentTexts.length, 2, 'renders two action list item texts');
  assert.equal(actionListItemContentTexts[0].textContent.trim(), 'Import some things', 'first item text - renders the correct content');
  assert.equal(actionListItemContentTexts[1].textContent.trim(), 'Export stuff', 'second item text - renders the correct content');
});

test('it handles item actions correctly', function(assert) {
  let action1Fired = false;
  this.on('action1', () => {
    action1Fired = true;
  });
  this.set('action2Fired', false);

  this.render(hbs`
    {{polaris-action-list
      items=(array
        (hash
          text="Item 1"
          onAction=(action "action1")
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

  const listItems = findAll('li');
  click('button', listItems[0]);
  assert.ok(action1Fired, 'after pressing first button - first action fired');
  assert.notOk(this.get('action2Fired'), 'after pressing first button - second action not fired');

  click('button', listItems[1]);
  assert.ok(this.get('action2Fired'), 'after pressing second button - second action fired');
});

test('it does not bubble item actions', function(assert) {
  this.setProperties({
    parentActionFired: false,
    action1Fired: false,
    action2Fired: false,
  });

  this.render(hbs`
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
  click('button', listItems[0]);
  assert.notOk(this.get('parentActionFired'), 'after pressing first button - parent action not fired');

  click('button', listItems[1]);
  assert.notOk(this.get('parentActionFired'), 'after pressing second button - parent action not fired');
});

test('it handles the "any item" action correctly', function(assert) {
  this.setProperties({
    itemActionFired: false,
    anyItemActionCount: 0,
  });

  this.on('anyItem', () => {
    this.set('anyItemActionCount', this.get('anyItemActionCount') + 1);
  });

  this.render(hbs`
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
      onActionAnyItem=(action "anyItem")
    }}
  `);

  const listItems = findAll('li');
  click('button', listItems[0]);
  assert.equal(this.get('anyItemActionCount'), 1, 'after pressing first button - any item action fired once');
  assert.notOk(this.get('itemActionFired'), 'after pressing first button - item action not fired');

  click('button', listItems[1]);
  assert.equal(this.get('anyItemActionCount'), 2, 'after pressing second button - any item action fired twice');
  assert.ok(this.get('itemActionFired'), 'after pressing second button - item action fired');
});

test('it renders the correct HTML when using sections', function(assert) {
  this.render(hbs`
    {{polaris-action-list
      items=items
      sections=(array
        (hash
          title="Section 2"
          items=(array
            (hash
              text="Section 2 item 1"
              icon="notes"
            )
            (hash
              text="Section 2 item 2"
            )
          )
        )
        (hash
          items=(array
            (hash
              text="Section 3 item"
            )
          )
        )
      )
    }}
  `);

  const actionLists = findAll(sectionedActionListSelector);
  assert.equal(actionLists.length, 1, 'renders one sectioned action list');

  // Test sections without any additional items passed in.
  let actionListSections = findAll(sectionedActionListSectionSelector);
  assert.equal(actionListSections.length, 2, 'with no items and two sections - renders two action list sections');

  // Add some items alongside the sections.
  this.set('items', [{ text: 'Section 1 item' }]);

  actionListSections = findAll(sectionedActionListSectionSelector);
  assert.equal(actionListSections.length, 3, 'with items and two sections - renders three action list sections');

  // First section should have no title, one item with no icon.
  let section = actionListSections[0];
  assert.ok(section.classList.contains('Polaris-ActionList__Section--withoutTitle'), 'first section has "without title" class');

  let sectionTitle = find(actionListSectionTitleSelector, section);
  assert.notOk(sectionTitle, 'first section does not have a title');

  let items = findAll(actionListItemButtonSelector, section);
  assert.equal(items.length, 1, 'first section has one item');
  assert.equal(items[0].textContent.trim(), 'Section 1 item', 'first section item renders the correct text');

  // Second section should have a title and two items, the first with an icon and the second without.
  section = actionListSections[1];
  assert.notOk(section.classList.contains('Polaris-ActionList__Section--withoutTitle'), 'second section does not have "without title" class');

  sectionTitle = find(actionListSectionTitleSelector, section);
  assert.ok(sectionTitle, 'second section has a title');
  assert.equal(sectionTitle.textContent.trim(), 'Section 2', 'second section renders the correct title text');

  items = findAll(actionListItemButtonSelector, section);
  assert.equal(items.length, 2, 'second section has two items');
  assert.equal(items[0].textContent.trim(), 'Section 2 item 1', 'second section\'s first item renders the correct text');
  assert.equal(items[1].textContent.trim(), 'Section 2 item 2', 'second section\'s second item renders the correct text');

  let itemIcon = find(itemIconSelector, items[0]);
  assert.ok(itemIcon, 'second section\'s first item renders an icon');
  assert.equal(itemIcon.dataset.iconSource, 'polaris/notes', 'second section\'s first item renders the correct icon');

  itemIcon = find(itemIconSelector, items[1]);
  assert.notOk(itemIcon, 'second section\'s second item does not render an icon');

  // Third section should have no title, one item with no icon.
  section = actionListSections[2];
  assert.ok(section.classList.contains('Polaris-ActionList__Section--withoutTitle'), 'third section has "without title" class');

  sectionTitle = find(actionListSectionTitleSelector, section);
  assert.notOk(sectionTitle, 'third section does not have a title');

  items = findAll(actionListItemButtonSelector, section);
  assert.equal(items.length, 1, 'third section has one item');
  assert.equal(items[0].textContent.trim(), 'Section 3 item', 'third section item renders the correct text');
});
