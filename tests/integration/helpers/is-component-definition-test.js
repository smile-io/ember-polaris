import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

function createMockGlimmerComponentDefinition() {
  return {
    [Symbol('INNER')]: {
      name: 'mock-component',
      ComponentClass: {},
      template: {},
      manager: {},
      state: {},
    },
  };
}

module('Integration | Helper | is-component-definition', function (hooks) {
  setupRenderingTest(hooks);

  test('it detects component definitions correctly', async function (assert) {
    await render(hbs`{{if (is-component-definition "1234") "yes" "no"}}`);
    assert
      .dom(this.element)
      .hasText(
        'no',
        'returns false when passed something other than a component definition'
      );

    await render(
      hbs`{{if (is-component-definition (component "polaris-heading" text="Text")) "yes" "no"}}`
    );
    assert
      .dom(this.element)
      .hasText('yes', 'returns true when passed a component definition');

    this.set(
      'glimmerComponentDefinition',
      createMockGlimmerComponentDefinition()
    );
    await render(
      hbs`{{if (is-component-definition this.glimmerComponentDefinition) "yes" "no"}}`
    );
    assert
      .dom(this.element)
      .hasText(
        'yes',
        'returns true when passed a Glimmer component definition'
      );
  });
});
