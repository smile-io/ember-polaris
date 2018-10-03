import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import Component from '@ember/component';

const stubTermClass = 'stub-term-component';
const stubTermSelector = `.${stubTermClass}`;
const stubDescriptionClass = 'stub-description-component';
const stubDescriptionSelector = `.${stubDescriptionClass}`;

const stubTermComponent = Component.extend({
  classNames: [stubTermClass],
});

const stubDescriptionComponent = Component.extend({
  classNames: [stubDescriptionClass],
});

moduleForComponent(
  'polaris-description-list',
  'Integration | Component | polaris description list',
  {
    integration: true,

    beforeEach() {
      this.register('component:stub-term-component', stubTermComponent);
      this.register('component:stub-description-component', stubDescriptionComponent);
    },
  }
);

const items = [
  {
    term: 'First term',
    description: 'First description',
  },
  {
    term: 'Second term',
    description: 'Second description',
  },
  {
    term: 'Third term',
    description: 'Third description',
  },
];

const componentSelector = 'dl.Polaris-DescriptionList';
const listItemsTermsSelector = buildNestedSelector(componentSelector, 'dt');

/**
 * This selector also tests that each description
 * is rendered directly after a term.
 */
const listItemsDescriptionsSelector = buildNestedSelector(componentSelector, 'dt + dd');

test('it renders the correct HTML when items are passed in', function(assert) {
  this.set('items', items);
  this.render(hbs`{{polaris-description-list items=items}}`);

  const descriptionListComponent = findAll(componentSelector);
  assert.equal(descriptionListComponent.length, 1, 'it renders a description list component');

  const itemsTerms = findAll(listItemsTermsSelector);
  const itemsLength = items.length;
  assert.equal(
    itemsTerms.length,
    itemsLength,
    'it renders the correct number of terms within the list'
  );

  const itemsDescriptions = findAll(listItemsDescriptionsSelector);
  assert.equal(
    itemsDescriptions.length,
    itemsLength,
    'it renders the correct number of descriptions following terms'
  );
});

test('it renders items with explicit `termComponent` and `descriptionComponent` attributes', function(assert) {
  this.render(hbs`
    {{polaris-description-list
      items=(array
        (hash
          termComponent=(component "stub-term-component")
          descriptionComponent=(component "stub-description-component")
        )
      )
    }}
  `);

  const descriptionListComponent = findAll(componentSelector);
  assert.equal(descriptionListComponent.length, 1, 'it renders a description list component');

  const termComponent = findAll(stubTermSelector);
  assert.equal(
    termComponent.length,
    1,
    'it renders a component passed as a `termComponent` attribute'
  );

  const descriptionComponent = findAll(stubDescriptionSelector);
  assert.equal(
    descriptionComponent.length,
    1,
    'it renders a component passed as a `descriptionComponent` attribute'
  );
});

test('it renders items with `term` and `description` components', function(assert) {
  this.render(hbs`
    {{polaris-description-list
      items=(array
        (hash
          term=(component "stub-term-component")
          description=(component "stub-description-component")
        )
      )
    }}
  `);

  const descriptionListComponent = findAll(componentSelector);
  assert.equal(descriptionListComponent.length, 1, 'it renders a description list component');

  const termComponent = findAll(stubTermSelector);
  assert.equal(
    termComponent.length,
    1,
    'it renders a component passed as a `termComponent` attribute'
  );

  const descriptionComponent = findAll(stubDescriptionSelector);
  assert.equal(
    descriptionComponent.length,
    1,
    'it renders a component passed as a `descriptionComponent` attribute'
  );
});
