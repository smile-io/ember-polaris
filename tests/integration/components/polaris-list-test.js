import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris list', function(hooks) {
  setupRenderingTest(hooks);

  const listSelector = '.Polaris-List';
  const listItemSelector = buildNestedSelector(
    listSelector,
    'li.Polaris-List__Item'
  );

  test('it renders the correct HTML', async function(assert) {
    await render(hbs`
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

    let listItems = findAll(listItemSelector);
    assert.equal(
      listItems.length,
      0,
      'no items - does not render any list items'
    );

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

    listItems = findAll(listItemSelector);
    assert.equal(listItems.length, 2, 'with items - renders two list items');

    assert
      .dom(listItems[0])
      .hasText('Item one (block)', 'first item has correct text');
    assert
      .dom(listItems[1])
      .hasText('Second one (inline)', 'second item has correct text');

    let list = lists[0];
    assert.equal(
      list.nodeName,
      'UL',
      'unspecified type - renders unordered list'
    );
    assert
      .dom(list)
      .hasClass(
        'Polaris-List--typeBullet',
        'unspecified type - applies bullet class'
      );
    assert
      .dom(list)
      .hasNoClass(
        'Polaris-List--typeNumber',
        'unspecified type - does not apply number class'
      );

    this.set('type', 'number');
    list = find(listSelector);
    assert.equal(list.nodeName, 'OL', 'number type - renders ordered list');
    assert
      .dom(list)
      .hasNoClass(
        'Polaris-List--typeBullet',
        'number type - does not apply bullet class'
      );
    assert
      .dom(list)
      .hasClass(
        'Polaris-List--typeNumber',
        'number type - applies number class'
      );

    this.set('type', 'bullet');
    list = find(listSelector);
    assert.equal(list.nodeName, 'UL', 'bullet type - renders unordered list');
    assert
      .dom(list)
      .hasClass(
        'Polaris-List--typeBullet',
        'bullet type - applies bullet class'
      );
    assert
      .dom(list)
      .hasNoClass(
        'Polaris-List--typeNumber',
        'bullet type - does not apply number class'
      );

    this.set('type', 'unsupported');
    list = find(listSelector);
    assert.equal(
      list.nodeName,
      'UL',
      'unsupported type - renders unordered list'
    );
    assert
      .dom(list)
      .hasClass(
        'Polaris-List--typeBullet',
        'unsupported type - applies bullet class'
      );
    assert
      .dom(list)
      .hasNoClass(
        'Polaris-List--typeNumber',
        'unsupported type - does not apply number class'
      );
  });
});
