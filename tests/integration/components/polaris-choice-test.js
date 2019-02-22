import Component from '@ember/component';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

// A simple component to test rendering of label components.
const TestLabelComponent = Component.extend({
  tagName: 'div',
  classNames: ['test-label-component'],

  layout: hbs`{{text}}`,

  text: 'test label component',
});

moduleForComponent(
  'polaris-choice',
  'Integration | Component | polaris choice',
  {
    integration: true,

    beforeEach() {
      this.register('component:svg-jar', MockSvgJarComponent);
      this.register('component:test-label', TestLabelComponent);
    },
  }
);

const labelSelector = 'label.Polaris-Choice';
const controlSelector = buildNestedSelector(
  labelSelector,
  'span.Polaris-Choice__Control'
);
const labelContentSelector = buildNestedSelector(
  labelSelector,
  'span.Polaris-Choice__Label'
);

// When an error or help text are passed into the choice component,
// they get rendered in a description div alongside the label;
// both get wrapped up in one containing div.
const withDescriptionWrapperSelector = buildNestedSelector(
  'div.choice-with-description-wrapper',
  'div'
);
const labelWithDescriptionSelector = buildNestedSelector(
  withDescriptionWrapperSelector,
  labelSelector
);
const controlWithDescriptionSelector = buildNestedSelector(
  withDescriptionWrapperSelector,
  controlSelector
);
const labelContentWithDescriptionSelector = buildNestedSelector(
  withDescriptionWrapperSelector,
  labelContentSelector
);

const descriptionSelector = buildNestedSelector(
  withDescriptionWrapperSelector,
  'div.Polaris-Choice__Descriptions'
);
const helpTextSelector = buildNestedSelector(
  descriptionSelector,
  'div.Polaris-Choice__HelpText'
);
const errorSelector = buildNestedSelector(
  descriptionSelector,
  'div.Polaris-Choice__Error'
);
const errorIconSelector = buildNestedSelector(
  errorSelector,
  'div.Polaris-InlineError',
  'div.Polaris-InlineError__Icon',
  'span.Polaris-Icon',
  'svg'
);

test('it renders the correct HTML when no error or helpText are provided', function(assert) {
  this.render(hbs`
    {{#polaris-choice inputId="test-choice" label="This is my label"}}
      <span class="test-control">This is a test control</span>
    {{/polaris-choice}}
  `);

  const labels = findAll(labelSelector);
  assert.equal(labels.length, 1, 'renders one label');
  assert.equal(
    labels[0].attributes['for'].textContent.trim(),
    'test-choice',
    'renders the label with the correct `for` attribute'
  );

  const testControlSelector = buildNestedSelector(
    controlSelector,
    'span.test-control'
  );
  const testControls = findAll(testControlSelector);
  assert.equal(testControls.length, 1, 'renders one control');
  assert.equal(
    testControls[0].textContent.trim(),
    'This is a test control',
    'renders the control correctly'
  );

  const labelContents = findAll(labelContentSelector);
  assert.equal(labelContents.length, 1, 'renders one label content wrapper');
  assert.equal(
    labelContents[0].textContent.trim(),
    'This is my label',
    'renders the label text correctly'
  );
});

test('it renders the correct HTML when helpText is provided', function(assert) {
  this.render(hbs`
    <div class="choice-with-description-wrapper">
      {{#polaris-choice
        inputId="helpful-test-choice"
        label="This is my label for a control with help text"
        helpText="This is some help text"
      }}
        <span class="helpful-test-control">This is a test control with help text</span>
      {{/polaris-choice}}
    </div>
  `);

  const labels = findAll(labelWithDescriptionSelector);
  assert.equal(labels.length, 1, 'renders one label');
  assert.equal(
    labels[0].attributes['for'].textContent.trim(),
    'helpful-test-choice',
    'renders the label with the correct `for` attribute'
  );

  const testControlSelector = buildNestedSelector(
    controlWithDescriptionSelector,
    'span.helpful-test-control'
  );
  const testControls = findAll(testControlSelector);
  assert.equal(testControls.length, 1, 'renders one control');
  assert.equal(
    testControls[0].textContent.trim(),
    'This is a test control with help text',
    'renders the control correctly'
  );

  const labelContents = findAll(labelContentWithDescriptionSelector);
  assert.equal(labelContents.length, 1, 'renders one label content wrapper');
  assert.equal(
    labelContents[0].textContent.trim(),
    'This is my label for a control with help text',
    'renders the label text correctly'
  );

  // Check the help text rendering.
  const helpTexts = findAll(helpTextSelector);
  assert.equal(helpTexts.length, 1, 'renders one help text');
  // assert.equal(helpTexts[0].id, 'helpful-test-choiceHelpText'); TODO: figure out why ID isn't being set
  assert.equal(
    helpTexts[0].textContent.trim(),
    'This is some help text',
    'renders the correct help text'
  );
});

