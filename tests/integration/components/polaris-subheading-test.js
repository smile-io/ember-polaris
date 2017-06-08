import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-subheading', 'Integration | Component | polaris subheading', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Inline form with defaults.
  this.render(hbs`{{polaris-subheading children="This is a subheading"}}`);

  let subheadings = findAll('h3.Polaris-Subheading');
  assert.equal(subheadings.length, 1, 'inline with defaults - renders one h3 subheading');

  let subheading = subheadings[0];
  assert.equal(subheading.innerText.toLowerCase(), 'this is a subheading', 'inline with defaults - renders correct text');
  assert.equal(subheading.attributes['aria-label'].value, 'This is a subheading', 'inline with defaults - adds correct label');

  // Block form with element specified.
  this.render(hbs`
    {{#polaris-subheading tagName="u"}}
      This is an underlined subheading
    {{/polaris-subheading}}
  `);

  subheadings = findAll('u.Polaris-Subheading');
  assert.equal(subheadings.length, 1, 'block with customisation - renders one underlined subheading');

  subheading = subheadings[0];
  assert.equal(subheading.innerText.toLowerCase(), 'this is an underlined subheading', 'block with customisation - renders correct text');
  // TODO: the react component uses the block content as the `aria-label`, but there's no clean way to do this in Ember...
  // assert.equal($subheadings.attributes['aria-label'].value, 'This is an underlined subheading', 'block with customisation - adds correct label');
});
