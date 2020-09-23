import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | polaris caption', function (hooks) {
  setupRenderingTest(hooks);

  const caption = 'Received April 21, 2017';
  const componentSelector = 'p.Polaris-Caption';

  test('it renders the correct HTML with inline usage', async function (assert) {
    this.set('text', caption);
    await render(hbs`{{polaris-caption text=text}}`);

    const captionNode = assert.dom(componentSelector);

    captionNode.exists('it renders the caption');
    captionNode.hasText(caption, 'it renders the correct caption text');
  });

  test('it renders the correct HTML with block usage', async function (assert) {
    this.set('caption', caption);
    await render(hbs`
      {{#polaris-caption}}
        {{caption}}
      {{/polaris-caption}}
    `);

    const captionNode = assert.dom(componentSelector);

    captionNode.exists('it renders the caption');
    captionNode.hasText(caption, 'it renders the correct caption text');
  });
});
