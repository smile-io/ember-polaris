import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-range-slider', function(hooks) {
  setupRenderingTest(hooks);

  test('it allows specific props to pass through properties on the input', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=15
        min=10
        max=20
        step=0.5
        disabled=true
      }}
    `);

    // TODO: Ember doesn't seem to be binding the `value` attribute on the input element...
    // assert.dom('input').hasAttribute('value', '15');
    assert.dom('input').hasAttribute('min', '10');
    assert.dom('input').hasAttribute('max', '20');
    assert.dom('input').hasAttribute('step', '0.5');
    assert.dom('input').hasAttribute('disabled');
  });

  test('it calls `onChange` with the new value when the value is changed', async function(assert) {
    assert.expect(2);

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

    find('input').value = '40';
    await triggerEvent('input', 'input');
  });

  test('`onFocus` is called when the input is focused', async function(assert) {
    assert.expect(1);

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

    await triggerEvent('input', 'focus');
  });

  test('`onBlur` is called when the input is blurred', async function(assert) {
    assert.expect(1);

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

    await triggerEvent('input', 'blur');
  });

  test('it sets the id on the input when an ID is passed', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        id="MyRangeSlider"
        value=50
      }}
    `);

    assert.dom('input').hasAttribute('id', 'MyRangeSlider');
  });

  test('it sets a random id on the input when none is passed', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
      }}
    `);

    assert.dom('input').hasAttribute('id');
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

    const inputId = find('input').getAttribute('id');
    assert.equal(typeof inputId, 'string');
    assert.dom('output').hasAttribute('for', inputId);
  });

  test('output contains correct value text when output is rendered', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        output=true
      }}
    `);

    assert.dom('output span').hasText('50');
  });

  test('it connects the input to the help text when help text is supplied', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        helpText="Some help"
      }}
    `);
    const helpTextId = find('input').getAttribute('aria-describedby');

    assert.equal(typeof helpTextId, 'string');
    assert.dom(`#${ helpTextId }`).hasText('Some help');
  });

  test('it marks the input as invalid when an error is present', async function(assert) {
    this.owner.register('component:my-error-component', Component.extend({
      tagName: 'span',
      layout: hbs`{{text}}`,

      text: null,
    }));

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        error=(component "my-error-component" text="Invalid")
      }}
    `);
    assert.dom('input').hasAttribute('aria-invalid', 'true');

    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        error="Some error"
      }}
    `);
    assert.dom('input').hasAttribute('aria-invalid', 'true');
  });

  test('it connects the input to the error when an error is present', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        value=50
        error="Some error"
      }}
    `);
    const errorId = find('input').getAttribute('aria-describedby');

    assert.equal(typeof errorId, 'string');
    assert.dom(`#${ errorId }`).hasText('Some error');
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
    const descriptions = find('input').getAttribute('aria-describedby').split(' ');

    assert.equal(descriptions.length, 2);
    assert.dom(`#${ descriptions[1] }`).hasText('Some help');
    assert.dom(`#${ descriptions[0] }`).hasText('Some error');
  });

  test('it sets the correct css custom properties', async function(assert) {
    await render(hbs`
      {{polaris-range-slider
        label="RangeSlider"
        id="MyRangeSlider"
        value=25
      }}
    `);

    const styleString = find('input').parentElement.getAttribute('style');

    assert.ok(styleString.indexOf('--Polaris-RangeSlider-min:0;') > -1);
    assert.ok(styleString.indexOf('--Polaris-RangeSlider-max:100;') > -1);
    assert.ok(styleString.indexOf('--Polaris-RangeSlider-current:25;') > -1);
    assert.ok(styleString.indexOf('--Polaris-RangeSlider-progress:25%;') > -1);
    assert.ok(styleString.indexOf('--Polaris-RangeSlider-output-factor:0.25;') > -1);
  });
});
