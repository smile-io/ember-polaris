import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-text-field', 'Integration | Component | polaris text field', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Basic usage.
  this.set('value', 'Some initial text');
  this.render(hbs`
    {{polaris-text-field
      placeholder="Write something here!"
      value=value
    }}
  `);

  const textFieldSelector = 'div > div.Polaris-TextField';
  let textFields = findAll(textFieldSelector);
  assert.equal(textFields.length, 1, 'basic usage - renders one text field');

  const inputSelector = buildNestedSelector(textFieldSelector, 'input.Polaris-TextField__Input');
  let inputs = findAll(inputSelector);
  assert.equal(inputs.length, 1, 'basic usage - renders one input');

  let input = inputs[0];
  assert.equal(input.value, 'Some initial text', 'basic usage - sets initial text');
  assert.equal(input.placeholder, 'Write something here!', 'basic usage - sets placeholder');

  const backdropSelector = buildNestedSelector(textFieldSelector, 'div.Polaris-TextField__Backdrop');
  let backdrops = findAll(backdropSelector);
  assert.equal(backdrops.length, 1, 'basic usage - renders one backdrop');


  // Test disabling input.
  this.set('disabled', false);
  this.render(hbs`
    {{polaris-text-field
      disabled=disabled
    }}
  `);

  let textField = find(textFieldSelector);
  input = find(inputSelector);

  assert.notOk(textField.classList.contains('Polaris-TextField--disabled'), 'disabled=false - does not apply disabled class to text field');
  assert.notOk(input.disabled, 'disabled=false - does not disable input');

  this.set('disabled', true);
  assert.ok(textField.classList.contains('Polaris-TextField--disabled'), 'disabled=true - applies disabled class to text field');
  assert.ok(input.disabled, 'disabled=true - disables input');


  // Test read-only mode.
  this.set('readOnly', false);
  this.render(hbs`
    {{polaris-text-field
      readOnly=readOnly
    }}
  `);

  textField = find(textFieldSelector);
  input = find(inputSelector);

  assert.notOk(textField.classList.contains('Polaris-TextField--readOnly'), 'readOnly=false - does not apply read-only class to text field');
  assert.notOk(input.readOnly, 'readOnly=false - does not add read-only attribute to input');

  this.set('readOnly', true);
  assert.ok(textField.classList.contains('Polaris-TextField--readOnly'), 'readOnly=true - applies read-only class to text field');
  assert.ok(input.readOnly, 'readOnly=true - adds read-only attribute to input');


  // With a label.
  // this.render(hbs`{{polaris-text-field label="This is my label"}}`);
  //
  // const labelSelector = buildNestedSelector(
  //   'div',
  //   'div.Polaris-Labelled__LabelWrapper',
  //   'div.Polaris-Label',
  //   'label.Polaris-Label__Text'
  // );
  // const labels = findAll(labelSelector);
  // assert.equal(textFields.length, 1, 'basic usage with label - renders one label');
  // assert.equal(textFields[0].textContent.trim(), 'This is my label', 'basic usage with label - renders correct label text');
  //
  // textFields = findAll(textFieldSelector);
  // assert.equal(textFields.length, 1, 'basic usage with label - renders one text field');
  //
  // inputs = findAll(inputSelector);
  // assert.equal(inputs.length, 1, 'basic usage with label - renders one input');
  //
  // backdrops = findAll(backdropSelector);
  // assert.equal(backdrops.length, 1, 'basic usage with label - renders one backdrop');
});
