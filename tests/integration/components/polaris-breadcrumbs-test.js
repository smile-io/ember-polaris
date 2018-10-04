import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const content = 'Content value';

module('Integration | Component | polaris-breadcrumbs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('breadcrumbs', [
      {
        content,
        url: '/',
      },
    ]);

    await render(hbs`
      {{polaris-breadcrumbs breadcrumbs=breadcrumbs}}
    `);

    assert.dom('[data-test-breadcrumbs]').exists('component renders');
    assert.dom('[data-test-breadcrumb-icon]').exists('icon renders');
    assert.dom('[data-test-breadcrumb-content]').exists('content renders');

    assert
      .dom('[data-test-breadcrumb-content]')
      .hasText(content, 'has correct content text');
  });

  test('it renders an unstyled link when `breadcrumb.url` attribute is present', async function(assert) {
    this.set('breadcrumbs', [
      {
        content,
        url: '/',
      },
    ]);

    await render(hbs`
      {{polaris-breadcrumbs breadcrumbs=breadcrumbs}}
    `);

    assert
      .dom('[data-test-breadcrumbs] > a[data-polaris-unstyled]')
      .exists('it renders an unstyled link component');
  });

  test('it renders a button when `breadcrumb.url` attribute is not present', async function(assert) {
    this.set('breadcrumbs', [
      {
        content,
        onAction() {},
      },
    ]);

    await render(hbs`
      {{polaris-breadcrumbs breadcrumbs=breadcrumbs}}
    `);

    assert
      .dom('[data-test-breadcrumbs] > button')
      .exists('it renders a button');
  });
});
