import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-label', function (hooks) {
  setupRenderingTest(hooks);

  test('it uses the ID as the for attribute', async function (assert) {
    await render(hbs`{{polaris-label id="MyThing"}}`);
    assert.dom('.Polaris-Label label').hasAttribute('for', 'MyThing');
  });

  test('it creates an ID for the label from the ID of the connected resource', async function (assert) {
    await render(hbs`{{polaris-label id="MyThing"}}`);
    assert.dom('.Polaris-Label label').hasAttribute('id', 'MyThingLabel');
  });
});
