import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-thumbnail', 'Integration | Component | polaris thumbnail', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{polaris-thumbnail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#polaris-thumbnail}}
      template block text
    {{/polaris-thumbnail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
