import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  triggerEvent,
  focus,
  blur,
  click,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

const label = 'Text field label';
const helpText = 'Text field help text';
const prefix = 'Text field prefix';
const suffix = 'Text field suffix';

const textFieldSelector = '[data-test-labelled="text-field"]';
const errorSelector = '[data-test-labelled-error]';
const fieldSelector = '[data-test-text-field-wrapper]';
const inputSelector = '[data-test-text-field-input]';
const labelSelector = '[data-test-label]';
const labelHelpTextSelector = '[data-test-label-help-text]';
const resizerSelector = '[data-test-text-field-resizer]';
const prefixSelector = '[data-test-text-field-prefix]';
const suffixSelector = '[data-test-text-field-suffix]';
const spinnerSelector = '[data-test-text-field-spinner]';
const spinnerIncrButtonSelector = '[data-test-text-field-spinner-incr-button]';
const spinnerDecrButtonSelector = '[data-test-text-field-spinner-decr-button]';
const inlineErrorSelector = '[data-test-inline-error]';
const connectedSelector = '[data-test-connected]';
const connectedLeftSelector = '[data-test-connected-item="left"]';
const connectedRightSelector = '[data-test-connected-item="right"]';
const characterCounterSelector = '[data-test-text-field-character-count]';

module('Integration | Component | polaris-text-field', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly by default', async function(assert) {
    this.set('label', label);

    await render(hbs`
      {{polaris-text-field
        label=label
      }}
    `);

    assert
      .dom(buildNestedSelector(textFieldSelector, fieldSelector, inputSelector))
      .exists('renders text field input correctly');
    assert.dom(labelSelector).hasText(label, 'it renders the passed-in label');
    assert
      .dom(fieldSelector)
      .hasClass('Polaris-TextField', 'input wrapper has correct class');
    assert
      .dom(fieldSelector)
      .hasNoClass(
        'Polaris-TextField--multiline',
        'input wrapper has no multiline class'
      );
    assert
      .dom(fieldSelector)
      .hasNoClass(
        'Polaris-TextField--readOnly',
        'input wrapper has no readOnly class'
      );
    assert
      .dom(fieldSelector)
      .hasNoClass(
        'Polaris-TextField--hasValue',
        'input wrapper has no value class applied'
      );
    assert
      .dom(fieldSelector)
      .hasNoClass(
        'Polaris-TextField--error',
        'input wrapper has no error class applied'
      );
    assert
      .dom(inputSelector)
      .hasClass('Polaris-TextField__Input', 'input has correct class');
    assert
      .dom(inputSelector)
      .hasNoAttribute(
        'aria-multiline',
        'input element has no aria-multiline attribute'
      );
    assert
      .dom(inputSelector)
      .hasNoAttribute(
        'aria-invalid',
        'input element has no aria-invalid attribute'
      );
    assert
      .dom(inputSelector)
      .hasNoClass(
        'Polaris-TextField__Input--suffixed',
        'input element has no suffixed class'
      );
  });

  test('it supports focused property', async function(assert) {
    this.set('focused', false);

    await render(hbs`{{polaris-text-field focused=focused}}`);

    assert
      .dom(fieldSelector)
      .hasNoClass(
        'Polaris-TextField--focus',
        'input wrapper has no focus class applied'
      );
    assert
      .dom(inputSelector)
      .isNotFocused('when focused is false - input is not focused');

    this.set('focused', true);

    assert
      .dom(fieldSelector)
      .hasClass(
        'Polaris-TextField--focus',
        'input wrapper has focus class applied'
      );
    assert
      .dom(inputSelector)
      .isFocused('when focused is true - input is focused');
  });

  test('it handles action callbacks correctly', async function(assert) {
    this.set('callback', (name) => assert.step(name));

    await render(hbs`
      {{polaris-text-field
        onChange=(action callback "change")
        onFocus=(action callback "focus")
        onBlur=(action callback "blur")
      }}
    `);

    await triggerEvent(inputSelector, 'input', 'text');
    await focus(inputSelector);
    await blur(inputSelector);

    assert.verifySteps(['change', 'focus', 'blur'], 'invokes callbacks');
  });

  module('id', function() {
    test('when provided', async function(assert) {
      await render(hbs`{{polaris-text-field id="myId"}}`);

      assert
        .dom(inputSelector)
        .hasAttribute('id', 'myId', 'sets it on the input element');
    });

    test('when not provided', async function(assert) {
      await render(hbs`{{polaris-text-field}}`);

      assert
        .dom(inputSelector)
        .hasAttribute(
          'id',
          /TextField-ember/,
          'generates an id and sets it on the input element'
        );
    });
  });

  module('autoComplete', function() {
    test('defaults to no autoComplete attribute', async function(assert) {
      await render(hbs`{{polaris-text-field}}`);

      assert
        .dom(inputSelector)
        .hasNoAttribute(
          'autoComplete',
          'input does not have autoComplete attribute'
        );
    });

    test('sets autoComplete to "off" when false', async function(assert) {
      await render(hbs`{{polaris-text-field autoComplete=false}}`);

      assert
        .dom(inputSelector)
        .hasAttribute('autoComplete', 'off', 'input has autoComplete off');
    });

    test('sets autoComplete to "on" when true', async function(assert) {
      await render(hbs`{{polaris-text-field autoComplete=true}}`);

      assert
        .dom(inputSelector)
        .hasAttribute('autoComplete', 'on', 'input has autoComplete on');
    });
  });

  test('it support helpText property', async function(assert) {
    this.set('helpText', helpText);

    await render(hbs`
      {{polaris-text-field
        helpText=helpText
      }}
    `);

    const helpTextId = find(inputSelector).getAttribute('aria-describedby');
    assert
      .dom(labelHelpTextSelector)
      .hasText(helpText, 'help text value is correct');
    assert
      .dom(labelHelpTextSelector)
      .hasAttribute('id', helpTextId, 'help text id is correct');
  });

  test('it support readOnly property', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        readOnly=true
      }}
    `);

    assert
      .dom(fieldSelector)
      .hasClass(
        'Polaris-TextField--readOnly',
        'input wrapper has readOnly class'
      );
  });

  module('error', function() {
    test('works with a string|component', async function(assert) {
      await render(hbs`
        {{polaris-text-field
          id="myId"
          error=(component "polaris-label" text="Invalid")
        }}
      `);

      assert
        .dom(fieldSelector)
        .hasClass(
          'Polaris-TextField--error',
          'input wrapper has error class applied'
        );
      assert
        .dom(inputSelector)
        .hasAttribute(
          'aria-invalid',
          '',
          'input has aria-invalid attribute true'
        );

      await render(hbs`
        {{polaris-text-field
          id="myId"
          error="Invalid"
        }}
      `);

      assert
        .dom(fieldSelector)
        .hasClass(
          'Polaris-TextField--error',
          'input wrapper has error class applied'
        );
      assert
        .dom(inputSelector)
        .hasAttribute(
          'aria-invalid',
          '',
          'input has aria-invalid attribute true'
        );
    });

    test('it connects the input to the error', async function(assert) {
      await render(hbs`
        {{polaris-text-field
          error="Some error"
        }}
      `);

      let errorID = find(inputSelector).getAttribute('aria-describedby');
      assert
        .dom(`#${errorID}`)
        .hasText('Some error', 'error label has correct text');
    });

    test('it connects the input to an error rendered separately', async function(assert) {
      this.setProperties({
        errorMessage: 'Some error',
        textFieldID: 'collectionRuleType',
      });

      await render(hbs`
        <div>
          {{polaris-text-field
            error=true
            id=textFieldID
            label="textField"
          }}
          {{polaris-inline-error message=errorMessage fieldID=textFieldID}}
        </div>
      `);

      let errorID = find(inputSelector).getAttribute('aria-describedby');
      assert
        .dom(inputSelector)
        .hasAttribute(
          'aria-invalid',
          '',
          'input has aria-invalid attribute true'
        );
      assert
        .dom(inlineErrorSelector)
        .hasAttribute(
          'id',
          errorID,
          'inline error is connected to the text field'
        );
    });

    test('it connects the input to both an error and help text', async function(assert) {
      this.setProperties({
        errorMessage: 'Some error',
        textFieldID: 'collectionRuleType',
      });

      await render(hbs`
        {{polaris-text-field
          error="Some error"
          helpText="Some help"
          label="textField"
        }}
      `);

      let descriptions = find(inputSelector)
        .getAttribute('aria-describedby')
        .split(' ');
      assert.equal(descriptions.length, 2);
      assert.dom(errorSelector).hasText('Some error', 'error has correct text');
      assert
        .dom(labelHelpTextSelector)
        .hasText('Some help', 'has correct help text');
    });
  });

  module('type', function() {
    test('it sets type correctly', async function(assert) {
      this.set('type', 'email');

      await render(hbs`{{polaris-text-field type=type}}`);

      assert
        .dom(inputSelector)
        .hasAttribute('type', 'email', 'it sets the type');

      this.set('type', 'currency');

      assert
        .dom(inputSelector)
        .hasAttribute(
          'type',
          'text',
          'when type is currency - it sets the type to text'
        );
    });

    module('when type is number', function() {
      test('it handles incrementing/decrementing correctly', async function(assert) {
        this.setProperties({
          value: 1,
          id: 'myId',
          disabled: false,
          handleChange(num, id) {
            this.set('value', num);
            assert.ok(id, this.id);
          },
        });

        await render(hbs`
          {{polaris-text-field
            type="number"
            value=value
            disabled=disabled
            onChange=(action handleChange)
          }}
        `);

        assert
          .dom(fieldSelector)
          .hasClass(
            'Polaris-TextField--hasValue',
            'input wrapper has value class applied'
          );

        assert
          .dom(spinnerSelector)
          .exists('it renders a polaris-text-field/spinner component');

        await click(spinnerIncrButtonSelector);
        await click(spinnerIncrButtonSelector);

        assert.equal(
          this.value,
          3,
          'clicking increment button - increments value'
        );

        await click(spinnerDecrButtonSelector);

        assert.equal(
          this.value,
          2,
          'clicking decrement button - decrements value'
        );

        this.set('disabled', true);
        assert
          .dom(spinnerSelector)
          .doesNotExist('does not render spinner when disabled');
      });

      test('it handles incrementing from no value', async function(assert) {
        await render(hbs`
          {{polaris-text-field
            type="number"
            onChange=(action (mut value))
          }}
        `);

        await click(spinnerIncrButtonSelector);

        assert.equal(this.value, 1);
      });

      test('it uses step property when provided', async function(assert) {
        await render(hbs`
          {{polaris-text-field
            type="number"
            value=5
            step=3
            onChange=(action (mut value))
          }}
        `);

        await click(spinnerIncrButtonSelector);

        assert.equal(this.value, 8);
      });

      test('it respects a min value', async function(assert) {
        this.set('value', 2);

        await render(hbs`
          {{polaris-text-field
            type="number"
            value=value
            min=2
            onChange=(action (mut value))
          }}
        `);

        await click(spinnerDecrButtonSelector);
        assert.equal(this.value, 2, 'does not decrement value below min one');

        await click(spinnerIncrButtonSelector);
        assert.equal(this.value, 3, 'does increment value');

        this.set('value', -1);

        await click(spinnerIncrButtonSelector);
        assert.equal(this.value, 2, 'brings an invalid value down to the min');

        await click(spinnerDecrButtonSelector);
        assert.equal(this.value, 2, 'does not decrement value below min one');
      });

      test('it respects a max value', async function(assert) {
        this.set('value', 2);

        await render(hbs`
          {{polaris-text-field
            type="number"
            value=value
            max=2
            onChange=(action (mut value))
          }}
        `);

        await click(spinnerIncrButtonSelector);
        assert.equal(this.value, 2, 'does not increment value above max');

        await click(spinnerDecrButtonSelector);
        assert.equal(this.value, 1, 'decrements value');

        this.set('value', 12);

        await click(spinnerIncrButtonSelector);
        assert.equal(this.value, 2, 'brings an invalid value down to the max');

        await click(spinnerDecrButtonSelector);
        assert.equal(this.value, 1, 'decrements value');
      });

      test('increments correctly when a value step or both are float numbers', async function(assert) {
        this.set('value', 2);

        await render(hbs`
          {{polaris-text-field
            type="number"
            value=3.02
            step=1.044
            onChange=(action (mut value))
          }}
        `);

        await click(spinnerIncrButtonSelector);
        assert.equal(this.value, 4.064, 'decrements value correctly');
      });

      test('decrements correctly when a value step or both are float numbers', async function(assert) {
        this.set('value', 2);

        await render(hbs`
          {{polaris-text-field
            type="number"
            value=3.02
            step=1.044
            onChange=(action (mut value))
          }}
        `);

        await click(spinnerDecrButtonSelector);
        assert.equal(this.value, 1.976, 'decrements value correctly');
      });
    });
  });

  test('it supports `multiline` property', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        multiline=true
      }}
    `);

    assert.equal(
      find(inputSelector).tagName,
      'TEXTAREA',
      'when true - renders as a textarea element'
    );
    assert
      .dom(inputSelector)
      .hasAttribute(
        'aria-multiline',
        '',
        'input element has aria-multiline attribute'
      );
    assert.dom(resizerSelector).exists('when true - renders a resizer');
    assert
      .dom(fieldSelector)
      .hasClass(
        'Polaris-TextField--multiline',
        'input wrapper has multiline class'
      );
  });

  test('it sets aria labels on the input element', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        ariaOwns="Aria owns"
        ariaActiveDescendant="Aria active descendant"
        ariaAutocomplete="Aria autocomplete"
        ariaControls="Aria controls"
      }}
    `);

    assert.dom(inputSelector).hasAttribute('aria-owns', 'Aria owns');
    assert
      .dom(inputSelector)
      .hasAttribute('aria-activedescendant', 'Aria active descendant');
    assert
      .dom(inputSelector)
      .hasAttribute('aria-autocomplete', 'Aria autocomplete');
    assert.dom(inputSelector).hasAttribute('aria-controls', 'Aria controls');
  });

  test('it renders a prefix and suffix when `prefix` or `suffix` is present', async function(assert) {
    this.setProperties({
      prefix,
      suffix,
      id: 'test',
    });

    await render(hbs`
      {{polaris-text-field
        id=id
        prefix=prefix
        suffix=suffix
      }}
    `);

    assert.dom(prefixSelector).hasText(prefix, 'prefix value is correct');
    assert
      .dom(prefixSelector)
      .hasClass('Polaris-TextField__Prefix', 'prefix has correct class');
    assert
      .dom(prefixSelector)
      .hasAttribute('id', `${this.id}Prefix`, 'prefix has correct class');

    assert.dom(suffixSelector).hasText(suffix, 'suffix value is correct');
    assert
      .dom(suffixSelector)
      .hasClass('Polaris-TextField__Suffix', 'suffix has correct class');
    assert
      .dom(suffixSelector)
      .hasAttribute('id', `${this.id}Suffix`, 'suffix has correct class');

    assert
      .dom(inputSelector)
      .hasClass(
        'Polaris-TextField__Input--suffixed',
        'input element has suffixed class'
      );

    let labelledBy = find(inputSelector)
      .getAttribute('aria-labelledby')
      .split(' ');
    assert.ok(
      labelledBy.includes(`${this.id}Prefix`),
      'input element has prefix aria-labelledby'
    );
    assert.ok(
      labelledBy.includes(`${this.id}Suffix`),
      'input element has suffixed aria-labelledby'
    );
  });

  test('it renders as a connected component when `connectedLeft` or `connectedRight` is present', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        connectedLeft=(component "polaris-text-field" label="Left connected")
        connectedRight=(component "polaris-text-field" label="Right connected")
      }}
    `);

    assert
      .dom(buildNestedSelector(textFieldSelector, connectedSelector))
      .exists('renders a connected component');
    assert
      .dom(connectedLeftSelector)
      .hasText('Left connected', 'render connected left correctly');
    assert
      .dom(connectedRightSelector)
      .hasText('Right connected', 'render connected right correctly');
  });

  test('it displays number of characters entered in an input field', async function(assert) {
    await render(hbs`
      {{polaris-text-field
        value="test"
        maxLength=10
        showCharacterCount=true
        onChange=(action (mut dummy))
      }}
    `);

    assert
      .dom(characterCounterSelector)
      .hasText('4/10', 'character counter renders current count');
  });
});
