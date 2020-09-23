import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris form layout', function (hooks) {
  setupRenderingTest(hooks);

  const formLayoutSelector = '[data-test-form-layout]';
  const formLayoutItemSelector = '[data-test-form-layout-item]';
  const formLayoutGroupSelector = '[data-test-form-layout-group]';
  const formLayoutGroupItemsSelector = '[data-test-form-layout-group-items]';
  const formLayoutGroupTitleSelector = '[data-test-form-layout-group-title]';
  const formLayoutGroupHelpTextSelector =
    '[data-test-form-layout-group-helpText]';

  test('it renders the correct HTML in basic usage', async function (assert) {
    await render(hbs`
      {{#polaris-form-layout as |formLayout|}}
        {{#formLayout.item}}
          <div>Item 1</div>
        {{/formLayout.item}}

        <div>Item 2</div>
      {{/polaris-form-layout}}
    `);

    assert.dom(formLayoutSelector).exists('renders the form layout');
    assert
      .dom(buildNestedSelector(formLayoutSelector, formLayoutItemSelector))
      .exists({ count: 2 }, 'renders the form layout items');

    // Check the first item.
    assert
      .dom(`${formLayoutItemSelector}:nth-child(1)`)
      .hasText('Item 1', 'first item - has the correct content');
    // Check the second item.
    assert
      .dom(`${formLayoutItemSelector}:nth-child(2)`)
      .hasText('Item 2', 'second item - has the correct content');
  });

  test('it renders the correct HTML when using groups', async function (assert) {
    this.setProperties({
      title: 'Group title',
      helpText: 'Group helpText',
      firstGroupId: 'firstGroupId',
    });

    await render(hbs`
      {{#polaris-form-layout as |formLayout|}}
        {{#formLayout.group
          id=firstGroupId
          title=title
          helpText=helpText
          as |group|
        }}
          {{#group.item}}
            <div>Default group item 1</div>
          {{/group.item}}

          <div>Default group item 2</div>
        {{/formLayout.group}}

        {{#formLayout.group condensed=true}}
          <div>Condensed group item</div>
        {{/formLayout.group}}
      {{/polaris-form-layout}}
    `);

    assert
      .dom(formLayoutItemSelector)
      .exists({ count: 3 }, 'renders the form layout items');
    assert
      .dom(formLayoutGroupSelector)
      .exists({ count: 2 }, 'renders the form layout groups');

    // Check the first group.
    let firstGroupSelector = `${formLayoutGroupSelector}:nth-child(1)`;
    assert
      .dom(firstGroupSelector)
      .hasNoClass(
        'Polaris-FormLayout--condensed',
        'first group - does not have condensed class'
      );
    assert
      .dom(firstGroupSelector)
      .hasClass(
        'Polaris-FormLayout--grouped',
        'first group - has grouped class'
      );
    assert
      .dom(firstGroupSelector)
      .hasAttribute(
        'aria-describedby',
        `${this.firstGroupId}HelpText`,
        'first group - has correct aria-describedby'
      );
    assert
      .dom(firstGroupSelector)
      .hasAttribute(
        'aria-labelledby',
        `${this.firstGroupId}Title`,
        'first group - has correct aria-labelledby'
      );
    assert
      .dom(
        buildNestedSelector(firstGroupSelector, formLayoutGroupTitleSelector)
      )
      .hasText(this.title, 'first group - renders group title');
    assert
      .dom(
        buildNestedSelector(firstGroupSelector, formLayoutGroupHelpTextSelector)
      )
      .hasText(this.helpText, 'first group - renders group helpText');

    let firstGroupItemSelector = buildNestedSelector(
      firstGroupSelector,
      formLayoutGroupItemsSelector,
      formLayoutItemSelector
    );
    assert
      .dom(firstGroupItemSelector)
      .exists(
        { count: 2 },
        'first group - renders the correct number of items'
      );

    assert
      .dom(`${firstGroupItemSelector}:nth-child(1)`)
      .hasText(
        'Default group item 1',
        'first group item 1 - renders the correct content'
      );
    assert
      .dom(`${firstGroupItemSelector}:nth-child(2)`)
      .hasText(
        'Default group item 2',
        'first group item 2 - renders the correct content'
      );

    // Check the second group.
    let secondGroupSelector = `${formLayoutGroupSelector}:nth-child(2)`;
    assert
      .dom(secondGroupSelector)
      .hasClass(
        'Polaris-FormLayout--condensed',
        'second group - has condensed class'
      );
    assert
      .dom(secondGroupSelector)
      .hasNoClass(
        'Polaris-FormLayout--grouped',
        'second group - does not have grouped class'
      );
    let secondGroupItemSelector = buildNestedSelector(
      secondGroupSelector,
      formLayoutGroupItemsSelector,
      formLayoutItemSelector
    );
    assert
      .dom(secondGroupItemSelector)
      .exists('second group - renders the correct number of items');
    assert
      .dom(`${secondGroupItemSelector}:nth-child(1)`)
      .hasText(
        'Condensed group item',
        'second group item 1 - renders the correct content'
      );
  });
});
