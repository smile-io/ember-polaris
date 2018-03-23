import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-description-list', 'Integration | Component | polaris description list', {
  integration: true
});

const items = [
  {
    term: 'Logistics',
    description: 'The management of products or other resources as they travel between a point of origin and a destination.',
  },
  {
    term: 'Sole proprietorship',
    description: 'A business structure where a single individual both owns and runs the company.',
  },
  {
    term: 'Discount code',
    description: 'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
  },
];

const componentSelector = 'dl.Polaris-DescriptionList';
const listItemsTermsSelector = buildNestedSelector(
  componentSelector,
  'dt'
);

/**
 * This selector also tests that each description
 * is rendered directly after a term.
 */
const listItemsDescriptionsSelector = buildNestedSelector(
  componentSelector,
  'dt + dd'
);

test('it renders the correct HTML when items are passed in', function(assert) {
  this.set('items', items);
  this.render(hbs`{{polaris-description-list items=items}}`);

  const descriptionListComponent = findAll(componentSelector);
  assert.equal(descriptionListComponent.length, 1, 'it renders a description list component');

  const itemsTerms = findAll(listItemsTermsSelector);
  const itemsLength = items.length;
  assert.equal(itemsTerms.length, itemsLength, 'it renders the correct number of terms within the list');

  const itemsDescriptions = findAll(listItemsDescriptionsSelector);
  assert.equal(itemsDescriptions.length, itemsLength, 'it renders the correct number of descriptions following terms');
});

test('it does not render terms or descriptions if no items are passed in', function(assert) {
  this.render(hbs`{{polaris-description-list}}`);

  const descriptionListComponent = findAll(componentSelector);
  assert.equal(descriptionListComponent.length, 1, 'no items - it renders a description list component');

  const itemsTerms = findAll(listItemsTermsSelector);
  assert.equal(itemsTerms.length, 0, 'no items - it does not render any terms within the list');

  const itemsDescriptions = findAll(listItemsDescriptionsSelector);
  assert.equal(itemsDescriptions.length, 0, 'no items - it does not render any descriptions within the list');
});

test('it does not render items if they only contain unsupported keys', function(assert) {
  const supportedKeysItem = {
    term: 'term',
    description: 'description'
  };
  const unsupportedKeysItem = {
    label: 'label is not a supported key',
    summary: 'summary is not a supported key'
  };
  const mixedKeyItems = [
    supportedKeysItem,
    unsupportedKeysItem
  ];
  const numberOfItemsWithSupportedKeys = 1;

  this.set('mixedKeyItems', mixedKeyItems);
  this.render(hbs`{{polaris-description-list items=mixedKeyItems}}`);

  const itemsTerms = findAll(listItemsTermsSelector);
  assert.equal(itemsTerms.length, numberOfItemsWithSupportedKeys, 'unsupported keys - it does not render item terms with unsupported keys');

  const itemsDescriptions = findAll(listItemsDescriptionsSelector);
  assert.equal(itemsDescriptions.length, numberOfItemsWithSupportedKeys, 'unsupported keys - it does not render item descriptions with unsupported keys');
});

