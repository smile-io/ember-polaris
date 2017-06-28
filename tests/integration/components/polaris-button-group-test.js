import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-button-group', 'Integration | Component | polaris button group', {
  integration: true
});

const buttonGroupSelector = 'div.Polaris-ButtonGroup';
const buttonGroupItemSelector = buildNestedSelector(
  buttonGroupSelector,
  'div.Polaris-ButtonGroup__Item'
);
const buttonSelector = buildNestedSelector(
  buttonGroupItemSelector,
  'button.Polaris-Button'
);

test('it renders the correct HTML with default attributes', function(assert) {
  this.render(hbs`
    {{#polaris-button-group}}
      {{polaris-button text="Button 1"}}
      {{polaris-button text="Button 2"}}
    {{/polaris-button-group}}
  `);

  const buttonGroups = findAll(buttonGroupSelector);
  assert.equal(buttonGroups.length, 1, 'renders one button group');

  const buttons = findAll(buttonSelector);
  assert.equal(buttons.length, 2, 'renders the correct number of wrapped buttons');
});

test('it renders the correct HTML with segmented attribute', function(assert) {
  this.set('segmented', true);
  this.render(hbs`{{polaris-button-group segmented=segmented}}`);

  const buttonGroup = find(buttonGroupSelector);
  assert.ok(buttonGroup.classList.contains('Polaris-ButtonGroup--segmented'), 'segmented=true - adds the segmented class');

  this.set('segmented', false);
  assert.notOk(buttonGroup.classList.contains('Polaris-ButtonGroup--segmented'), 'segmented=true - does not add the segmented class');
});

test('it renders the correct HTML in block usage', function(assert) {
  this.render(hbs`
    {{#polaris-button-group as |buttonGroup|}}
      {{#buttonGroup.item plain=true}}
        Plain block item
      {{/buttonGroup.item}}

      {{buttonGroup.item text="Inline item"}}

      {{polaris-button text="Magically wrapped button"}}
    {{/polaris-button-group}}
  `);

  const buttonGroupItems = findAll(buttonGroupItemSelector);
  assert.equal(buttonGroupItems.length, 3, 'renders the correct number of button group items');

  // Check the first item.
  let buttonGroupItem = buttonGroupItems[0];
  assert.ok(buttonGroupItem.classList.contains('Polaris-ButtonGroup__Item--plain'), 'first group item - has plain class');
  assert.equal(buttonGroupItem.textContent.trim(), 'Plain block item', 'first group item - renders the correct content');

  // Check the second item.
  buttonGroupItem = buttonGroupItems[1];
  assert.notOk(buttonGroupItem.classList.contains('Polaris-ButtonGroup__Item--plain'), 'second group item - does not have plain class');
  assert.equal(buttonGroupItem.textContent.trim(), 'Inline item', 'second group item - renders the correct content');

  // Check the third item.
  buttonGroupItem = buttonGroupItems[2];
  assert.notOk(buttonGroupItem.classList.contains('Polaris-ButtonGroup__Item--plain'), 'third group item - does not have plain class');
  assert.equal(buttonGroupItem.textContent.trim(), 'Magically wrapped button', 'third group item - renders the correct content');
});
