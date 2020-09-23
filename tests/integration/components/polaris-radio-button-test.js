import { hbs } from 'ember-cli-htmlbars';
import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { focus, click, blur, render } from '@ember/test-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

// Mock the polaris-choice component to simplify testing what gets rendered.
const MockPolarisChoiceComponent = Component.extend({
  tagName: 'label',

  // Bind attributes to the element's dataset for testing.
  attributeBindings: [
    'inputId:data-input-id',
    'label:data-label',
    'labelHidden:data-label-hidden',
    'helpText:data-help-text',
  ],

  classNames: ['Polaris-Choice'],

  layout: hbs`{{yield}}`,
});

module('Integration | Component | polaris radio button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:polaris-choice', MockPolarisChoiceComponent);
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  const choiceSelector = 'label.Polaris-Choice';
  const radioButtonSelector = '[data-test-radio-button]';
  const radioButtonInputSelector =
    '[data-test-radio-button-input][type="radio"]';
  const radioButtonBackdropSelector = '[data-test-radio-button-backdrop]';
  const radioButtonIconSelector = '[data-test-radio-button-icon]';

  test('it renders the correct HTML', async function (assert) {
    await render(hbs`
      {{polaris-radio-button
        inputId="some-radio-button-id"
        name="Radio"
        value="gaga"
        label="Radio label"
        labelHidden="Label is hidden, yes"
        helpText="Help!"
      }}
    `);

    const choices = assert.dom(choiceSelector);
    choices.exists({ count: 1 }, 'renders one `polaris-choice` component');

    choices.hasAttribute(
      'data-input-id',
      'some-radio-button-id',
      'passes inputId through to `polaris-choice` component'
    );
    choices.hasAttribute(
      'data-label',
      'Radio label',
      'passes label through to `polaris-choice` component'
    );
    choices.hasAttribute(
      'data-label-hidden',
      'Label is hidden, yes',
      'passes labelHidden through to `polaris-choice` component'
    );
    choices.hasAttribute(
      'data-help-text',
      'Help!',
      'passes helpText through to `polaris-choice` component'
    );

    // Check the wrapper element.
    assert
      .dom(radioButtonSelector)
      .exists({ count: 1 }, 'renders one radio button wrapper');

    // Check the input.
    const inputs = assert.dom(radioButtonInputSelector);

    inputs.exists({ count: 1 }, 'renders one radio input');

    inputs.hasAttribute(
      'id',
      'some-radio-button-id',
      'radio input has the right id'
    );
    inputs.hasAttribute('name', 'Radio', 'radio input has the right name');
    inputs.hasValue('gaga', 'radio input has the right value');

    assert
      .dom(radioButtonBackdropSelector)
      .exists({ count: 1 }, 'renders one radio button backdrop');

    assert
      .dom(radioButtonIconSelector)
      .exists({ count: 1 }, 'renders one radio button icon wrapper');
  });

  test('it handles the disabled attribute correctly', async function (assert) {
    this.set('disabled', true);
    await render(hbs`{{polaris-radio-button disabled=disabled}}`);

    const input = assert.dom(radioButtonInputSelector);
    input.exists('renders the input');
    input.isDisabled('radio input is disabled when disabled is true');

    this.set('disabled', false);
    input.isNotDisabled('radio input is not disabled when disabled is false');
  });

  test("it sets the input's aria-describedby attribute correctly", async function (assert) {
    this.set('helpText', 'some help text');
    await render(hbs`
      {{polaris-radio-button
        inputId="described-radio-button"
        helpText=helpText
      }}
    `);

    const input = assert.dom(radioButtonInputSelector);
    input.exists('renders the input');

    input.hasAttribute(
      'aria-describedby',
      'described-radio-buttonHelpText',
      'described by help text element when help text is present'
    );

    this.set('helpText', null);

    input.doesNotHaveAttribute(
      'aria-describedby',
      'has no description when help text is present'
    );
  });

  test('it handles events correctly', async function (assert) {
    this.setProperties({
      selectedValue: 'none',
      focusFired: false,
      blurFired: false,
    });

    await render(hbs`
      {{polaris-radio-button
        value="clicked"
        onChange=(action (mut selectedValue))
        onFocus=(action (mut focusFired) true)
        onBlur=(action (mut blurFired) true)
      }}
    `);

    await focus(radioButtonInputSelector);
    assert.ok(this.get('focusFired'), 'after focus - onFocus fired');
    assert.notOk(this.get('blurFired'), 'after focus - onBlur not fired');

    await click(radioButtonInputSelector);
    assert.notOk(this.get('blurFired'), 'after click - onBlur not fired');
    assert.equal(
      this.get('selectedValue'),
      'clicked',
      'after click - selected value has updated'
    );

    await blur(radioButtonInputSelector);
    assert.ok(this.get('blurFired'), 'after blur - onBlur fired');
  });
});
