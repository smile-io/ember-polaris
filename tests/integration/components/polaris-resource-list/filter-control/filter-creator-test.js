import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | polaris-resource-list/filter-control/filter-creator',
  function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(
        hbs`{{polaris-resource-list/filter-control/filter-creator}}`
      );

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await render(hbs`
      {{#polaris-resource-list/filter-control/filter-creator}}
        template block text
      {{/polaris-resource-list/filter-control/filter-creator}}
    `);

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  }
);
