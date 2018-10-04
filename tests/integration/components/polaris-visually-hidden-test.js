import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

module('Integration | Component | polaris visually hidden', function(hooks) {
  setupRenderingTest(hooks);

  const visuallyHiddenSelector = 'span.Polaris-VisuallyHidden';

  test('it renders the correct HTML in basic inline usage', async function(assert) {
    await render(
      hbs`{{polaris-visually-hidden text="Inline visually hidden content"}}`
    );

    const visuallyHiddens = findAll(visuallyHiddenSelector);
    assert.equal(
      visuallyHiddens.length,
      1,
      'renders one visually hidden component'
    );
    assert.equal(
      visuallyHiddens[0].textContent.trim(),
      'Inline visually hidden content',
      'renders correct visually hidden content'
    );
  });

  test('it renders the correct HTML in basic block usage', async function(assert) {
    await render(hbs`
      {{#polaris-visually-hidden}}
        Block visually hidden content
      {{/polaris-visually-hidden}}
    `);

    const visuallyHiddens = findAll(visuallyHiddenSelector);
    assert.equal(
      visuallyHiddens.length,
      1,
      'renders one visually hidden component'
    );
    assert.equal(
      visuallyHiddens[0].textContent.trim(),
      'Block visually hidden content',
      'renders correct visually hidden content'
    );
  });
});
