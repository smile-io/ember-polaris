import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

module('Integration | Component | polaris caption', function(hooks) {
  setupRenderingTest(hooks);

  const caption = 'Received April 21, 2017';
  const componentSelector = 'p.Polaris-Caption';

  test('it renders the correct HTML with inline usage', async function(assert) {
    this.set('text', caption);
    await render(hbs`{{polaris-caption text=text}}`);

    const captionNode = find(componentSelector);

    assert.ok(captionNode, 'it renders the caption');
    assert.equal(
      captionNode.textContent.trim(),
      caption,
      'it renders the correct caption text'
    );
  });

  test('it renders the correct HTML with block usage', async function(assert) {
    this.set('caption', caption);
    await render(hbs`
      {{#polaris-caption}}
        {{caption}}
      {{/polaris-caption}}
    `);

    const captionNode = find(componentSelector);

    assert.ok(captionNode, 'it renders the caption');
    assert.equal(
      captionNode.textContent.trim(),
      caption,
      'it renders the correct caption text'
    );
  });
});