test('it renders the correct HTML when an error is provided', function(assert) {
  this.render(hbs`
    <div class="choice-with-description-wrapper">
      {{#polaris-choice
        inputId="error-test-choice"
        label="This is my label for a control with an error"
        error="This is an error message"
      }}
        <span class="error-test-control">This is a test control with an error</span>
      {{/polaris-choice}}
    </div>
  `);

  const labels = findAll(labelWithDescriptionSelector);
  assert.equal(labels.length, 1, 'renders one label');
  assert.equal(
    labels[0].attributes['for'].textContent.trim(),
    'error-test-choice',
    'renders the label with the correct `for` attribute'
  );

  const testControlSelector = buildNestedSelector(
    controlWithDescriptionSelector,
    'span.error-test-control'
  );
  const testControls = findAll(testControlSelector);
  assert.equal(testControls.length, 1, 'renders one control');
  assert.equal(
    testControls[0].textContent.trim(),
    'This is a test control with an error',
    'renders the control correctly'
  );

  const labelContents = findAll(labelContentWithDescriptionSelector);
  assert.equal(labelContents.length, 1, 'renders one label content wrapper');
  assert.equal(
    labelContents[0].textContent.trim(),
    'This is my label for a control with an error',
    'renders the label text correctly'
  );

  // Check the error rendering.
  const errors = findAll(errorSelector);
  assert.equal(errors.length, 1, 'renders one error');
  // assert.equal(errors[0].id, 'error-test-choiceError'); TODO: figure out why ID isn't being set
  assert.equal(
    errors[0].textContent.trim(),
    'This is an error message',
    'renders the correct error text'
  );

  const errorIcons = findAll(errorIconSelector);
  assert.equal(errorIcons.length, 1, 'renders one error icon');
  assert.equal(
    errorIcons[0].dataset.iconSource,
    'polaris/alert',
    'renders the correct error icon'
  );
});

test('it handles the labelHidden attribute correctly', function(assert) {
  this.set('labelHidden', true);
  this.render(hbs`
    {{polaris-choice
      inputId="hidden-label-test-choice"
      label="This is my hidden label"
      labelHidden=labelHidden
    }}
  `);

  let label = find(labelSelector);
  assert.ok(label, 'without description - renders the label');
  assert.ok(
    label.classList.contains('Polaris-Choice--labelHidden'),
    'without description - applies labelHidden class when labelHidden true'
  );

  this.set('labelHidden', false);
  assert.notOk(
    label.classList.contains('Polaris-Choice--labelHidden'),
    'without description - does not apply labelHidden class when labelHidden false'
  );

  this.render(hbs`
    {{polaris-choice
      inputId="hidden-label-test-choice-with-error"
      label="This is my hidden label with an error"
      labelHidden=labelHidden
      error="This is an error message"
    }}
  `);

  label = find(labelSelector);
  assert.ok(label, 'with description - renders the label');
  assert.notOk(
    label.classList.contains('Polaris-Choice--labelHidden'),
    'with description - does not apply labelHidden class when labelHidden false'
  );

  this.set('labelHidden', true);
  assert.ok(
    label.classList.contains('Polaris-Choice--labelHidden'),
    'with description - applies labelHidden class when labelHidden true'
  );
});

