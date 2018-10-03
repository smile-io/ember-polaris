import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

module('Integration | Component | render-content', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    // Register a simple component to test `render-content` with.
    this.owner.register(
      'component:my-component',
      Component.extend({
        classNames: ['my-test-component'],
        layout: hbs`{{text}}`,
      })
    );
  });

  test('it renders correctly when content is a string', async function(assert) {
    await render(hbs`
      <div id="render-content-test">
        {{render-content "blah"}}
      </div>
    `);

    assert.equal(find('#render-content-test').textContent.trim(), 'blah');
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

    assert.equal(find('.my-test-component').textContent.trim(), 'component content here');
  });

  test('it renders correctly when content is a component definition', async function(assert) {
    await render(hbs`
      {{render-content (component "my-component" text="component content here")}}
    `);

    assert.equal(find('.my-test-component').textContent.trim(), 'component content here');
  });
});
