import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris display text', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the correct HTML', async function(assert) {
    // Inline form with defaults.
    await render(hbs`{{polaris-display-text text="This is some text"}}`);

    let displayText = assert.dom(
      'p.Polaris-DisplayText.Polaris-DisplayText--sizeMedium'
    );

    displayText.exists(
      { count: 1 },
      'inline with defaults - renders one display text paragraph'
    );
    displayText.hasText(
      'This is some text',
      'inline with defaults - renders correct text'
    );

    // Block form with element and size specified.
    await render(hbs`
      {{#polaris-display-text tagName="h3" size="extraLarge"}}
        This is some BIG text
      {{/polaris-display-text}}
    `);

    displayText = assert.dom(
      'h3.Polaris-DisplayText.Polaris-DisplayText--sizeExtraLarge'
    );

    displayText.exists(
      { count: 1 },
      'block with customisation - renders one display text paragraph'
    );
    displayText.hasText(
      'This is some BIG text',
      'block with customisation - renders correct text'
    );
  });
});
