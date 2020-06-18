import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | is-component-definition', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{if (is-component-definition inputValue) "yes" "no"}}`);
    assert
      .dom(this.element)
      .hasText('no', "returns false when it's not a component definition");

    await render(
      hbs`{{if (is-component-definition (component "polaris-heading" text="Text")) "yes" "no"}}`
    );
    assert
      .dom(this.element)
      .hasText('yes', "returns true when it's a component definition");
  });
});
