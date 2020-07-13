import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-unstyled-link', function(hooks) {
  setupRenderingTest(hooks);

  const linkSelector = '[data-test=unstyled-link]';

  module('external', function() {
    test('adds rel and target attributes', async function(assert) {
      await render(hbs`
        {{polaris-unstyled-link external=true url="https://shopify.com"}}
      `);
      assert.dom('a').hasAttribute('target', '_blank');
      assert.dom('a').hasAttribute('rel', 'noopener noreferrer');
    });
  });

  module('download', function() {
    test('adds true as a boolean attribute', async function(assert) {
      await render(hbs`
        {{polaris-unstyled-link download=true url="https://shopify.com"}}
      `);
      assert.dom('a').hasAttribute('download', 'true');
    });

    test('adds the provided string', async function(assert) {
      await render(hbs`
        {{polaris-unstyled-link download="file.txt" url="https://shopify.com"}}
      `);
      assert.dom('a').hasAttribute('download', 'file.txt');
    });

    test('does not add the attribute when not set', async function(assert) {
      await render(hbs`
        {{polaris-unstyled-link url="https://shopify.com"}}
      `);
      assert.dom('a').doesNotHaveAttribute('download');
    });
  });

  test('supports onClick action', async function(assert) {
    assert.expect(2);

    this.handleWrapperClick = () =>
      assert.notOk(true, "click event doesn't bubble");
    this.handleClick = (event) => {
      assert.ok(true, 'triggers @onClick handler');
      assert.notOk(event, 'does not curry click event to the @onClick handler');
    };

    await render(hbs`
      {{!-- template-lint-disable no-invalid-interactive--}}
      <div {{on "click" this.handleWrapperClick}}>
        <PolarisUnstyledLink
          data-test="unstyled-link"
          @onClick={{action handleClick}}
        />
      </div>
    `);

    await click(linkSelector);
  });

  test('supports passing data attributes', async function(assert) {
    await render(hbs`
      <PolarisUnstyledLink
        @dataTestId="test-deprecated-way"
        data-test-attribute="unstyled-link"
      />
    `);
    await render(hbs`
      <PolarisUnstyledLink
        @dataTestId="test-deprecated-way"
        data-test-attribute="unstyled-link"
      />
    `);

    assert
      .dom('[data-test="test-deprecated-way"]')
      .exists('passing deprecated dataTestId works');
    assert
      .dom('[data-test-attribute="unstyled-link"]')
      .exists('passing deprecated dataTestId works');
  });
});
