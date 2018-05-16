import Component from '@ember/component';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, focus, click, blur } from 'ember-native-dom-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';
import buildNestedSelector from '../../helpers/build-nested-selector';

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
  ],
});

moduleForComponent('polaris-radio-button', 'Integration | Component | polaris radio button', {
  integration: true,

  beforeEach() {
    this.register('component:polaris-choice', MockPolarisChoiceComponent);
    this.register('component:svg-jar', MockSvgJarComponent);
  },
});

const choiceSelector = 'label.Polaris-Choice';
const radioButtonSelector = buildNestedSelector(choiceSelector, 'span.Polaris-RadioButton');
const radioButtonInputSelector = buildNestedSelector(
  radioButtonSelector,
  'input.Polaris-RadioButton__Input[type="radio"]'
);
const radioButtonBackdropSelector = buildNestedSelector(radioButtonSelector, 'span.Polaris-RadioButton__Backdrop');
const radioButtonIconSelector = buildNestedSelector(
  radioButtonSelector,
  'span.Polaris-RadioButton__Icon'
);

test('it renders the correct HTML', function(assert) {
  this.render(hbs`
    {{polaris-radio-button
      inputId="some-radio-button-id"
      name="Radio"
      value="gaga"
      label="Radio label"
      labelHidden="Label is hidden, yes"
      helpText="Help!"
    }}
  `);

  const choices = findAll(choiceSelector);
  assert.equal(choices.length, 1, 'renders one `polaris-choice` component');

  const choiceData = choices[0].dataset;
  assert.equal(choiceData.inputId, 'some-radio-button-id', 'passes inputId through to `polaris-choice` component');
  assert.equal(choiceData.label, 'Radio label', 'passes label through to `polaris-choice` component');
  assert.equal(choiceData.labelHidden, 'Label is hidden, yes', 'passes labelHidden through to `polaris-choice` component');
  assert.equal(choiceData.helpText, 'Help!', 'passes helpText through to `polaris-choice` component');

  // Check the wrapper element.
  const radioButtons = findAll(radioButtonSelector);
  assert.equal(radioButtons.length, 1, 'renders one radio button wrapper');

  // Check the input.
  const inputs = findAll(radioButtonInputSelector);
  assert.equal(inputs.length, 1, 'renders one radio input');

  const input = inputs[0];
  assert.equal(input.id, 'some-radio-button-id', 'radio input has the right id');
  assert.equal(input.name, 'Radio', 'radio input has the right name');
  assert.equal(input.value, 'gaga', 'radio input has the right value');

  const backdrops = findAll(radioButtonBackdropSelector);
  assert.equal(backdrops.length, 1, 'renders one radio button backdrop');

  const icons = findAll(radioButtonIconSelector);
  assert.equal(icons.length, 1, 'renders one radio button icon wrapper');
});

test('it handles the disabled attribute correctly', function(assert) {
  this.set('disabled', true);
  this.render(hbs`{{polaris-radio-button disabled=disabled}}`);

  const input = find(radioButtonInputSelector);
  assert.ok(input, 'renders the input');
  assert.ok(input.disabled, 'radio input is disabled when disabled is true');

  this.set('disabled', false);
  assert.notOk(input.disabled, 'radio input is not disabled when disabled is false');
});

test('it sets the input\'s aria-describedby attribute correctly', function(assert) {
  this.set('helpText', 'some help text');
  this.render(hbs`
    {{polaris-radio-button
      inputId="described-radio-button"
      helpText=helpText
    }}
  `);

  const input = find(radioButtonInputSelector);
  assert.ok(input, 'renders the input');

  assert.equal(
    input.getAttribute('aria-describedby'),
    'described-radio-buttonHelpText',
    'described by help text element when help text is present'
  );

  this.set('helpText', null);
  assert.notOk(
    input.getAttribute('aria-describedby'),
    'has no description when help text is present'
  );
});

test('it handles events correctly', function(assert) {
  this.setProperties({
    selectedValue: 'none',
    focusFired: false,
    blurFired: false,
  });
  this.render(hbs`
    {{polaris-radio-button
      value="clicked"
      onChange=(action (mut selectedValue))
      onFocus=(action (mut focusFired) true)
      onBlur=(action (mut blurFired) true)
    }}
  `);

  focus(radioButtonInputSelector);
  assert.ok(this.get('focusFired'), 'after focus - onFocus fired');
  assert.notOk(this.get('blurFired'), 'after focus - onBlur not fired');

  click(radioButtonInputSelector);
  assert.notOk(this.get('blurFired'), 'after click - onBlur not fired');
  assert.equal(this.get('selectedValue'), 'clicked', 'after click - selected value has updated');

  blur(radioButtonInputSelector);
  assert.ok(this.get('blurFired'), 'after blur - onBlur fired');
});