test('it handles label components correctly when no description is present', function(assert) {
  this.setProperties({
    label: null,
    labelComponent: 'test-label',
  });

  this.render(hbs`
    {{polaris-choice
      label=label
      labelComponent=labelComponent
    }}
  `);

  let labelContent = find(labelContentSelector);
  assert.ok(labelContent, 'renders the label');

  const labelComponentSelector = buildNestedSelector(
    labelContentSelector,
    'div.test-label-component'
  );
  let labelComponent = find(labelComponentSelector);
  assert.ok(
    labelComponent,
    'with label component string - renders the label component'
  );
  assert.equal(
    labelContent.textContent.trim(),
    'test label component',
    'with label component string - renders the correct label content'
  );

  this.set('label', 'literal label');
  assert.equal(
    labelContent.textContent.trim(),
    'test label component',
    'with label component string and label - renders the correct label content'
  );

  this.set('labelComponent', null);
  assert.equal(
    labelContent.textContent.trim(),
    'literal label',
    'with label - renders the correct label content'
  );

  this.setProperties({
    label: null,
    useLabelComponent: true,
  });
  this.render(hbs`
    {{polaris-choice
      label=label
      labelComponent=(if useLabelComponent (
        component "test-label" text="test label component from component closure"
      ))
    }}
  `);

  labelContent = find(labelContentSelector);
  assert.ok(labelContent, 'renders the label');

  labelComponent = find(labelComponentSelector);
  assert.ok(
    labelComponent,
    'with label component closure - renders the label component'
  );
  assert.equal(
    labelContent.textContent.trim(),
    'test label component from component closure',
    'with label component closure - renders the correct label content'
  );

  this.set('label', 'literal label');
  assert.equal(
    labelContent.textContent.trim(),
    'test label component from component closure',
    'with label component closure and label - renders the correct label content'
  );

  this.set('useLabelComponent', false);
  assert.equal(
    labelContent.textContent.trim(),
    'literal label',
    'with label - renders the correct label content'
  );
});

test('it handles label components correctly when a description is supplied', function(assert) {
  this.setProperties({
    label: null,
    labelComponent: 'test-label',
  });

  this.render(hbs`
    {{polaris-choice
      label=label
      labelComponent=labelComponent
      description="testing label components"
    }}
  `);

  let labelContent = find(labelContentSelector);
  assert.ok(labelContent, 'renders the label');

  const labelComponentSelector = buildNestedSelector(
    labelContentSelector,
    'div.test-label-component'
  );
  let labelComponent = find(labelComponentSelector);
  assert.ok(
    labelComponent,
    'with label component string - renders the label component'
  );
  assert.equal(
    labelContent.textContent.trim(),
    'test label component',
    'with label component string - renders the correct label content'
  );

  this.set('label', 'literal label');
  assert.equal(
    labelContent.textContent.trim(),
    'test label component',
    'with label component string and label - renders the correct label content'
  );

  this.set('labelComponent', null);
  assert.equal(
    labelContent.textContent.trim(),
    'literal label',
    'with label - renders the correct label content'
  );

  this.setProperties({
    label: null,
    useLabelComponent: true,
  });
  this.render(hbs`
    {{polaris-choice
      label=label
      labelComponent=(if useLabelComponent (
        component "test-label" text="test label component from component closure"
      ))
    }}
  `);

  labelContent = find(labelContentSelector);
  assert.ok(labelContent, 'renders the label');

  labelComponent = find(labelComponentSelector);
  assert.ok(
    labelComponent,
    'with label component closure - renders the label component'
  );
  assert.equal(
    labelContent.textContent.trim(),
    'test label component from component closure',
    'with label component closure - renders the correct label content'
  );

  this.set('label', 'literal label');
  assert.equal(
    labelContent.textContent.trim(),
    'test label component from component closure',
    'with label component closure and label - renders the correct label content'
  );

  this.set('useLabelComponent', false);
  assert.equal(
    labelContent.textContent.trim(),
    'literal label',
    'with label - renders the correct label content'
  );
});

test('it handles the disabled attribute correctly', function(assert) {
  let disabledClass = 'Polaris-Choice--disabled';

  this.set('disabled', true);

  this.render(hbs`
    {{polaris-choice
      inputId="disabled-test"
      label="My label"
      disabled=disabled
    }}
  `);

  assert.dom(labelSelector).hasClass(disabledClass);

  this.set('disabled', false);

  assert.dom(labelSelector).hasNoClass(disabledClass);
});

test('it allows passing a component as the helpText property', function(assert) {
  this.render(hbs`
    {{polaris-choice
      inputId="help-text-component-test"
      helpText=(component "polaris-icon" source="circle-check-mark")
    }}
  `);

  assert.dom('[data-test-icon]').exists({ count: 1 });
});
