import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-text-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a text input by default', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('when `type` is numeric, it renders a spinner which changes the value on click', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it renders as a textarea when `multiline` is true', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it renders a link with an action when a `labelAction` hash is present', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it renders help text when `helpText` is present', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it renders a prefix and suffix when `prefix` or `suffix` is present', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it renders as a connected component when `connectedLeft` or `connectedRight` is present', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it renders validation errors when `error` is present', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it calls `handleChange` when input is changed', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it calls `handleFocus` when the container is focused', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it calls `handleBlur` when the container is blurred', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });

  test('it calls `handleClick` when the container is clicked', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        label="Hello"
        value=''
      }}
    `);
  });
});
