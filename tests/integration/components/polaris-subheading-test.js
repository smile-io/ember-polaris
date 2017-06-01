import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-subheading', 'Integration | Component | polaris subheading', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Inline form with defaults.
  this.render(hbs`{{polaris-subheading children="This is a subheading"}}`);
  let $subheadings = this.$(' > h3.Polaris-Subheading');
  assert.equal($subheadings.length, 1, 'inline with defaults - renders one h3 subheading');
  assert.equal($subheadings.text().trim(), 'This is a subheading', 'inline with defaults - renders correct text');

  // Block form with element specified.
  this.render(hbs`
    {{#polaris-subheading tagName="u"}}
      This is an underlined subheading
    {{/polaris-subheading}}
  `);
  $subheadings = this.$(' > u.Polaris-Subheading');
  assert.equal($subheadings.length, 1, 'block with customisation - renders one underlined subheading');
  assert.equal($subheadings.text().trim(), 'This is an underlined subheading', 'block with customisation - renders correct text');
});
