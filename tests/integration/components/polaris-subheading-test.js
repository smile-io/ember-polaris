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
  assert.equal($subheadings.attr('aria-label'), 'This is a subheading', 'inline with defaults - adds correct label');

  // Block form with element specified.
  this.render(hbs`
    {{#polaris-subheading tagName="u"}}
      This is an underlined subheading
    {{/polaris-subheading}}
  `);
  $subheadings = this.$(' > u.Polaris-Subheading');
  assert.equal($subheadings.length, 1, 'block with customisation - renders one underlined subheading');
  assert.equal($subheadings.text().trim(), 'This is an underlined subheading', 'block with customisation - renders correct text');
  // TODO: the react component uses the block content as the `aria-label`, but there's no clean way to do this in Ember...
  // assert.equal($subheadings.attr('aria-label'), 'This is an underlined subheading', 'block with customisation - adds correct label');
});
