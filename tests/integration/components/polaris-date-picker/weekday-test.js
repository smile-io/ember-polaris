import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-date-picker/weekday', 'Integration | Component | polaris date picker/weekday', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{polaris-date-picker/weekday}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#polaris-date-picker/weekday}}
      template block text
    {{/polaris-date-picker/weekday}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
