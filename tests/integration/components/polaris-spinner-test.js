import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const spinnerSelector = '[data-test-spinner]';

module('Integration | Component | polaris spinner', function(hooks) {
  setupRenderingTest(hooks);

  test('it uses the label as the aria-label for the spinner', async function(assert) {
    let label = 'Content is loading';

    this.set('label', label);

    await render(hbs`
      {{polaris-spinner
        accessibilityLabel=label
      }}
    `);
    assert.dom(spinnerSelector).hasAttribute('aria-label', label);
  });

  test('it renders a large spinner by default', async function(assert) {
    await render(hbs`
      {{polaris-spinner}}
    `);
    assert.dom(spinnerSelector).hasClass('Polaris-Spinner--sizeLarge');
  });

  test('it renders a large spinner when size is large', async function(assert) {
    await render(hbs`
      {{polaris-spinner
        size="large"
      }}
    `);
    assert.dom(spinnerSelector).hasClass('Polaris-Spinner--sizeLarge');
  });

  test('it renders a small spinner when size is small', async function(assert) {
    await render(hbs`
      {{polaris-spinner
        size="small"
      }}
    `);
    assert.dom(spinnerSelector).hasClass('Polaris-Spinner--sizeSmall');
  });

  test('it renders a small spinner when color is white even if size is large', async function(assert) {
    await render(hbs`
      {{polaris-spinner
        color="white"
        size="large"
      }}
    `);
    assert.dom(spinnerSelector).hasClass('Polaris-Spinner--sizeSmall');
  });

  test('it renders an inkLightest spinner when color is inkLightest', async function(assert) {
    await render(hbs`
      {{polaris-spinner
        color="inkLightest"
      }}
    `);
    assert.dom(spinnerSelector).hasClass('Polaris-Spinner--colorInkLightest');
  });

  test('it sets the role to status to denote advisory information to screen readers', async function(assert) {
    await render(hbs`
      {{polaris-spinner}}
    `);
    assert.dom(spinnerSelector).hasAttribute('role', 'status');
  });
});
