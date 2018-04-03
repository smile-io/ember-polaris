import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-date-picker/day', 'Integration | Component | polaris date picker/day', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{polaris-date-picker/day}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#polaris-date-picker/day}}
      template block text
    {{/polaris-date-picker/day}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
