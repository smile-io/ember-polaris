import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-date-picker/month', 'Integration | Component | polaris date picker/month', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{polaris-date-picker/month}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#polaris-date-picker/month}}
      template block text
    {{/polaris-date-picker/month}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
