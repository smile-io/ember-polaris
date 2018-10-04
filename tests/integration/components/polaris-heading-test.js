import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

module('Integration | Component | polaris heading', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the correct HTML', async function(assert) {
    // Inline form with defaults.
    await render(hbs`{{polaris-heading text="This is a heading"}}`);

    let headingSelector = 'h2.Polaris-Heading';
    assert.equal(
      findAll(headingSelector).length,
      1,
      'inline with defaults - renders one h2 heading'
    );
    assert.equal(
      find(headingSelector).innerText,
      'This is a heading',
      'inline with defaults - renders correct text'
    );

    // Block form with element specified.
    await render(hbs`
      {{#polaris-heading tagName="em"}}
        This is an emphasised heading
      {{/polaris-heading}}
    `);

    headingSelector = 'em.Polaris-Heading';
    assert.dom(headingSelector).exists({ count: 1 });
    assert
      .dom(headingSelector)
      .hasText(
        'This is an emphasised heading',
        'block with customisation - renders correct text'
      );
  });
});
