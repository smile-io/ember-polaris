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
