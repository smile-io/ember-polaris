import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

const headingSelector = '[data-test-polaris-heading]';

module('Integration | Component | polaris heading', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the correct HTML', async function (assert) {
    // Inline form with defaults.
    await render(hbs`{{polaris-heading text="This is a heading"}}`);

    assert
      .dom(headingSelector)
      .exists({ count: 1 }, 'inline with defaults - renders one h2 heading');
    assert
      .dom(headingSelector)
      .hasText(
        'This is a heading',
        'inline with defaults - renders correct text'
      );
    assert.dom(headingSelector).hasTagName('h2', 'renders correct element');

    // Block form with element specified using deprecated form
    await render(hbs`
      {{#polaris-heading tagName="em"}}
        This is an emphasised heading
      {{/polaris-heading}}
    `);

    assert
      .dom(headingSelector)
      .hasText(
        'This is an emphasised heading',
        'block with customisation - renders correct text'
      );
    assert
      .dom(headingSelector)
      .hasTagName('em', 'block with customisation - renders correct element');

    await render(hbs`
      <PolarisHeading @htmlTag="em">
        This is an emphasised heading
      </PolarisHeading>
    `);

    assert
      .dom(headingSelector)
      .hasText(
        'This is an emphasised heading',
        'block with customisation - renders correct text'
      );
    assert
      .dom(headingSelector)
      .hasTagName('em', 'block with customisation - renders correct element');
  });
});
