import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

const itemsNoID = [{ url: 'item 1' }, { url: 'item 2' }];
const singleItemNoID = [{ url: 'item 1' }];
const singleItemWithID = [{ id: '1', url: 'item 1' }];

const itemsWithID = [
  { id: '5', name: 'item 1', url: 'www.test.com', title: 'title 1' },
  { id: '6', name: 'item 2', url: 'www.test.com', title: 'title 2' },
  { id: '7', name: 'item 3', url: 'www.test.com', title: 'title 3' },
];
const promotedBulkActions = [{ content: 'action' }, { content: 'action 2' }];
const bulkActions = [{ content: 'action 3' }, { content: 'action 4' }];
const sortOptions = [
  'Product title (A-Z)',
  {
    value: 'PRODUCT_TITLE_DESC',
    label: 'Product title (Z-A)',
  },
  {
    value: 'EXTRA',
    label: 'Disabled Option',
    disabled: true,
  },
];

const ShallowItemComponent = Component.extend({
  tagName: '',
  layout: hbs`{{item}}`,
});

const CustomMarkupComponent = Component.extend({
  tagName: 'p',
  layout: hbs`{{item.title}}`,
});

module('Integration | Component | polaris-resource-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setProperties({
      itemsNoID,
      singleItemNoID,
      singleItemWithID,
      itemsWithID,
      promotedBulkActions,
      bulkActions,
      sortOptions,
    });

    this.owner.register(
      'component:shallow-item-component',
      ShallowItemComponent
    );
    this.owner.register(
      'component:custom-markup-component',
      CustomMarkupComponent
    );
  });

  module('itemComponent', function() {
    test('renders list items', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="shallow-item-component"
        }}
      `);
      assert.dom('li').exists({ count: 3 });
    });

    test('renders custom markup', async function(assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent="custom-markup-component"
        }}
      `);
      assert.dom('li:first-of-type > p').hasText('title 1');
    });
  });
});
