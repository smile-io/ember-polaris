import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const defaultProps = {
  checked: true,
  disabled: false,
  id: 'checkboxId',
  name: 'Checkbox',
  value: 'checkbox',
};

module('Integration | Component | polaris-option-list/checkbox', function (
  hooks
) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('defaultProps', defaultProps);
  });

  test('sets pass through props for input', async function (assert) {
    await render(hbs`
        {{polaris-option-list/checkbox
          checked=defaultProps.checked
          disabled=defaultProps.disabled
          checkboxId=defaultProps.id
          name=defaultProps.name
          value=defaultProps.value
        }}
      `);

    assert.dom('input').hasAttribute('id', defaultProps.id);
    assert.dom('input').hasAttribute('name', defaultProps.name);
    assert.dom('input').hasValue(defaultProps.value);
  });

  test('calls onChange', async function (assert) {
    await render(hbs`
        {{polaris-option-list/checkbox
          checked=defaultProps.checked
          disabled=defaultProps.disabled
          checkboxId=defaultProps.id
          name=defaultProps.name
          value=defaultProps.value
          onChange=(action (mut wasOnChangeCalled) true)
        }}
      `);

    await triggerEvent('input', 'change');

    assert.ok(this.get('wasOnChangeCalled'));
  });
});
