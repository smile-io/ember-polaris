import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-subheading', 'Integration | Component | polaris subheading', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Inline form with defaults.
  this.render(hbs`{{polaris-subheading children="This is a subheading"}}`);

  let subheadings = findAll('h3.Polaris-Subheading');
  assert.equal(subheadings.length, 1, 'inline with defaults - renders one h3 subheading');

  let subheading = subheadings[0];
  assert.equal(subheading.textContent.trim(), 'This is a subheading', 'inline with defaults - renders correct text');
  assert.equal(subheading.attributes['aria-label'].value, 'This is a subheading', 'inline with defaults - adds correct label');

  // Block form with element specified.
  this.set('subheadingText', 'This is an underlined subheading');
  this.render(hbs`
    {{#polaris-subheading tagName="u"}}
      {{subheadingText}}
    {{/polaris-subheading}}
  `);

  const subheadingSelector = 'u.Polaris-Subheading';
  subheadings = findAll(subheadingSelector);
  assert.equal(subheadings.length, 1, 'block with customisation - renders one underlined subheading');

  subheading = subheadings[0];
  assert.equal(subheading.textContent.trim(), 'This is an underlined subheading', 'block with customisation - renders correct text');
  assert.equal(subheading.attributes['aria-label'].value, 'This is an underlined subheading', 'block with customisation - adds correct label');

  // Update the content of the subheading.
  this.set('subheadingText', 'This is an updated subheading');

  subheading = find(subheadingSelector);
  assert.equal(subheading.textContent.trim(), 'This is an updated subheading', 'updating block content - updates text');
  assert.equal(subheading.attributes['aria-label'].value, 'This is an updated subheading', 'updating block content - updates label');
});
