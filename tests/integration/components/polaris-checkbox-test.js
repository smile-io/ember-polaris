import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, focus, click, blur } from 'ember-native-dom-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';
import buildNestedSelector from '../../helpers/build-nested-selector';

// Mock the polaris-choice component to simplify testing what gets rendered.
// const MockPolarisChoiceComponent = Component.extend({
//   tagName: 'label',
//   classNames: ['Polaris-Choice'],
//
//   layout: hbs`{{yield}}`,
//
//   // Bind attributes to the element's dataset for testing.
//   attributeBindings: [
//     'inputId:data-input-id',
//     'label:data-label',
//     'labelHidden:data-label-hidden',
//     'helpText:data-help-text',
//     'error:data-error',
//   ],
// });

const DummyLabelComponent = Component.extend({
  tagName: 'div',
  classNames: ['dummy-label'],

  layout: hbs`{{yield}}`,

  text: null,
});

module('Integration | Component | polaris checkbox', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
    this.owner.register('component:dummy-label', DummyLabelComponent);
  });

  const choiceSelector = 'label.Polaris-Choice';
  const checkboxControlWrapperSelector = buildNestedSelector(
    choiceSelector,
    'span.Polaris-Choice__Control'
  );
  const checkboxWrapperSelector = buildNestedSelector(
    checkboxControlWrapperSelector,
    'span.Polaris-Checkbox'
  );
  const checkboxInputSelector = buildNestedSelector(
    checkboxWrapperSelector,
    'input.Polaris-Checkbox__Input[type="checkbox"]'
  );
  const checkboxBackdropSelector = buildNestedSelector(
    checkboxWrapperSelector,
    'span.Polaris-Checkbox__Backdrop'
  );
  const checkboxIconSelector = buildNestedSelector(
    checkboxWrapperSelector,
    'span.Polaris-Checkbox__Icon'
  );
  const checkboxIconSvgSelector = buildNestedSelector(
    checkboxIconSelector,
    'span.Polaris-Icon',
    'svg'
  );
  const checkboxLabelSelector = buildNestedSelector(
    choiceSelector,
    'span.Polaris-Choice__Label'
  );

  test('it renders the correct HTML', async function(assert) {
    this.setProperties({
      error: "I've got an error",
      labelHidden: true,
    });
    await render(hbs`
      {{polaris-checkbox
        inputId="some-checkbox-id"
        name="Check me out"
        value="Check it"
        label="Checkbox label"
        labelHidden=labelHidden
        helpText="Help!"
        error=error
      }}
    `);

    const choices = findAll(choiceSelector);
    assert.equal(choices.length, 1, 'renders one `polaris-choice` component');

    const choice = choices[0];
    assert.ok(
      choice.classList.contains('Polaris-Choice--labelHidden'),
      'sets the labelHidden class when the label is hidden'
    );

    this.set('labelHidden', false);
    assert.notOk(
      choice.classList.contains('Polaris-Choice--labelHidden'),
      'does not set the labelHidden class when the label is not hidden'
    );

    const helpTextSelector = buildNestedSelector(
      'div.Polaris-Choice__Descriptions',
      'div.Polaris-Choice__HelpText'
    );
    const helpTexts = findAll(helpTextSelector);
    assert.equal(helpTexts.length, 1, 'renders one help text');
    assert.equal(
      helpTexts[0].textContent.trim(),
      'Help!',
      'renders the correct help text'
    );

    const errorSelector = buildNestedSelector(
      'div.Polaris-Choice__Descriptions',
      'div.Polaris-Choice__Error'
    );
    const errors = findAll(errorSelector);
    assert.equal(errors.length, 1, 'renders one error');
    assert.equal(
      errors[0].textContent.trim(),
      "I've got an error",
      'renders the correct error text'
    );

    // Check the label.
    const labels = findAll(checkboxLabelSelector);
    assert.equal(labels.length, 1, 'renders one checkbox label');
    assert.equal(
      labels[0].textContent.trim(),
      'Checkbox label',
      'renders the correct checkbox label content'
    );

    // Check the wrapper element and its class handling.
    const checkboxWrappers = findAll(checkboxWrapperSelector);
    assert.equal(checkboxWrappers.length, 1, 'renders one checkbox wrapper');
    assert.ok(
      checkboxWrappers[0].classList.contains('Polaris-Checkbox--error'),
      'applies error class when error present'
    );

    this.set('error', null);
    assert.notOk(
      checkboxWrappers[0].classList.contains('Polaris-Checkbox--error'),
      'does not apply error class when error not present'
    );

    // Check the input.
    const inputs = findAll(checkboxInputSelector);
    assert.equal(inputs.length, 1, 'renders one checkbox input');

    const input = inputs[0];
    assert.equal(
      input.id,
      'some-checkbox-id',
      'checkbox input has the right id'
    );
    assert.equal(
      input.name,
      'Check me out',
      'checkbox input has the right name'
    );
    assert.equal(input.value, 'Check it', 'checkbox input has the right value');

    const backdrops = findAll(checkboxBackdropSelector);
    assert.equal(backdrops.length, 1, 'renders one checkbox backdrop');

    const icons = findAll(checkboxIconSvgSelector);
    assert.equal(icons.length, 1, 'renders one checkbox icon');
    assert.equal(
      icons[0].dataset.iconSource,
      'polaris/checkmark',
      'renders the correct checkbox icon'
    );
  });

  test('it handles the disabled attribute correctly', async function(assert) {
    this.set('disabled', true);
    await render(hbs`{{polaris-checkbox disabled=disabled}}`);

    const input = find(checkboxInputSelector);
    assert.ok(input, 'renders the input');
    assert.ok(
      input.disabled,
      'checkbox input is disabled when disabled is true'
    );

    this.set('disabled', false);
    assert.notOk(
      input.disabled,
      'checkbox input is not disabled when disabled is false'
    );
  });

  test("it sets the input's aria-describedby attribute correctly", async function(assert) {
    this.setProperties({
      error: 'some error',
      helpText: 'some help text',
    });
    await render(hbs`
      {{polaris-checkbox
        inputId="described-checkbox"
        error=error
        helpText=helpText
      }}
    `);

    assert.ok(find(checkboxInputSelector), 'renders the input');

    // With both an error and helpText, the checkbox input should
    // be described by both the error and help text elements.
    assert.ok(
      find(checkboxInputSelector)
        .getAttribute('aria-describedby')
        .indexOf('described-checkboxError') > -1 &&
        find(checkboxInputSelector)
          .getAttribute('aria-describedby')
          .indexOf('described-checkboxHelpText') > -1,
      'described by error and help text elements when error and help text are present'
    );

    this.set('error', null);
    assert.equal(
      find(checkboxInputSelector).getAttribute('aria-describedby'),
      'described-checkboxHelpText',
      'described by help text element when help text is present'
    );

    this.set('helpText', null);
    assert.notOk(
      find(checkboxInputSelector).getAttribute('aria-describedby'),
      'has no description when no error or help text are present'
    );

    this.set('error', 'some other error');
    assert.equal(
      find(checkboxInputSelector).getAttribute('aria-describedby'),
      'described-checkboxError',
      'described by error element when error is present'
    );
  });

  test("it sets the input's aria-invalid attribute correctly", async function(assert) {
    this.set('error', 'some error');
    await render(hbs`{{polaris-checkbox error=error}}`);

    assert.ok(find(checkboxInputSelector), 'renders the input');

    assert.equal(
      find(checkboxInputSelector).getAttribute('aria-invalid'),
      'true',
      'aria-invalid attribute set when error present'
    );

    this.set('error', null);
    assert.equal(
      find(checkboxInputSelector).getAttribute('aria-invalid'),
      'false',
      'aria-invalid attribute not when no error'
    );
  });

  test('it handles events correctly', async function(assert) {
    this.setProperties({
      checked: false,
      focusFired: false,
      blurFired: false,
    });
    await render(hbs`
      {{polaris-checkbox
        checked=checked
        onChange=(action (mut checked))
        onFocus=(action (mut focusFired) true)
        onBlur=(action (mut blurFired) true)
      }}
    `);

    focus(checkboxInputSelector);
    assert.ok(this.get('focusFired'), 'after focus - onFocus fired');
    assert.notOk(this.get('blurFired'), 'after focus - onBlur not fired');

    click(checkboxInputSelector);
    assert.notOk(this.get('blurFired'), 'after click - onBlur not fired');
    assert.equal(
      this.get('checked'),
      true,
      'after click - checked has updated'
    );

    blur(checkboxInputSelector);
    assert.ok(this.get('blurFired'), 'after blur - onBlur fired');
  });

  test('it handles the checked state correctly', async function(assert) {
    await render(hbs`{{polaris-checkbox checked=checked}}`);

    let checkboxInput = find(checkboxInputSelector);
    assert.ok(checkboxInput, 'renders the checkbox input');

    let checkboxIcon = find(checkboxIconSvgSelector);
    assert.ok(checkboxIcon, 'renders the checkbox icon');

    // `checked` should default to false.
    assert.notOk(
      checkboxInput.checked,
      'checked unset - checkbox is not checked'
    );
    assert.equal(
      checkboxInput.getAttribute('aria-checked'),
      'false',
      'checked unset - checkbox has aria-checked false'
    );
    assert.notOk(
      checkboxInput.classList.contains(
        'Polaris-Checkbox__Input--indeterminate'
      ),
      'checked unset - checkbox does not have indeterminate class'
    );
    assert.equal(
      checkboxIcon.dataset.iconSource,
      'polaris/checkmark',
      'checked unset - renders the correct checkbox icon'
    );
    assert.notOk(
      checkboxInput.hasAttribute('indeterminate'),
      'checked unset - checkbox does not have indeterminate attribute'
    );

    this.set('checked', true);
    assert.ok(checkboxInput.checked, 'checked true - checkbox is checked');
    assert.equal(
      checkboxInput.getAttribute('aria-checked'),
      'true',
      'checked true - checkbox has aria-checked true'
    );
    assert.notOk(
      checkboxInput.classList.contains(
        'Polaris-Checkbox__Input--indeterminate'
      ),
      'checked true - checkbox does not have indeterminate class'
    );
    assert.equal(
      checkboxIcon.dataset.iconSource,
      'polaris/checkmark',
      'checked true - renders the correct checkbox icon'
    );
    assert.notOk(
      checkboxInput.hasAttribute('indeterminate'),
      'checked true - checkbox does not have indeterminate attribute'
    );

    this.set('checked', 'indeterminate');
    assert.notOk(
      checkboxInput.checked,
      'checked indeterminate - checkbox is not checked'
    );
    assert.equal(
      checkboxInput.getAttribute('aria-checked'),
      'mixed',
      'checked indeterminate - checkbox has aria-checked mixed'
    );
    assert.ok(
      checkboxInput.classList.contains(
        'Polaris-Checkbox__Input--indeterminate'
      ),
      'checked indeterminate - checkbox has indeterminate class'
    );
    assert.equal(
      checkboxIcon.dataset.iconSource,
      'polaris/subtract',
      'checked indeterminate - renders the correct checkbox icon'
    );
    // TODO: figure out why this attribute isn't binding...
    // assert.equal(checkboxInput.getAttribute('indeterminate'), 'true', 'checked indeterminate - checkbox has indeterminate attribute');

    this.set('checked', false);
    assert.notOk(
      checkboxInput.checked,
      'checked false - checkbox is not checked'
    );
    assert.equal(
      checkboxInput.getAttribute('aria-checked'),
      'false',
      'checked false - checkbox has aria-checked false'
    );
    assert.notOk(
      checkboxInput.classList.contains(
        'Polaris-Checkbox__Input--indeterminate'
      ),
      'checked false - checkbox does not have indeterminate class'
    );
    assert.equal(
      checkboxIcon.dataset.iconSource,
      'polaris/checkmark',
      'checked false - renders the correct checkbox icon'
    );
    assert.notOk(
      checkboxInput.hasAttribute('indeterminate'),
      'checked false - checkbox does not have indeterminate attribute'
    );

    // TODO: check icon
  });

  test('it handles explicit label components correctly', async function(assert) {
    await render(hbs`{{polaris-checkbox labelComponent="dummy-label"}}`);

    const dummyLabelSelector = buildNestedSelector(
      checkboxLabelSelector,
      'div.dummy-label'
    );
    const dummyLabels = findAll(dummyLabelSelector);
    assert.equal(dummyLabels.length, 1, 'renders one label component');
  });

  test('it handles label components correctly', async function(assert) {
    await render(hbs`{{polaris-checkbox label=(component "dummy-label")}}`);

    const dummyLabelSelector = buildNestedSelector(
      checkboxLabelSelector,
      'div.dummy-label'
    );
    const dummyLabels = findAll(dummyLabelSelector);
    assert.equal(dummyLabels.length, 1, 'renders one label component');
  });
});
