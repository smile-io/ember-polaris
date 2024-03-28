import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { Box } from '@smile-io/ember-polaris';

module('Integration | Component | box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Box data-test-box /></template>);

    assert.dom('[data-test-box]').hasText('');

    await render(
      <template>
        <Box data-test-box>
          template block text
        </Box>
      </template>
    );

    assert.dom('[data-test-box]').hasText('template block text');
  });

  test('it does not render custom properties by default', async function (assert) {
    await render(<template><Box data-test-box /></template>);
    assert.dom('[data-test-box]').doesNotHaveAttribute('style');
  });

  test('only renders the custom property that matches the property passed in', async function (assert) {
    await render(<template><Box data-test-box @paddingInlineStart="200" /></template>);
    assert.customDom('[data-test-box]').hasStyle({
      '--pc-box-padding-inline-start-xs': 'var(--p-space-200)',
    });
  });

  test('renders custom properties combined with any overrides if they are passed in', async function (assert) {
    await render(
      <template><Box data-test-box @padding="100" @paddingInlineStart="200" /></template>
    );

    assert.customDom('[data-test-box]').hasStyle({
      '--pc-box-padding-block-end-xs': 'var(--p-space-100)',
      '--pc-box-padding-block-start-xs': 'var(--p-space-100)',
      '--pc-box-padding-inline-end-xs': 'var(--p-space-100)',
      '--pc-box-padding-inline-start-xs': 'var(--p-space-200)',
    });
  });

  test('accepts padding based on breakpoints', async function (assert) {
    await render(<template><Box data-test-box @padding={{hash xs="200" md="800"}} /></template>);

    assert.customDom('[data-test-box]').hasStyle({
      '--pc-box-padding-block-end-md': 'var(--p-space-800)',
      '--pc-box-padding-block-end-xs': 'var(--p-space-200)',
      '--pc-box-padding-block-start-md': 'var(--p-space-800)',
      '--pc-box-padding-block-start-xs': 'var(--p-space-200)',
      '--pc-box-padding-inline-end-md': 'var(--p-space-800)',
      '--pc-box-padding-inline-end-xs': 'var(--p-space-200)',
      '--pc-box-padding-inline-start-md': 'var(--p-space-800)',
      '--pc-box-padding-inline-start-xs': 'var(--p-space-200)',
    });
  });

  test('renders the aria attributes that matches the aria attributes passed in', async function (assert) {
    await render(
      <template><Box data-test-box aria-required="true" aria-describedby="test" /></template>
    );

    assert.dom('[data-test-box]').hasAria('required', 'true');
    assert.dom('[data-test-box]').hasAria('describedby', 'test');
  });
});
