import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-unstyled-link', function(hooks) {
  setupRenderingTest(hooks);

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
});
