import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | polaris subheading', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the correct HTML', async function (assert) {
    // Inline form with defaults.
    await render(hbs`{{polaris-subheading text="This is a subheading"}}`);

    let subheading = assert.dom('h3.Polaris-Subheading');
    subheading.exists(
      { count: 1 },
      'inline with defaults - renders one h3 subheading'
    );

    subheading.hasText(
      'This is a subheading',
      'inline with defaults - renders correct text'
    );
    subheading.hasAttribute(
      'aria-label',
      'This is a subheading',
      'inline with defaults - adds correct label'
    );

    // Block form with element specified.
    this.set('subheadingText', 'This is an underlined subheading');
    await render(hbs`
      {{#polaris-subheading tagName="u"}}
        {{subheadingText}}
      {{/polaris-subheading}}
    `);

    const subheadingSelector = 'u.Polaris-Subheading';
    subheading = assert.dom(subheadingSelector);
    subheading.exists(
      { count: 1 },
      'block with customisation - renders one underlined subheading'
    );

    subheading.hasText(
      'This is an underlined subheading',
      'block with customisation - renders correct text'
    );

    subheading.hasAttribute(
      'aria-label',
      'This is an underlined subheading',
      'block with customisation - adds correct label'
    );

    // Update the content of the subheading.
    this.set('subheadingText', 'This is an updated subheading');

    subheading = assert.dom(subheadingSelector);
    subheading.hasText(
      'This is an updated subheading',
      'updating block content - updates text'
    );

    subheading.hasAttribute(
      'aria-label',
      'This is an updated subheading',
      'updating block content - updates label'
    );
  });
});
