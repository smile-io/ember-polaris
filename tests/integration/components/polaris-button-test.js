import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-button', 'Integration | Component | polaris button', {
  integration: true
});

test('renders the correct HTML', function(assert) {
  // Basic button, using children attribute.
  this.render(hbs`{{polaris-button children="Look at my children"}}`);
  let buttonText = this.$('button.Polaris-Button > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Look at my children', 'basic button with children attribute - text');

  // Basic button, block form.
  this.render(hbs`{{#polaris-button}}Does this look blocky to you?{{/polaris-button}}`);
  buttonText = this.$('button.Polaris-Button > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Does this look blocky to you?', 'basic button in block form - text');

  // With a URL.
  this.render(hbs`{{#polaris-button url="http://www.somewhere.com/lets-go/"}}Links zwei drei vier{{/polaris-button}}`);
  buttonText = this.$('a.Polaris-Button > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Links zwei drei vier', 'link button - text');
  let linkUrl = this.$('a.Polaris-Button').attr('href');
  assert.equal(linkUrl, 'http://www.somewhere.com/lets-go/', 'link button - href');
});
