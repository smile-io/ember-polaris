import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-button', 'Integration | Component | polaris button', {
  integration: true
});

test('uses the right class names', function(assert) {
  // Basic button.
  this.render(hbs`{{#polaris-button}}Add product{{/polaris-button}}`);
  assert.equal(this.$('.Polaris-Button .Polaris-Button__Content').text().trim(), 'Add product');
});
