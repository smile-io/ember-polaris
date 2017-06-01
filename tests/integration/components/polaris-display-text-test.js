import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-display-text', 'Integration | Component | polaris display text', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Inline form with defaults.
  this.render(hbs`{{polaris-display-text children="This is some text"}}`);
  let $displayTexts = this.$(' > p.Polaris-DisplayText.Polaris-DisplayText--sizeMedium');
  assert.equal($displayTexts.length, 1, 'inline with defaults - renders one display text paragraph');
  assert.equal($displayTexts.text().trim(), 'This is some text', 'inline with defaults - renders correct text');

  // Block form with element and size specified.
  this.render(hbs`
    {{#polaris-display-text tagName="h3" size="extraLarge"}}
      This is some BIG text
    {{/polaris-display-text}}
  `);
  $displayTexts = this.$(' > h3.Polaris-DisplayText.Polaris-DisplayText--sizeExtraLarge');
  assert.equal($displayTexts.length, 1, 'block with customisation - renders one display text paragraph');
  assert.equal($displayTexts.text().trim(), 'This is some BIG text', 'block with customisation - renders correct text');
});
