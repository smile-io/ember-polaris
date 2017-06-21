import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-text-field', 'Integration | Component | polaris text field', {
  integration: true
});

test('it renders the correct HTML', function(assert) {
  // Basic usage.
  this.set('value', '');
  this.render(hbs`
    {{polaris-text-field
      placeholder="Write something here!"
      value=value
    }}
  `);

  const textFieldSelector = 'div > div.Polaris-TextField';
  let textFields = findAll(textFieldSelector);
  assert.equal(textFields.length, 1, 'basic usage - renders one text field');

  let textField = textFields[0];
  assert.notOk(textField.classList.contains('Polaris-TextField--hasValue'), 'basic usage - does not apply hasValue class to text field when value is empty');


  const inputSelector = buildNestedSelector(textFieldSelector, 'input.Polaris-TextField__Input');
  let inputs = findAll(inputSelector);
  assert.equal(inputs.length, 1, 'basic usage - renders one input');

  let input = inputs[0];
  assert.equal(input.value, '', 'basic usage - input starts with empty value');
  assert.equal(input.placeholder, 'Write something here!', 'basic usage - sets placeholder');

  this.set('value', 'Some value or other');
  assert.ok(textField.classList.contains('Polaris-TextField--hasValue'), 'basic usage - applies hasValue class to text field after setting value');
  assert.equal(input.value, 'Some value or other', 'basic usage - input value updates after setting value');

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

  textField = find(textFieldSelector);
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


  // With an ID and name.
  this.render(hbs`{{polaris-text-field inputId="testTextFieldId" name="myNameIsBob"}}`);

  input = find(inputSelector);
  assert.equal(input.id, 'testTextFieldId', 'with ID and name - sets ID on input');
  assert.equal(input.name, 'myNameIsBob', 'with ID and name - sets name on input');


  // With a label.
  this.render(hbs`
    {{polaris-text-field
      inputId="labelledTextField"
      name="myNameIsJim"
      label="This is my label"
    }}
  `);

  const labelSelector = buildNestedSelector(
    'div',
    'div.Polaris-Labelled__LabelWrapper',
    'div.Polaris-Label',
    'label.Polaris-Label__Text'
  );

// test text field renders and has:
// aria-labelledby="labelledTextFieldLabel"

  const labels = findAll(labelSelector);
  assert.equal(labels.length, 1, 'with label - renders one label');

  const label = labels[0];
  assert.equal(label.textContent.trim(), 'This is my label', 'with label - renders correct label text');
  assert.equal(label.id, 'labelledTextFieldLabel', 'with label - gives label correct ID');
  assert.equal(label.attributes['for'].value, 'labelledTextField', 'with label - specifies label is for input');

  input = find(inputSelector);
  assert.equal(input.attributes['aria-labelledby'].value, 'labelledTextFieldLabel', 'with label - gives input correct aria-labelledby attribute');
});
