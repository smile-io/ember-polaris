import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris resource list', function(hooks) {
  setupRenderingTest(hooks);

  const resourceListSelector = 'ul.Polaris-ResourceList';
  const resourceListItemSelector = buildNestedSelector(
    resourceListSelector,
    'li.Polaris-ResourceList__ItemWrapper'
  );
  const resourceListItemAttributesSelector = buildNestedSelector(
    resourceListItemSelector,
    'div.Polaris-ResourceList__Item',
    'div.Polaris-ResourceList__Container',
    'div.Polaris-ResourceList__Content',
    'div.Polaris-ResourceList__Attributes'
  );

  const attributeOneSelector = 'p.Polaris-ResourceList__AttributeOne';
  const attributeTwoSelector = 'div.Polaris-ResourceList__AttributeTwo';
  const attributeThreeSelector = 'div.Polaris-ResourceList__AttributeThree';

  test('it renders the correct HTML when the list is empty', async function(assert) {
    await render(hbs`{{polaris-resource-list}}`);

    const resourceLists = findAll(resourceListSelector);
    assert.equal(resourceLists.length, 1, 'renders one resource list');
    assert.equal(
      resourceLists[0].children.length,
      0,
      'does not render any children'
    );
  });

  test('it renders the correct HTML when using the default item rendering', async function(assert) {
    // Not currently supported: url, media, badges, exceptions, actions, persistActions.
    await render(hbs`
      {{polaris-resource-list
        items=(array
          (hash
            attributeOne="Item 1 attribute one"
          )
          (hash
            attributeTwo="Item 2 attribute two"
          )
          (hash
            attributeThree="Item 3 attribute three"
          )
          (hash
            attributeOne="Item 4 attribute one"
            attributeTwo="Item 4 attribute two"
            attributeThree="Item 4 attribute three"
          )
        )
      }}
    `);

    const resourceListItems = findAll(resourceListItemSelector);
    assert.equal(
      resourceListItems.length,
      4,
      'renders four resource list items'
    );

    const resourceListItemAttributes = findAll(
      resourceListItemAttributesSelector
    );
    assert.equal(
      resourceListItemAttributes.length,
      4,
      'renders four resource list item attribute wrappers'
    );

    // Check the first item's attributes.
    let itemAttributes = resourceListItemAttributes[0];
    let attributeOne = find(attributeOneSelector, itemAttributes);
    assert.ok(attributeOne, 'item one - renders attribute one');
    assert.equal(
      attributeOne.textContent.trim(),
      'Item 1 attribute one',
      'item one - renders the correct content for attribute one'
    );

    let attributeTwo = find(attributeTwoSelector, itemAttributes);
    assert.notOk(attributeTwo, 'item one - does not render attribute two');

    let attributeThree = find(attributeThreeSelector, itemAttributes);
    assert.notOk(attributeThree, 'item one - does not render attribute three');

    // Check the second item's attributes.
    itemAttributes = resourceListItemAttributes[1];
    attributeOne = find(attributeOneSelector, itemAttributes);
    assert.ok(attributeOne, 'item two - renders attribute one');
    assert.equal(
      attributeOne.textContent.trim(),
      '',
      'item two - renders empty content for attribute one'
    );

    attributeTwo = find(attributeTwoSelector, itemAttributes);
    assert.ok(attributeTwo, 'item two - renders attribute two');
    assert.equal(
      attributeTwo.textContent.trim(),
      'Item 2 attribute two',
      'item two - renders the correct content for attribute two'
    );

    attributeThree = find(attributeThreeSelector, itemAttributes);
    assert.notOk(attributeThree, 'item two - does not render attribute three');

    // Check the third item's attributes.
    itemAttributes = resourceListItemAttributes[2];
    attributeOne = find(attributeOneSelector, itemAttributes);
    assert.ok(attributeOne, 'item three - renders attribute one');
    assert.equal(
      attributeOne.textContent.trim(),
      '',
      'item three - renders empty content for attribute one'
    );

    attributeTwo = find(attributeTwoSelector, itemAttributes);
    assert.notOk(attributeTwo, 'item three - does not render attribute two');

    attributeThree = find(attributeThreeSelector, itemAttributes);
    assert.ok(attributeThree, 'item three - renders attribute three');
    assert.equal(
      attributeThree.textContent.trim(),
      'Item 3 attribute three',
      'item three - renders the correct content for attribute three'
    );

    // Check the fourth item's attributes.
    itemAttributes = resourceListItemAttributes[3];
    attributeOne = find(attributeOneSelector, itemAttributes);
    assert.ok(attributeOne, 'item four - renders attribute one');
    assert.equal(
      attributeOne.textContent.trim(),
      'Item 4 attribute one',
      'item four - renders the correct content for attribute one'
    );

    attributeTwo = find(attributeTwoSelector, itemAttributes);
    assert.ok(attributeTwo, 'item four - renders attribute two');
    assert.equal(
      attributeTwo.textContent.trim(),
      'Item 4 attribute two',
      'item four - renders the correct content for attribute two'
    );

    attributeThree = find(attributeThreeSelector, itemAttributes);
    assert.ok(attributeThree, 'item four - renders attribute three');
    assert.equal(
      attributeThree.textContent.trim(),
      'Item 4 attribute three',
      'item four - renders the correct content for attribute three'
    );
  });

  test('it renders the correct HTML when using itemComponent', async function(assert) {
    // Register a custom item renderer component.
    const CustomItemRendererComponent = Component.extend({
      tagName: 'a',

      attributeBindings: ['href'],

      classNames: ['custom-item-renderer'],

      layout: hbs`This is item {{index}}`,

      item: null,
      index: null,

      href: readOnly('item.url'),
    });
    this.owner.register(
      'component:custom-item-renderer',
      CustomItemRendererComponent
    );

    await render(hbs`
      {{polaris-resource-list
        items=(array
          (hash
            url="http://www.somewhere.com/item-1"
          )
          (hash
            url="http://www.somewhere-else.com/item-2"
          )
        )
        itemComponent="custom-item-renderer"
      }}
    `);

    const itemsSelector = buildNestedSelector(
      resourceListItemSelector,
      'a.custom-item-renderer'
    );
    const items = findAll(itemsSelector);
    assert.equal(items.length, 2, 'renders two items');

    // Check the first item.
    let item = items[0];
    assert.equal(
      item.href,
      'http://www.somewhere.com/item-1',
      'first item - has the correct href'
    );
    assert.equal(
      item.textContent.trim(),
      'This is item 0',
      'first item - renders the correct content'
    );

    // Check the second item.
    item = items[1];
    assert.equal(
      item.href,
      'http://www.somewhere-else.com/item-2',
      'second item - has the correct href'
    );
    assert.equal(
      item.textContent.trim(),
      'This is item 1',
      'second item - renders the correct content'
    );
  });
});
