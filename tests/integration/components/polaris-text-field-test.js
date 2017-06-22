import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, focus, blur, fillIn } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-text-field', 'Integration | Component | polaris text field', {
  integration: true
});

// Common selectors.
const textFieldSelector = 'div > div.Polaris-TextField';
const labelWrapperSelector = buildNestedSelector('div', 'div.Polaris-Labelled__LabelWrapper');
const inputSelector = buildNestedSelector(textFieldSelector, 'input.Polaris-TextField__Input');

test('it renders the correct HTML in basic usage', function(assert) {
  this.set('value', '');
  this.render(hbs`
    {{polaris-text-field
      placeholder="Write something here!"
      value=value
    }}
  `);

  const textFields = findAll(textFieldSelector);
  assert.equal(textFields.length, 1, 'renders one text field');

  const textField = textFields[0];
  assert.notOk(textField.classList.contains('Polaris-TextField--hasValue'), 'does not apply hasValue class to text field when value is empty');

  const labelWrappers = findAll(labelWrapperSelector);
  assert.equal(labelWrappers.length, 0, 'does not render anything label-related');

  const inputs = findAll(inputSelector);
  assert.equal(inputs.length, 1, 'renders one input');

  const input = inputs[0];
  assert.equal(input.value, '', 'input starts with empty value');
  assert.equal(input.placeholder, 'Write something here!', 'sets placeholder');

  this.set('value', 'Some value or other');
  assert.ok(textField.classList.contains('Polaris-TextField--hasValue'), 'applies hasValue class to text field after setting value');
  assert.equal(input.value, 'Some value or other', 'input value updates after setting value');

  const backdropSelector = buildNestedSelector(textFieldSelector, 'div.Polaris-TextField__Backdrop');
  const backdrops = findAll(backdropSelector);
  assert.equal(backdrops.length, 1, 'renders one backdrop');
});


test('it renders the correct HTML when using the disabled attribute', function(assert) {
  this.set('disabled', false);
  this.render(hbs`
    {{polaris-text-field
      disabled=disabled
    }}
  `);

  const textField = find(textFieldSelector);
  const input = find(inputSelector);

  assert.notOk(textField.classList.contains('Polaris-TextField--disabled'), 'disabled=false - does not apply disabled class to text field');
  assert.notOk(input.disabled, 'disabled=false - does not disable input');

  this.set('disabled', true);
  assert.ok(textField.classList.contains('Polaris-TextField--disabled'), 'disabled=true - applies disabled class to text field');
  assert.ok(input.disabled, 'disabled=true - disables input');
});

test('it renders the correct HTML when using the readOnly attribute', function(assert) {
  this.set('readOnly', false);
  this.render(hbs`
    {{polaris-text-field
      readOnly=readOnly
    }}
  `);

  const textField = find(textFieldSelector);
  const input = find(inputSelector);

  assert.notOk(textField.classList.contains('Polaris-TextField--readOnly'), 'readOnly=false - does not apply read-only class to text field');
  assert.notOk(input.readOnly, 'readOnly=false - does not add read-only attribute to input');

  this.set('readOnly', true);
  assert.ok(textField.classList.contains('Polaris-TextField--readOnly'), 'readOnly=true - applies read-only class to text field');
  assert.ok(input.readOnly, 'readOnly=true - adds read-only attribute to input');
});

test('it renders the correct HTML when using the inputId and name attributes', function(assert) {
  this.render(hbs`{{polaris-text-field inputId="testTextFieldId" name="myNameIsBob"}}`);

  const input = find(inputSelector);
  assert.equal(input.id, 'testTextFieldId', 'sets ID on input');
  assert.equal(input.name, 'myNameIsBob', 'sets name on input');
});

test('it renders the correct HTML when using a label', function(assert) {
  this.render(hbs`
    {{polaris-text-field
      inputId="labelledTextField"
      name="myNameIsJim"
      label="This is my label"
    }}
  `);

  const labelSelector = buildNestedSelector(
    labelWrapperSelector,
    'div.Polaris-Label',
    'label.Polaris-Label__Text'
  );

  const labels = findAll(labelSelector);
  assert.equal(labels.length, 1, 'renders one label');

  const label = labels[0];
  assert.equal(label.textContent.trim(), 'This is my label', 'renders correct label text');
  assert.equal(label.id, 'labelledTextFieldLabel', 'gives label correct ID');
  assert.equal(label.attributes['for'].value, 'labelledTextField', 'specifies label is for input');

  const input = find(inputSelector);
  assert.equal(input.attributes['aria-labelledby'].value, 'labelledTextFieldLabel', 'gives input correct aria-labelledby attribute');
});

test('handles events correctly', function(assert) {
  let changeHandlerCalled = false;
  let value = '';
  this.on('change', (updatedValue) => {
    changeHandlerCalled = true;
    value = updatedValue;
  });

  let focusHandlerCalled = false;
  this.on('focus', () => {
    focusHandlerCalled = true;
  });

  let blurHandlerCalled = false;
  this.on('blur', () => {
    blurHandlerCalled = true;
  });

  this.render(hbs`
    {{polaris-text-field
      onChange=(action "change")
      onFocus=(action "focus")
      onBlur=(action "blur")
    }}
  `);

  assert.notOk(changeHandlerCalled, 'after render, change handler not fired');
  assert.notOk(focusHandlerCalled, 'after render, focus handler not fired');
  assert.notOk(blurHandlerCalled, 'after render, blur handler not fired');

  const inputSelector = buildNestedSelector('div.Polaris-TextField', 'input.Polaris-TextField__Input');
  return focus(inputSelector)
  .then(() => {
    assert.notOk(changeHandlerCalled, 'after focus, change handler not fired');
    assert.ok(focusHandlerCalled, 'after focus, focus handler fired');
    assert.notOk(blurHandlerCalled, 'after focus, blur handler not fired');

    return blur(inputSelector);
  })
  .then(() => {
    assert.notOk(changeHandlerCalled, 'after blur, change handler not fired');
    assert.ok(blurHandlerCalled, 'after blur, blur handler fired');

    return fillIn(inputSelector, 'Some updated value');
  })
  .then(() => {
    assert.ok(changeHandlerCalled, 'after change, change handler fired');
    assert.equal(value, 'Some updated value', 'after change, value updated correctly');
  });
});
