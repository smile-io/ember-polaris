import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | wrapper-element', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders block content', async function(assert) {
    await render(hbs`
      {{#wrapper-element tagName="my-element" my-attribute="hello"}}
        <div id="block-content">Content goes here</div>
      {{/wrapper-element}}
    `);

    assert.dom('my-element > div#block-content').hasText('Content goes here');
  });

  test('it passes arbitrary attributes to the rendered element', async function(assert) {
    await render(
      hbs`{{wrapper-element tagName="my-element" my-attribute="hello"}}`
    );

    assert.dom('my-element').hasAttribute('my-attribute', 'hello');
  });

  test('it does not blow up when an empty `tagName` is set', async function(assert) {
    await render(hbs`
      {{#wrapper-element tagName="" my-attribute="hello"}}
        <div id="block-content"></div>
      {{/wrapper-element}}
    `);

    assert.dom('div#block-content').exists();
  });
});
