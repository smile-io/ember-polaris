import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module(
  'Integration | Component | polaris-resource-list/filter-control/date-selector',
  function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`{{polaris-resource-list/filter-control/date-selector}}`);

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await render(hbs`
      {{#polaris-resource-list/filter-control/date-selector}}
        template block text
      {{/polaris-resource-list/filter-control/date-selector}}
    `);

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  }
);
