import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | no-op', function (hooks) {
  setupRenderingTest(hooks);

  test('It successfully renders and does nothing when clicked', async function (assert) {
    assert.expect(0);

    await render(hbs`<PolarisButton @onClick={{fn (no-op)}}></PolarisButton> `);
    await click('button');
  });
});
