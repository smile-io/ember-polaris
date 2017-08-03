import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, focus, click, blur } from 'ember-native-dom-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';
import buildNestedSelector from '../../helpers/build-nested-selector';
import Ember from 'ember';

const {
  Component,
} = Ember;

// Mock the polaris-choice component to simplify testing what gets rendered.
const MockPolarisChoiceComponent = Component.extend({
  tagName: 'label',
  classNames: ['Polaris-Choice'],

  layout: hbs`{{yield}}`,

  // Bind attributes to the element's dataset for testing.
  attributeBindings: [
    'inputId:data-input-id',
    'label:data-label',
    'labelHidden:data-label-hidden',
    'helpText:data-help-text',
    'error:data-error',
  ],
});

moduleForComponent('polaris-checkbox', 'Integration | Component | polaris checkbox', {
  integration: true,

  beforeEach() {
    this.register('component:polaris-choice', MockPolarisChoiceComponent);
    this.register('component:svg-jar', MockSvgJarComponent);
  },
});

const choiceSelector = 'label.Polaris-Choice';
const checkboxSelector = buildNestedSelector(choiceSelector, 'div.Polaris-Checkbox');
const checkboxInputSelector = buildNestedSelector(
  checkboxSelector,
  'input.Polaris-Checkbox__Input[type="checkbox"]'
);
const checkboxBackdropSelector = buildNestedSelector(checkboxSelector, 'div.Polaris-Checkbox__Backdrop');
const checkboxIconSelector = buildNestedSelector(
  checkboxSelector,
  'div.Polaris-Checkbox__Icon',
  'span.Polaris-Icon',
  'svg'
);

test('it renders the correct HTML', function(assert) {
  this.set('error', 'I\'ve got an error');
  this.render(hbs`
    {{polaris-checkbox
      inputId="some-checkbox-id"
      name="Check me out"
      value="Check it"
      label="Checkbox label"
      labelHidden="Label is hidden, yes"
      helpText="Help!"
      error=error
    }}
  `);

  const choices = findAll(choiceSelector);
  assert.equal(choices.length, 1, 'renders one `polaris-choice` component');

  const choiceData = choices[0].dataset;
  assert.equal(choiceData.inputId, 'some-checkbox-id', 'passes inputId through to `polaris-choice` component');
  assert.equal(choiceData.label, 'Checkbox label', 'passes label through to `polaris-choice` component');
  assert.equal(choiceData.labelHidden, 'Label is hidden, yes', 'passes labelHidden through to `polaris-choice` component');
  assert.equal(choiceData.helpText, 'Help!', 'passes helpText through to `polaris-choice` component');
  assert.equal(choiceData.error, 'I\'ve got an error', 'passes error through to `polaris-choice` component');

  // Check the wrapper div and its class handling.
  const checkboxes = findAll(checkboxSelector);
  assert.equal(checkboxes.length, 1, 'renders one checkbox div');
  assert.ok(checkboxes[0].classList.contains('Polaris-Checkbox--error'), 'applies error class when error present');

  this.set('error', null);
  assert.notOk(checkboxes[0].classList.contains('Polaris-Checkbox--error'), 'does not apply error class when error not present');

  // Check the input.
  const inputs = findAll(checkboxInputSelector);
  assert.equal(inputs.length, 1, 'renders one checkbox input');

  const input = inputs[0];
  assert.equal(input.id, 'some-checkbox-id', 'checkbox input has the right id');
  assert.equal(input.name, 'Check me out', 'checkbox input has the right name');
  assert.equal(input.value, 'Check it', 'checkbox input has the right value');

  const backdrops = findAll(checkboxBackdropSelector);
  assert.equal(backdrops.length, 1, 'renders one checkbox backdrop');

  const icons = findAll(checkboxIconSelector);
  assert.equal(icons.length, 1, 'renders one checkbox icon');
  assert.equal(icons[0].dataset.iconSource, 'polaris/checkmark', 'renders the correct checkbox icon');
});

test('it handles the disabled attribute correctly', function(assert) {
  this.set('disabled', true);
  this.render(hbs`{{polaris-checkbox disabled=disabled}}`);

  const input = find(checkboxInputSelector);
  assert.ok(input, 'renders the input');
  assert.ok(input.disabled, 'checkbox input is disabled when disabled is true');

  this.set('disabled', false);
  assert.notOk(input.disabled, 'checkbox input is not disabled when disabled is false');
});

test('it sets the input\'s aria-describedby attribute correctly', function(assert) {
  this.setProperties({
    error: 'some error',
    helpText: 'some help text',
  });
  this.render(hbs`
    {{polaris-checkbox
      inputId="described-checkbox"
      error=error
      helpText=helpText
    }}
  `);

  const input = find(checkboxInputSelector);
  assert.ok(input, 'renders the input');

  // With both an error and helpText, the checkbox input should
  // be described by both the error and help text elements.
  assert.equal(
    input.getAttribute('aria-describedby'),
    'described-checkboxError described-checkboxHelpText',
    'described by error and help text elements when error and help text are present'
  );

  this.set('error', null);
  assert.equal(
    input.getAttribute('aria-describedby'),
    'described-checkboxHelpText',
    'described by help text element when help text is present'
  );

  this.set('helpText', null);
  assert.notOk(
    input.getAttribute('aria-describedby'),
    'has no description when no error or help text are present'
  );

  this.set('error', 'some other error');
  assert.equal(
    input.getAttribute('aria-describedby'),
    'described-checkboxError',
    'described by error element when error is present'
  );
});

test('it sets the input\'s aria-invalid attribute correctly', function(assert) {
  this.set('error', 'some error');
  this.render(hbs`{{polaris-checkbox error=error}}`);

  const input = find(checkboxInputSelector);
  assert.ok(input, 'renders the input');

  assert.equal(input.getAttribute('aria-invalid'), 'true', 'aria-invalid attribute set when error present');

  this.set('error', null);
  assert.equal(input.getAttribute('aria-invalid'), 'false', 'aria-invalid attribute not when no error');
});

test('it handles events correctly', function(assert) {
  this.on('change', () => {
    debugger;
  });
  this.setProperties({
    focusFired: false,
    blurFired: false,
  });
  this.render(hbs`
    {{polaris-checkbox
      onChange=(action "change")
      onFocus=(action (mut focusFired) true)
      onBlur=(action (mut blurFired) true)
    }}
  `);

  focus(checkboxInputSelector);
  assert.ok(this.get('focusFired'), 'after focus - onFocus fired');
  assert.notOk(this.get('blurFired'), 'after focus - onBlur not fired');

  click(checkboxInputSelector);

  blur(checkboxInputSelector);
  assert.ok(this.get('blurFired'), 'after blur - onBlur fired');
});
