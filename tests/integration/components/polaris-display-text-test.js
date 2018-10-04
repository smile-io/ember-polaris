import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';

module('Integration | Component | polaris display text', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the correct HTML', async function(assert) {
    // Inline form with defaults.
    await render(hbs`{{polaris-display-text text="This is some text"}}`);

    let displayTextSelector =
      'p.Polaris-DisplayText.Polaris-DisplayText--sizeMedium';
    assert.equal(
      findAll(displayTextSelector).length,
      1,
      'inline with defaults - renders one display text paragraph'
    );
    assert.equal(
      find(displayTextSelector).innerText,
      'This is some text',
      'inline with defaults - renders correct text'
    );

    // Block form with element and size specified.
    await render(hbs`
      {{#polaris-display-text tagName="h3" size="extraLarge"}}
        This is some BIG text
      {{/polaris-display-text}}
    `);

    displayTextSelector =
      'h3.Polaris-DisplayText.Polaris-DisplayText--sizeExtraLarge';
    assert.equal(
      findAll(displayTextSelector).length,
      1,
      'block with customisation - renders one display text paragraph'
    );
    assert.equal(
      find(displayTextSelector).innerText,
      'This is some BIG text',
      'block with customisation - renders correct text'
    );
  });
});
