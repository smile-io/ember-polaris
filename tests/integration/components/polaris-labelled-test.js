import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-labelled', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    // Register a simple component to test rendering with.
    this.owner.register(
      'component:my-component',
      Component.extend({
        classNames: ['my-component'],
      })
    );
  });

  test('passes relevant attrs along to the label', async function (assert) {
    await render(hbs`{{polaris-labelled id="my-label" label="Label"}}`);

    const labelSelector = '.Polaris-Label label';
    assert.dom(labelSelector).hasAttribute('id', 'my-labelLabel');
    assert.dom(labelSelector).hasText('Label');
  });

  test('renders error markup when provided with a value', async function (assert) {
    await render(
      hbs`{{polaris-labelled id="my-labelled" label="Label" error="Error message"}}`
    );

    assert.dom('#my-labelledError').hasText('Error message');
  });

  test('renders no error markup when provided with a boolean value', async function (assert) {
    await render(
      hbs`{{polaris-labelled id="my-labelled" label="Label" error=true}}`
    );

    assert.dom('.Polaris-InlineError').doesNotExist();
  });

  test('renders the content as a child outside of the label', async function (assert) {
    await render(hbs`
      {{#polaris-labelled}}
        {{my-component}}
      {{/polaris-labelled}}
    `);

    assert.dom('.my-component').exists();
  });

  test('renders a plain button with the specified attributes when given an action', async function (assert) {
    this.set('action', {
      text: 'My action',
      accessibilityLabel: 'My action with more description',
      onAction: () => this.set('actionFired', true),
    });
    await render(
      hbs`{{polaris-labelled id="MyLabelled" label="Label" primaryAction=action}}`
    );

    const actionButtonSelector = 'button.Polaris-Button';
    assert
      .dom(actionButtonSelector)
      .hasAttribute('aria-label', 'My action with more description');
    assert.dom(actionButtonSelector).hasClass('Polaris-Button--plain');
    assert.dom(actionButtonSelector).hasText('My action');

    await click(actionButtonSelector);
    assert.ok(this.get('actionFired'));
  });

  test('does not render any block-level elements in the label element when given an action', async function (assert) {
    await render(hbs`
      {{polaris-labelled
        id="MyThing"
        label="My thing"
        primaryAction=(hash
          text="My action"
          onAction=(action (mut actionFired) true)
        )
      }}
    `);

    assert.dom('label div').doesNotExist();
  });

  test('supports passing a data-test attribute', async function (assert) {
    await render(hbs`
      {{polaris-labelled dataTestLabelled=dataTestLabelled}}
    `);
    // Deprecated
    assert.dom('[data-test-labelled]').exists();

    this.set('dataTestLabelled', 'testing');
    // Deprecated
    assert.dom('[data-test-labelled=testing]').exists();

    await render(hbs`
      <PolarisLabelled data-test="labelled-testing" />
    `);
    assert.dom('[data-test=labelled-testing]').exists();
  });
});
