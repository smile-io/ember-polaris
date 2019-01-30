import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | render-content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    // Register a simple component to test `render-content` with.
    this.owner.register(
      'component:my-component',
      Component.extend({
        layout: hbs`{{text}}`,
        'data-test-my-component': true,
      })
    );
  });

  test('it renders correctly when content is a string', async function(assert) {
    await render(hbs`
      <div data-test-render-content>
        {{render-content "blah"}}
      </div>
    `);

    assert.dom('[data-test-render-content]').hasText('blah');

    await render(hbs`
      {{#render-content "blah"}}
        {{my-component text="neat!"}}
      {{/render-content}}
    `);

    assert.dom('[data-test-my-component]').hasText('neat!');
  });

  test('it renders correctly when content is a hash of component name and props', async function(assert) {
    await render(hbs`
      {{render-content
        (hash
          componentName="my-component"
          props=(hash
            text="component content here"
          )
        )
      }}
    `);

    assert.dom('[data-test-my-component]').hasText('component content here');
  });

  test('it renders correctly when content is a component definition', async function(assert) {
    await render(hbs`
      {{render-content (component "my-component" text="component content here")}}
    `);

    assert.dom('[data-test-my-component]').hasText('component content here');
  });
});
