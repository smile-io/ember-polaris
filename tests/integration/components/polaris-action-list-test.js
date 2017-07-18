import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent('polaris-action-list', 'Integration | Component | polaris action list', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent);
  },
});

const actionListSelector = 'div.Polaris-ActionList';
const actionListItemSelector = buildNestedSelector(
  actionListSelector,
  'div',
  'ul.Polaris-ActionList__Actions',
  'li',
  'button.Polaris-ActionList__Item'
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

test('it renders the correct HTML in basic usage', function(assert) {
  this.render(hbs`
    {{polaris-action-list
      items=(array
        (hash
          content="This is the first item"
        )
        (hash
          content="This is item number two"
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
          content="Import some things"
          icon="import"
        )
        (hash
          content="Export stuff"
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
          content="Item 1"
          action=(action "action1")
        )
        (hash
          content="Item 2"
          action=(action (mut action2Fired) true)
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
