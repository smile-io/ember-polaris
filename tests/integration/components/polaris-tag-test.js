import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

module('Integration | Component | polaris tag', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  const tag = 'Wholesale';
  const tagSelector = '[data-test-tag]';
  const tagTextSelector = '[data-test-tag-text]';
  const tagButtonSelector = '[data-test-tag-button]';
  const tagButtonIconSelector = '[data-test-tag-button-icon]';
  // const buttonSelector = 'button.Polaris-Tag__Button';
  // const iconSelector = 'span.Polaris-Icon';

  // const tagValueSelector = buildNestedSelector(componentSelector, 'span');
  // const tagButtonSelector = buildNestedSelector(
  //   componentSelector,
  //   buttonSelector
  // );
  // const tagIconSelector = buildNestedSelector(buttonSelector, iconSelector);

  const usageTests = {
    inline: hbs`{{polaris-tag text=text}}`,
    block: hbs`
      {{#polaris-tag}}
        {{text}}
      {{/polaris-tag}}
    `,
  };

  Object.keys(usageTests).forEach((usage) => {
    test(`it renders the correct HTML in ${usage} usage`, async function(assert) {
      this.set('text', tag);
      await render(usageTests[usage]);

      assert.dom(tagSelector).exists('renders the tag component');
      assert
        .dom(buildNestedSelector(tagSelector, tagTextSelector))
        .exists('renders the tag text');
      assert.dom(tagTextSelector).hasText(tag, 'renders the correct tag text');
      assert
        .dom(tagTextSelector)
        .hasAttribute('title', tag, 'tag text has correct title attribute');
      assert
        .dom(tagTextSelector)
        .hasClass('Polaris-Tag__TagText', 'tag text has correct class applied');

      assert
        .dom(buildNestedSelector(tagSelector, tagButtonSelector))
        .exists('renders tag button');
      assert
        .dom(tagButtonSelector)
        .hasAttribute(
          'aria-label',
          `Remove ${tag}`,
          'button has correct aria-label'
        );
      assert
        .dom(buildNestedSelector(tagButtonSelector, tagButtonIconSelector))
        .exists('renders button icon');
      assert
        .dom(buildNestedSelector(tagButtonIconSelector, 'svg'))
        .hasAttribute(
          'data-icon-source',
          'polaris/cancel-small',
          'it uses the correct polaris/cancel-small icon as the icon source'
        );
    });
  });

  test('it handles the disabled attribute correctly', async function(assert) {
    await render(hbs`{{polaris-tag disabled=disabled}}`);

    // Check the component when no value for `disabled` is given.
    assert
      .dom(tagSelector)
      .hasNoClass(
        'Polaris-Tag--disabled',
        'when disabled is not specified - does not apply disabled class to the tag'
      );
    assert
      .dom(tagButtonSelector)
      .hasNoAttribute(
        'disabled',
        'when disabled is not specified - does not disable the remove button'
      );

    // Specify that the tag's disabled and check the component again.
    this.set('disabled', true);
    assert
      .dom(tagSelector)
      .hasClass(
        'Polaris-Tag--disabled',
        'when disabled is specified - applies disabled class to tag'
      );
    assert
      .dom(tagButtonSelector)
      .hasAttribute(
        'disabled',
        '',
        'when disabled is specified - disables the remove button'
      );
  });

  test('it calls an `onRemove` action when the button is clicked', async function(assert) {
    this.set('remove', () => {
      assert.ok('button clicked - onRemove action is called');
    });

    await render(hbs`
      {{polaris-tag
        onRemove=(action remove)
      }}
    `);

    await click(tagButtonSelector);
  });
});
