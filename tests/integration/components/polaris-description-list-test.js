import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
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

module('Integration | Component | polaris description list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:stub-term-component', stubTermComponent);
    this.owner.register(
      'component:stub-description-component',
      stubDescriptionComponent
    );
  });

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
  const listItemsDescriptionsSelector = buildNestedSelector(
    componentSelector,
    'dt + dd'
  );

  test('it renders the correct HTML when items are passed in', async function(assert) {
    const itemsLength = items.length;

    this.set('items', items);
    await render(hbs`{{polaris-description-list items=items}}`);

    assert
      .dom(componentSelector)
      .exists({ count: 1 }, 'it renders a description list component');

    assert
      .dom(listItemsTermsSelector)
      .exists(
        { count: itemsLength },
        'it renders the correct number of terms within the list'
      );

    assert
      .dom(listItemsDescriptionsSelector)
      .exists(
        { count: itemsLength },
        'it renders the correct number of descriptions following terms'
      );
  });

  test('it renders items with explicit `termComponent` and `descriptionComponent` attributes', async function(assert) {
    await render(hbs`
      {{polaris-description-list
        items=(array
          (hash
            termComponent=(component "stub-term-component")
            descriptionComponent=(component "stub-description-component")
          )
        )
      }}
    `);

    assert
      .dom(componentSelector)
      .exists({ count: 1 }, 'it renders a description list component');

    assert
      .dom(stubTermSelector)
      .exists(
        { count: 1 },
        'it renders a component passed as a `termComponent` attribute'
      );

    assert
      .dom(stubDescriptionSelector)
      .exists(
        { count: 1 },
        'it renders a component passed as a `descriptionComponent` attribute'
      );
  });

  test('it renders items with `term` and `description` components', async function(assert) {
    await render(hbs`
      {{polaris-description-list
        items=(array
          (hash
            term=(component "stub-term-component")
            description=(component "stub-description-component")
          )
        )
      }}
    `);

    assert
      .dom(componentSelector)
      .exists({ count: 1 }, 'it renders a description list component');

    assert
      .dom(stubTermSelector)
      .exists(
        { count: 1 },
        'it renders a component passed as a `termComponent` attribute'
      );

    assert
      .dom(stubDescriptionSelector)
      .exists(
        { count: 1 },
        'it renders a component passed as a `descriptionComponent` attribute'
      );
  });
});
