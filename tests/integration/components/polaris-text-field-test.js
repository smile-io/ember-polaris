import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

const labelSelector = buildNestedSelector('.Polaris-Labelled__LabelWrapper', '.Polaris-Label', 'label');
const labelActionButtonSelector = buildNestedSelector('.Polaris-Labelled__LabelWrapper', 'button');
const connectedContainerSelector = '.Polaris-Connected';
const textFieldSelector = '.Polaris-TextField';
const textFieldPrefixSelector = buildNestedSelector(textFieldSelector, '.Polaris-TextField__Prefix');
const textFieldSuffixSelector = buildNestedSelector(textFieldSelector, '.Polaris-TextField__Suffix');
const textFieldMultilineSelector = buildNestedSelector(textFieldSelector, 'textarea');
const textFieldInputSelector = buildNestedSelector(textFieldSelector, 'input');
const connectedLeftSelector = buildNestedSelector(connectedContainerSelector, '.Polaris-Connected__Item--connection:first-of-type');
const connectedRightSelector = buildNestedSelector(connectedContainerSelector, '.Polaris-Connected__Item--connection:last-of-type');
const connectedPrimaryInputSelector = buildNestedSelector(connectedContainerSelector, '.Polaris-Connected__Item--primary', textFieldSelector);
const spinnerSelector = '.Polaris-TextField__Spinner';
const spinnerUpButtonSelector = buildNestedSelector(spinnerSelector, '.Polaris-TextField__Segment:first-of-type');
const spinnerDownButtonSelector = buildNestedSelector(spinnerSelector, '.Polaris-TextField__Segment:last-of-type');
const errorSelector = '.Polaris-Labelled__Error';
const helpTextSelector = '.Polaris-Labelled__HelpText';

const label = 'Text field label';
const helpText = 'Text field help text';
const prefix = 'Text field prefix';
const suffix = 'Text field suffix';
const left = 'Text field connected left';
const right = 'Text field connected right';
const error = 'Text field error message';

module('Integration | Component | polaris-text-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a text input by default', async function(assert) {
    this.set('label', label);

    await render(hbs`
      {{polaris-text-field
        label=label
      }}
    `);

    assert.ok(find(textFieldInputSelector), 'it renders a text input');
    assert.equal(find(labelSelector).textContent.trim(), label, 'it renders the passed-in label');
  });

  test('when `type` is numeric, it renders a spinner which passes up new values when clicked', async function(assert) {
    this.setProperties({
      value: 1,
      handleChange(num) {
        this.set('value', num);
      }
    });

    await render(hbs`
      {{polaris-text-field
        value=value
        type="number"
        onChange=(action handleChange)
      }}
    `);

    assert.equal(findAll(spinnerSelector).length, 1, 'it renders a polaris-text-field/spinner component');

    await triggerEvent(spinnerUpButtonSelector, 'click');
    assert.equal(this.get('value'), 2, 'numeric value is incremented when the `up` icon is clicked');

    this.set('value', 5);

    await triggerEvent(spinnerDownButtonSelector, 'click');
    assert.equal(this.get('value'), 4, 'numeric value is decremented when the `down` icon is clicked');
  });

  test('it renders as a textarea when `multiline` is true', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        multiline=true
      }}
    `);

    assert.equal(findAll(textFieldMultilineSelector).length, 1, 'it renders a textarea');
  });

  test('it renders an actionable link when a `labelAction` hash is present', async function(assert) {
    this.setProperties({
      labelActionText: label,
      labelActionCalled: false
    });

    this.set('labelAction', () => {
      this.set('labelActionCalled', true);
    });

    await render(hbs`
      {{polaris-text-field
        labelAction=(hash
          content=labelActionText
          onAction=labelAction
        )
      }}
    `);

    const labelButton = find(labelActionButtonSelector);
    assert.ok(labelButton, 'it renders a button in the label');
    assert.equal(labelButton.textContent.trim(), label, 'the label button displays the passed-in content');

    await triggerEvent(labelButton, 'click');

    assert.ok(this.get('labelActionCalled'), 'the label action is called when the label button is clicked');
  });

  test('it renders help text when `helpText` is present', async function(assert) {
    this.set('helpText', helpText);

    await render(hbs`
      {{polaris-text-field
        helpText=helpText
      }}
    `);

    const helpTextNode = find(helpTextSelector);
    assert.ok(helpTextNode, 'it renders help text element');
    assert.equal(helpTextNode.textContent.trim(), helpText, 'help text value is correct');
  });

  test('it renders a prefix and suffix when `prefix` or `suffix` is present', async function(assert) {
    this.setProperties({
      prefix,
      suffix
    });

    await render(hbs`
      {{polaris-text-field
        prefix=prefix
        suffix=suffix
      }}
    `);

    let prefixNode = find(textFieldPrefixSelector);
    assert.ok(prefixNode, 'it renders the prefix element');
    assert.equal(prefixNode.textContent.trim(), prefix, 'prefix value is correct');

    let suffixNode = find(textFieldSuffixSelector);
    assert.ok(suffixNode, 'it renders the suffix element');
    assert.equal(suffixNode.textContent.trim(), suffix, 'suffix value is correct');
  });

  test('it renders as a connected component when `connectedLeft` or `connectedRight` is present', async function(assert) {
    this.setProperties({
      left,
      right
    });

    await render(hbs`
      {{polaris-text-field
        connectedLeft=left
        connectedRight=right
      }}
    `);

    assert.ok(find(connectedContainerSelector), 'it renders a polaris-text-field/connected component');

    let leftNode = find(connectedLeftSelector);
    assert.ok(leftNode, 'it renders the connected left element');
    assert.equal(leftNode.textContent.trim(), left, 'connected left value is correct');

    let rightNode = find(connectedRightSelector);
    assert.ok(rightNode, 'it renders the connected right element');
    assert.equal(rightNode.textContent.trim(), right, 'connected right value is correct');

    assert.ok(find(connectedPrimaryInputSelector), 'the polaris text field is rendered inside the primary connected element');
  });

  test('it renders validation errors when `error` is present', async function(assert) {
    this.set('error', error);

    await render(hbs`
      {{polaris-text-field
        error=error
      }}
    `);

    const errorNode = find(errorSelector);
    assert.ok(errorNode, 'it renders the error message element');
    assert.equal(errorNode.textContent.trim(), error, 'the error message value is correct');
  });

  test('it calls `onChange`, `onFocus`, and `onBlur` when events are triggered', async function(assert) {
    this.setProperties({
      changeCalled: false,
      focusCalled: false,
      blurCalled: false,
      handleChange() {
        this.set('changeCalled', true);
      },
      handleFocus() {
        this.set('focusCalled', true);
      },
      handleBlur() {
        this.set('blurCalled', true);
      }
    });

    await render(hbs`
      {{polaris-text-field
        onChange=(action handleChange)
        onFocus=(action handleFocus)
        onBlur=(action handleBlur)
      }}
    `);

    await triggerEvent(textFieldInputSelector, 'change');
    assert.ok(this.get('changeCalled'), 'onChange action is called on textfield change event');

    await triggerEvent(textFieldInputSelector, 'focus');
    assert.ok(this.get('focusCalled'), 'onFocus action is called on textfield focus event');

    await triggerEvent(textFieldInputSelector, 'blur');
    assert.ok(this.get('blurCalled'), 'onBlur action is called on textfield blur event');
  });
});
