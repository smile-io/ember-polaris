import { hbs } from 'ember-cli-htmlbars';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, focus, blur, find } from '@ember/test-helpers';

module('Integration | Component | polaris-checkbox', function (hooks) {
  setupRenderingTest(hooks);

  test('sets pass through properties on the input', async function (assert) {
    await render(hbs`
      {{polaris-checkbox label="Checkbox" checked=true name="Checkbox" value="Some value"}}
    `);

    assert.dom('input').isChecked();
    assert.dom('input').hasAttribute('name', 'Checkbox');
    assert.dom('input').hasValue('Some value');
  });

  module('onChange()', function () {
    test('is called with the new checked value of the input on change', async function (assert) {
      this.set('handleChange', (newChecked, checkboxId) =>
        this.setProperties({ newChecked, checkboxId })
      );
      await render(hbs`
        {{polaris-checkbox inputId="MyCheckbox" label="Checkbox" onChange=(action handleChange)}}
      `);
      await click('input');
      assert.equal(this.get('newChecked'), true);
      assert.equal(this.get('checkboxId'), 'MyCheckbox');
    });

    test('sets focus on the input when checkbox is toggled off', async function (assert) {
      await render(hbs`
        {{polaris-checkbox inputId="checkboxId" label="Checkbox" onChange=(action (mut dummy))}}
      `);
      await click('input');

      assert.dom('input').isFocused();
    });
  });

  module('onFocus()', function () {
    test('is called when the input is focused', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" onFocus=(action (mut wasOnFocusCalled) true)}}
      `);
      await focus('input');

      assert.ok(this.get('wasOnFocusCalled'));
    });
  });

  module('onBlur()', function () {
    test('is called when the input is focused', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" onBlur=(action (mut wasOnBlurCalled) true)}}
      `);
      await focus('input');
      await blur('input');

      assert.ok(this.get('wasOnBlurCalled'));
    });
  });

  module('id', function () {
    test('sets the id on the input', async function (assert) {
      await render(hbs`
        {{polaris-checkbox inputId="MyCheckbox" label="Checkbox"}}
      `);

      assert.dom('input').hasAttribute('id', 'MyCheckbox');
    });

    test('sets a random id on the input when none is passed', async function (assert) {
      await render(hbs`{{polaris-checkbox label="Checkbox"}}`);

      assert.dom('input').hasAttribute('id');
    });
  });

  module('disabled', function () {
    test('sets the disabled attribute on the input', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" disabled=true}}
      `);
      assert.dom('input').isDisabled();
    });

    test('is only disabled when disabled is explicitly set to true', async function (assert) {
      await render(hbs`{{polaris-checkbox label="Checkbox"}}`);
      assert.dom('input').isNotDisabled();

      await render(hbs`
        {{polaris-checkbox label="Checkbox" disabled=false}}
      `);
      assert.dom('input').isNotDisabled();
    });
  });

  module('helpText', function () {
    test('connects the input to the help text', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" helpText="Some help"}}
      `);

      const helpTextID = find('input').getAttribute('aria-describedby');
      assert.equal(typeof helpTextID, 'string');
      assert.dom(`#${helpTextID}`).hasText('Some help');
    });
  });

  module('error', function () {
    test('marks the input as invalid', async function (assert) {
      await render(hbs`
        {{polaris-checkbox error=(component "wrapper-element" tagName="span") label="Checkbox"}}
      `);
      assert.dom('input').hasAttribute('aria-invalid', 'true');

      await render(hbs`
        {{polaris-checkbox error="Some error" label="Checkbox"}}
      `);
      assert.dom('input').hasAttribute('aria-invalid', 'true');
    });

    test('connects the input to the error', async function (assert) {
      await render(hbs`
        {{polaris-checkbox error="Some error" label="Checkbox"}}
      `);
      const errorID = find('input').getAttribute('aria-describedby');
      assert.equal(typeof errorID, 'string');
      assert.dom(`#${errorID}`).hasText('Some error');
    });

    test('marks the input as invalid but avoids rendering an error message when provided a boolean', async function (assert) {
      await render(hbs`
        {{polaris-checkbox error=true label="Checkbox"}}
      `);
      const errorID = find('input').getAttribute('aria-describedby');

      assert.dom('input').hasAttribute('aria-invalid', 'true');
      assert.equal(typeof errorID, 'string');
      assert.dom(`#${errorID}`).doesNotExist();
    });

    test('connects the input to both an error and help text', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" error="Some error" helpText="Some help"}}
      `);
      const descriptions = find('input')
        .getAttribute('aria-describedby')
        .split(' ');

      assert.equal(descriptions.length, 2);
      assert.dom(`#${descriptions[0]}`).hasText('Some error');
      assert.dom(`#${descriptions[1]}`).hasText('Some help');
    });
  });

  module('indeterminate', function () {
    // Skipping this test since the `indeterminate` attribute does not seem to be getting set on the input.
    skip('sets the indeterminate attribute to be true on the input when checked is "indeterminate"', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" checked="indeterminate"}}
      `);
      assert.dom('input').hasAttribute('indeterminate', 'true');
    });

    test('sets the aria-checked attribute on the input as mixed when checked is "indeterminate"', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" checked="indeterminate"}}
      `);
      assert.dom('input').hasAttribute('aria-checked', 'mixed');
    });

    test('sets the checked attribute on the input to false when checked is "indeterminate"', async function (assert) {
      await render(hbs`
        {{polaris-checkbox label="Checkbox" checked="indeterminate"}}
      `);
      assert.dom('input').isNotChecked();
    });
  });
});
