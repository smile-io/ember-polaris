import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-heading', 'Integration | Component | polaris heading', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Inline form with defaults.
  this.render(hbs`{{polaris-heading text="This is a heading"}}`);

  let headingSelector = 'h2.Polaris-Heading';
  assert.equal(findAll(headingSelector).length, 1, 'inline with defaults - renders one h2 heading');
  assert.equal(find(headingSelector).innerText, 'This is a heading', 'inline with defaults - renders correct text');

  // Block form with element specified.
  this.render(hbs`
    {{#polaris-heading tagName="em"}}
      This is an emphasised heading
    {{/polaris-heading}}
  `);

  headingSelector = 'em.Polaris-Heading';
  assert.equal(findAll(headingSelector).length, 1, 'block with customisation - renders one emphasised heading');
  assert.equal(find(headingSelector).innerText, 'This is an emphasised heading', 'block with customisation - renders correct text');
});
