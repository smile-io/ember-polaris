import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-text-container', 'Integration | Component | polaris text container', {
  integration: true
});

const textContainerSelector = 'div.Polaris-TextContainer';

test('it renders the correct HTML in inline form', function(assert) {
  this.render(hbs`{{polaris-text-container text="This is some inline text"}}`);

  const textContainers = findAll(textContainerSelector);
  assert.equal(textContainers.length, 1, 'renders one text container');
  assert.equal(textContainers[0].textContent.trim(), 'This is some inline text', 'renders the correct content');
});

test('it renders the correct HTML in block form', function(assert) {
  this.render(hbs`{{#polaris-text-container}}This is some block text{{/polaris-text-container}}`);

  const textContainers = findAll(textContainerSelector);
  assert.equal(textContainers.length, 1, 'renders one text container');
  assert.equal(textContainers[0].textContent.trim(), 'This is some block text', 'renders the correct content');
});

test('it handles spacing correctly', function(assert) {
  this.render(hbs`{{polaris-text-container spacing=spacing}}`);

  const textContainers = findAll(textContainerSelector);
  assert.equal(textContainers.length, 1, 'renders one text container');

  const textContainer = textContainers[0];
  assert.notOk(textContainer.classList.contains('Polaris-TextContainer--spacingLoose'), 'unset spacing - does not apply loose spacing class');
  assert.notOk(textContainer.classList.contains('Polaris-TextContainer--spacingTight'), 'unset spacing - does not apply tight spacing class');

  this.set('spacing', 'loose');
  assert.ok(textContainer.classList.contains('Polaris-TextContainer--spacingLoose'), 'loose spacing - applies loose spacing class');
  assert.notOk(textContainer.classList.contains('Polaris-TextContainer--spacingTight'), 'loose spacing - does not apply tight spacing class');

  this.set('spacing', 'tight');
  assert.notOk(textContainer.classList.contains('Polaris-TextContainer--spacingLoose'), 'tight spacing - does not apply loose spacing class');
  assert.ok(textContainer.classList.contains('Polaris-TextContainer--spacingTight'), 'tight spacing - applies tight spacing class');

  this.set('spacing', 'unsupported');
  assert.notOk(textContainer.classList.contains('Polaris-TextContainer--spacingLoose'), 'unsupported spacing - does not apply loose spacing class');
  assert.notOk(textContainer.classList.contains('Polaris-TextContainer--spacingTight'), 'unsupported spacing - does not apply tight spacing class');
});
