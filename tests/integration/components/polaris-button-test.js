import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-button', 'Integration | Component | polaris button', {
  integration: true
});

test('renders the correct HTML', function(assert) {
  // Basic button, using children attribute.
  this.render(hbs`{{polaris-button children="Look at my children"}}`);
  let $button = this.$(' > button.Polaris-Button');

  let buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Look at my children', 'basic button with children attribute - text');


  // Basic button, block form.
  this.render(hbs`{{#polaris-button}}Does this look blocky to you?{{/polaris-button}}`);
  $button = this.$(' > button.Polaris-Button');

  buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Does this look blocky to you?', 'basic button in block form - text');


  // With a URL.
  this.render(hbs`{{#polaris-button url="http://www.somewhere.com/lets-go/"}}Links zwei drei vier{{/polaris-button}}`);
  $button = this.$(' > a.Polaris-Button');

  buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Links zwei drei vier', 'link button - text');

  let linkHref = $button.attr('href');
  assert.equal(linkHref, 'http://www.somewhere.com/lets-go/', 'link button - href');

  let dataPolarisUnstyled = $button.attr('data-polaris-unstyled');
  assert.equal(dataPolarisUnstyled, 'true', 'link button - data-polaris-unstyled');

  let linkTarget = $button.attr('target');
  assert.equal(linkTarget, undefined, 'link button - target');

  let linkRel = $button.attr('rel');
  assert.equal(linkRel, undefined, 'link button - rel');


  // With a URL and external flag set.
  this.render(hbs`{{#polaris-button url="http://www.somewhere.com/lets-go/" external=true}}Links zwei drei vier{{/polaris-button}}`);
  $button = this.$(' > a.Polaris-Button');

  buttonText = $button.find(' > span.Polaris-Button__Content > span').text().trim();
  assert.equal(buttonText, 'Links zwei drei vier', 'external link button - text');

  linkHref = $button.attr('href');
  assert.equal(linkHref, 'http://www.somewhere.com/lets-go/', 'external link button - href');

  dataPolarisUnstyled = $button.attr('data-polaris-unstyled');
  assert.equal(dataPolarisUnstyled, 'true', 'external link button - data-polaris-unstyled');

  linkTarget = $button.attr('target');
  assert.equal(linkTarget, '_blank', 'external link button - target');

  linkRel = $button.attr('rel');
  assert.equal(linkRel, 'noopener noreferrer', 'external link button - rel');
});
