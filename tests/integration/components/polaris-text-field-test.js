import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-text-field', 'Integration | Component | polaris text field', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Basic usage.
  this.render(hbs`{{polaris-text-field}}`);

  const textFieldSelector = 'div > div.Polaris-TextField';
  const textFields = findAll(textFieldSelector);
  assert.equal(textFields.length, 1, 'basic usage - renders one text field');

  const inputSelector = buildNestedSelector(textFieldSelector, 'input.Polaris-TextField__Input');
  const inputs = findAll(inputSelector);
  assert.equal(inputs.length, 1, 'basic usage - renders one input');

  const backdropSelector = buildNestedSelector(textFieldSelector, 'div.Polaris-TextField__Backdrop');
  const backdrops = findAll(backdropSelector);
  assert.equal(backdrops.length, 1, 'basic usage - renders one backdrop');
});
