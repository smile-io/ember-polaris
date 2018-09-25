import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-form-layout', 'Integration | Component | polaris form layout', {
  integration: true,
});

const formLayoutSelector = 'div.Polaris-FormLayout';

test('it renders the correct HTML in basic usage', function(assert) {
  this.render(hbs`
    {{#polaris-form-layout as |formLayout|}}
      {{#formLayout.item}}
        <div class="item">Item 1</div>
      {{/formLayout.item}}

      <div class="item">Item 2</div>
    {{/polaris-form-layout}}
  `);

  const formLayouts = findAll(formLayoutSelector);
  assert.equal(formLayouts.length, 1, 'renders the correct number of layouts');

  const formLayoutItemSelector = buildNestedSelector(
    formLayoutSelector,
    'div.Polaris-FormLayout__Item',
  );
  const formLayoutItems = findAll(formLayoutItemSelector);
  assert.equal(formLayoutItems.length, 2, 'renders the correct number of layout items');

  // Check the first item.
  let item = find('div.item', formLayoutItems[0]);
  assert.ok(item, 'first item - renders');
  assert.equal(item.textContent.trim(), 'Item 1', 'first item - has the correct content');

  // Check the second item.
  item = find('div.item', formLayoutItems[1]);
  assert.ok(item, 'second item - renders');
  assert.equal(item.textContent.trim(), 'Item 2', 'second item - has the correct content');
});

test('it renders the correct HTML when using groups', function(assert) {
  this.render(hbs`
    {{#polaris-form-layout as |formLayout|}}
      {{#formLayout.group as |group|}}
        {{#group.item}}
          <div class="item">Default group item 1</div>
        {{/group.item}}

        <div class="item">Default group item 2</div>
      {{/formLayout.group}}

      {{#formLayout.group condensed=true}}
        <div class="item">Condensed group item</div>
      {{/formLayout.group}}

      <div class="item">Ungrouped item</div>
    {{/polaris-form-layout}}
  `);

  const formLayouts = findAll(formLayoutSelector);
  assert.equal(formLayouts.length, 1, 'renders the correct number of layouts');

  const itemSelector = buildNestedSelector('div.Polaris-FormLayout__Item', 'div.item');
  const items = findAll(itemSelector);
  assert.equal(items.length, 4, 'renders the correct number of items');

  const formLayoutGroupSelector = buildNestedSelector(formLayoutSelector, 'div[role="group"]');
  const formLayoutGroups = findAll(formLayoutGroupSelector);
  assert.equal(formLayoutGroups.length, 2, 'renders the correct number of groups');

  // Check the first group.
  let group = formLayoutGroups[0];
  assert.notOk(
    group.classList.contains('Polaris-FormLayout--condensed'),
    'first group - does not have condensed class',
  );

  const groupItemSelector = buildNestedSelector('div.Polaris-FormLayout__Items', itemSelector);
  let groupItems = findAll(groupItemSelector, group);
  assert.equal(groupItems.length, 2, 'first group - renders the correct number of items');
  assert.equal(
    groupItems[0].textContent.trim(),
    'Default group item 1',
    'first group item 1 - renders the correct content',
  );
  assert.equal(
    groupItems[1].textContent.trim(),
    'Default group item 2',
    'first group item 2 - renders the correct content',
  );

  // Check the second group.
  group = formLayoutGroups[1];
  assert.ok(
    group.classList.contains('Polaris-FormLayout--condensed'),
    'second group - has condensed class',
  );

  groupItems = findAll(groupItemSelector, group);
  assert.equal(groupItems.length, 1, 'second group - renders the correct number of items');
  assert.equal(
    groupItems[0].textContent.trim(),
    'Condensed group item',
    'second group - renders the correct content',
  );

  // Check the ungrouped content.
  const ungroupedItemSelector = buildNestedSelector(formLayoutSelector, itemSelector);
  const ungroupedItems = findAll(ungroupedItemSelector);
  assert.equal(ungroupedItems.length, 1, 'ungrouped - renders the correct number of items');
  assert.equal(
    ungroupedItems[0].textContent.trim(),
    'Ungrouped item',
    'ungrouped - renders the correct content',
  );
});
