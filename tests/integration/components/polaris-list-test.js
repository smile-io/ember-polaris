import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-list', 'Integration | Component | polaris list', {
  integration: true
});

const listSelector = '.Polaris-List';
const listItemSelector = buildNestedSelector(listSelector, 'li.Polaris-List__Item');

test('it renders the correct HTML', function(assert) {
  this.render(hbs`
    {{#polaris-list type=type as |list|}}
      {{#each items as |item|}}
        {{#if item.inline}}
          {{list.item text=item.text}}
        {{else}}
          {{#list.item}}
            {{item.text}}
          {{/list.item}}
        {{/if}}
      {{/each}}
    {{/polaris-list}}
  `);

  let lists = findAll(listSelector);
  assert.equal(lists.length, 1, 'renders one bulleted list');

  let listItems = findAll(listItemSelector)
  assert.equal(listItems.length, 0, 'no items - does not render any list items');

  this.set('items', [
    {
      text: 'Item one (block)',
      inline: false,
    },
    {
      text: 'Second one (inline)',
      inline: true,
    },
  ]);

  listItems = findAll(listItemSelector)
  assert.equal(listItems.length, 2, 'with items - renders two list items');

  assert.equal(listItems[0].textContent.trim(), 'Item one (block)', 'first item has correct text');
  assert.equal(listItems[1].textContent.trim(), 'Second one (inline)', 'second item has correct text');

  let list = lists[0];
  assert.equal(list.nodeName, 'UL', 'unspecified type - renders unordered list');
  assert.ok(list.classList.contains('Polaris-List--typeBullet'), 'unspecified type - applies bullet class');
  assert.notOk(list.classList.contains('Polaris-List--typeNumber'), 'unspecified type - does not apply number class');

  this.set('type', 'number');
  list = find(listSelector);
  assert.equal(list.nodeName, 'OL', 'number type - renders ordered list');
  assert.notOk(list.classList.contains('Polaris-List--typeBullet'), 'number type - does not apply bullet class');
  assert.ok(list.classList.contains('Polaris-List--typeNumber'), 'number type - applies number class');

  this.set('type', 'bullet');
  list = find(listSelector);
  assert.equal(list.nodeName, 'UL', 'bullet type - renders unordered list');
  assert.ok(list.classList.contains('Polaris-List--typeBullet'), 'bullet type - applies bullet class');
  assert.notOk(list.classList.contains('Polaris-List--typeNumber'), 'bullet type - does not apply number class');

  this.set('type', 'unsupported');
  list = find(listSelector);
  assert.equal(list.nodeName, 'UL', 'unsupported type - renders unordered list');
  assert.ok(list.classList.contains('Polaris-List--typeBullet'), 'unsupported type - applies bullet class');
  assert.notOk(list.classList.contains('Polaris-List--typeNumber'), 'unsupported type - does not apply number class');
});
