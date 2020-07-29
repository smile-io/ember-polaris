import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

module('Integration | Component | polaris tag', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  const tag = 'Wholesale';
  const tagSelector = '[data-test-tag]';
  const tagTextSelector = '[data-test-tag-text]';
  const tagButtonSelector = '[data-test-tag-button]';
  const tagButtonIconSelector = '[data-test-tag-button-icon]';

  const usageTests = {
    inline: hbs`{{polaris-tag text=text}}`,
    block: hbs`
      {{#polaris-tag}}
        {{text}}
      {{/polaris-tag}}
    `,
  };

  Object.keys(usageTests).forEach((usage) => {
    test(`it renders the correct HTML in ${usage} usage`, async function (assert) {
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
        .doesNotExist('does not render a tag button');

      this.set('text', 'Retail');
      assert
        .dom(tagTextSelector)
        .hasAttribute(
          'title',
          'Retail',
          'tag text has correct title attribute after tag change'
        );
    });
  });

  test('it handles the disabled attribute correctly', async function (assert) {
    this.set('remove', () => {});

    await render(
      hbs`{{polaris-tag disabled=disabled onRemove=(action remove)}}`
    );

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

  test('it handles tag removing correctly', async function (assert) {
    this.set('remove', () => {
      assert.ok('button clicked - onRemove action is called');
    });
    this.set('tag', tag);

    await render(hbs`
      {{polaris-tag
        text=tag
        onRemove=(action remove)
      }}
    `);

    await click(tagButtonSelector);

    assert
      .dom(buildNestedSelector(tagSelector, tagButtonSelector))
      .exists('renders a tag button');
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
