import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-sticky', function (hooks) {
  setupRenderingTest(hooks);

  test('renders children component', async function (assert) {
    await render(hbs`
      {{#polaris-sticky}}
        <h1>Hello</h1>
      {{/polaris-sticky}}
    `);

    assert.dom('h1').exists();
  });

  test('renders a function as child component with a boolean argument set to false by default', async function (assert) {
    await render(hbs`
      {{#polaris-sticky as |sticky|}}
        {{#if (eq sticky.isSticky false)}}
          <h1>it worked!</h1>
        {{else}}
          <h2>it didn't</h2>
        {{/if}}
      {{/polaris-sticky}}
    `);

    assert.dom('h1').exists();
    assert.dom('h2').doesNotExist();
  });
});
