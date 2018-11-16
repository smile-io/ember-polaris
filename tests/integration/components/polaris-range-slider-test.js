import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent, fillIn } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris-range-slider', function(hooks) {
  setupRenderingTest(hooks);

  const dataTestRangeSlider = 'range-slider';
  const sliderSelector = `[data-test-labelled="${dataTestRangeSlider}"]`;
  const sliderWrapperSelector = '[data-test-range-slider-wrapper]';
  const sliderInputWrapperSelector = '[data-test-range-slider-input-wrapper]';
  const sliderInputSelector = '[data-test-range-slider-input]';
  const sliderOutputSelector = '[data-test-range-slider-output]';
  const sliderPrefixSelector = '[data-test-range-slider-prefix]';
  const sliderSuffixSelector = '[data-test-range-slider-suffix]';

  test('it allows specific props to pass through properties on the input', async function(assert) {
    this.setProperties({
      label: 'RangeSlider',
      value: '15',
      min: '10',
      max: '20',
      step: '0.5',
      disabled: true,
      dataTestRangeSlider: dataTestRangeSlider,
    });

    await render(hbs`
      {{polaris-range-slider
        dataTestRangeSlider=dataTestRangeSlider
        label=label
        value=value
        min=min
        max=max
        step=step
        disabled=disabled
      }}
    `);

    assert
      .dom(
        buildNestedSelector(
          sliderSelector,
          sliderWrapperSelector,
          sliderInputWrapperSelector,
          sliderInputSelector
        )
      )
      .exists('renders the input element correctly');

    // TODO: Ember doesn't seem to be binding the `value` attribute on the input element...
    // assert.dom(sliderInputSelector).hasAttribute('value', this.value);
    assert.dom(sliderInputSelector).hasAttribute('min', this.min);
    assert.dom(sliderInputSelector).hasAttribute('max', this.max);
    assert.dom(sliderInputSelector).hasAttribute('step', this.step);
    assert.dom(sliderInputSelector).hasAttribute('aria-valuemin', this.min);
    assert.dom(sliderInputSelector).hasAttribute('aria-valuemax', this.max);
    assert.dom(sliderInputSelector).hasAttribute('aria-valuenow', this.value);
  });

  test('it calls `onChange` with the new value when the value is changed', async function(assert) {
    this.set('valueChanged', (newValue, inputId) => {
      assert.equal(newValue, 40);
      assert.equal(inputId, 'MyRangeSlider');
    });

    await render(hbs`
      {{polaris-range-slider
        id="MyRangeSlider"
        label="RangeSlider"
        value=50
        onChange=(action valueChanged)
      }}
    `);

    await fillIn(sliderInputSelector, 40);
  });

  test('`onFocus` is called when the input is focused', async function(assert) {
    this.set('inputFocused', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        onFocus=(action inputFocused)
      }}
    `);

    await triggerEvent(sliderInputSelector, 'focus');
  });

  test('`onBlur` is called when the input is blurred', async function(assert) {
    this.set('inputBlurred', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        onBlur=(action inputBlurred)
      }}
    `);

    await triggerEvent(sliderInputSelector, 'blur');
  });

  test('it sets the id on the input when an ID is passed', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        id="MyRangeSlider"
        value=50
      }}
    `);

    assert.dom(sliderInputSelector).hasAttribute('id', 'MyRangeSlider');
  });

  test('it sets a random id on the input when none is passed', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
      }}
    `);

    assert.dom(sliderInputSelector).hasAttribute('id');
  });

  test('it connects the input to the output when output is rendered', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        id="MyRangeSlider"
        value=50
        output=true
      }}
    `);

    const inputId = find(sliderInputSelector).getAttribute('id');
    assert.equal(typeof inputId, 'string');
    assert.dom(sliderOutputSelector).hasAttribute('for', inputId);
  });

  test('output contains correct value text when output is rendered', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        output=true
      }}
    `);

    assert.dom(sliderOutputSelector).hasText('50');
  });

  test('it connects the input to the help text when help text is supplied', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        helpText="Some help"
      }}
    `);
    const helpTextId = find(sliderInputSelector).getAttribute(
      'aria-describedby'
    );

    assert.equal(typeof helpTextId, 'string');
    assert.dom(`#${helpTextId}`).hasText('Some help');
  });

  test('it marks the input as invalid when an error is present', async function(assert) {
    this.owner.register(
      'component:my-error-component',
      Component.extend({
        tagName: 'span',
        layout: hbs`{{text}}`,

        text: null,
      })
    );

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        error=(component "my-error-component" text="Invalid")
      }}
    `);
    assert.dom(sliderInputSelector).hasAttribute('aria-invalid', 'true');

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        error="Some error"
      }}
    `);
    assert.dom(sliderInputSelector).hasAttribute('aria-invalid', 'true');
  });

  test('it connects the input to the error when an error is present', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        error="Some error"
      }}
    `);
    const errorId = find(sliderInputSelector).getAttribute('aria-describedby');

    assert.equal(typeof errorId, 'string');
    assert.dom(`#${errorId}`).hasText('Some error');
  });

  test('it connects the input to both an error and help text when both error and help text are present', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        helpText="Some help"
        error="Some error"
      }}
    `);
    const descriptions = find(sliderInputSelector)
      .getAttribute('aria-describedby')
      .split(' ');

    assert.equal(descriptions.length, 2);
    assert.dom(`#${descriptions[1]}`).hasText('Some help');
    assert.dom(`#${descriptions[0]}`).hasText('Some error');
  });

  test('it support prefix', async function(assert) {
    this.set('text', 'prefix text');

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        prefix=(component "polaris-badge" text=text)
      }}
    `);

    assert
      .dom(buildNestedSelector(sliderWrapperSelector, sliderPrefixSelector))
      .exists('renders the prefix element correctly');
    assert.dom(sliderPrefixSelector).hasText(this.text, 'renders prefix text');
    assert
      .dom(sliderPrefixSelector)
      .hasClass(
        'Polaris-RangeSlider__Prefix',
        'prefix has correct class applied'
      );
  });

  test('it support suffix', async function(assert) {
    this.set('text', 'suffix text');

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        suffix=(component "polaris-badge" text=text)
      }}
    `);

    assert
      .dom(buildNestedSelector(sliderWrapperSelector, sliderSuffixSelector))
      .exists('renders the suffix element correctly');
    assert.dom(sliderSuffixSelector).hasText(this.text, 'renders suffix text');
    assert
      .dom(sliderSuffixSelector)
      .hasClass(
        'Polaris-RangeSlider__Suffix',
        'suffix has correct class applied'
      );
  });

  test('it sets the correct css custom properties', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        id="MyRangeSlider"
        value=25
      }}
    `);

    const styleString = find(sliderWrapperSelector).getAttribute('style');

    assert.ok(styleString.indexOf('--Polaris-RangeSlider-min:0;') > -1);
    assert.ok(styleString.indexOf('--Polaris-RangeSlider-max:100;') > -1);
    assert.ok(styleString.indexOf('--Polaris-RangeSlider-current:25;') > -1);
    assert.ok(styleString.indexOf('--Polaris-RangeSlider-progress:25%;') > -1);
    assert.ok(
      styleString.indexOf('--Polaris-RangeSlider-output-factor:0.25;') > -1
    );
  });
});
