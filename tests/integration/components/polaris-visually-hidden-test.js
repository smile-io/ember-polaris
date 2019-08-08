import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris visually hidden', function(hooks) {
  setupRenderingTest(hooks);

  const visuallyHiddenSelector = '[data-test="visually-hidden-test"]';

  test('it renders the correct HTML in basic inline usage', async function(assert) {
    await render(hbs`
      <PolarisVisuallyHidden
        data-test="visually-hidden-test"
        @text="Inline visually hidden content"
      />
    `);

    const visuallyHidden = assert.dom(visuallyHiddenSelector);
    visuallyHidden.exists(
      { count: 1 },
      'renders one visually hidden component'
    );
    visuallyHidden.hasText(
      'Inline visually hidden content',
      'renders correct visually hidden content'
    );
  });

  test('it renders the correct HTML in basic block usage', async function(assert) {
    await render(hbs`
      <PolarisVisuallyHidden data-test="visually-hidden-test">
        Block visually hidden content
      </PolarisVisuallyHidden>
    `);

    const visuallyHidden = assert.dom(visuallyHiddenSelector);

    visuallyHidden.exists(
      { count: 1 },
      'renders one visually hidden component'
    );
    visuallyHidden.hasText(
      'Block visually hidden content',
      'renders correct visually hidden content'
    );
  });
});
