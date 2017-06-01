import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-heading', 'Integration | Component | polaris heading', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Inline form with defaults.
  this.render(hbs`{{polaris-heading children="This is a heading"}}`);
  let $headings = this.$(' > h2.Polaris-Heading');
  assert.equal($headings.length, 1, 'inline with defaults - renders one h2 heading');
  assert.equal($headings.text().trim(), 'This is a heading', 'inline with defaults - renders correct text');

  // Block form with element specified.
  this.render(hbs`
    {{#polaris-heading tagName="em"}}
      This is an emphasised heading
    {{/polaris-heading}}
  `);
  $headings = this.$(' > em.Polaris-Heading');
  assert.equal($headings.length, 1, 'block with customisation - renders one emphasised heading');
  assert.equal($headings.text().trim(), 'This is an emphasised heading', 'block with customisation - renders correct text');
});
