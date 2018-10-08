import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent(
  'polaris-choice-list',
  'Integration | Component | polaris choice list',
  {
    integration: true,

    beforeEach() {
      this.register('component:svg-jar', MockSvgJarComponent);
    },
  }
);

const choiceListSelector = 'fieldset.Polaris-ChoiceList';
const choicesWrapperSelector = buildNestedSelector(
  choiceListSelector,
  'ul.Polaris-ChoiceList__Choices'
);
const choiceSelector = buildNestedSelector(
  choicesWrapperSelector,
  'li',
  'label.Polaris-Choice'
);
const radioInputSelector = buildNestedSelector(
  'span.Polaris-RadioButton',
  'input[type="radio"]'
);
const checkboxInputSelector = buildNestedSelector(
  'span.Polaris-Checkbox',
  'input[type="checkbox"]'
);
const titleSelector = buildNestedSelector(
  choiceListSelector,
  'legend.Polaris-ChoiceList__Title'
);

const choiceWithDescriptionWrapperSelector = buildNestedSelector(
  choicesWrapperSelector,
  'li',
  'div'
);
const choiceWithDescriptionSelector = buildNestedSelector(
  choiceWithDescriptionWrapperSelector,
  'label.Polaris-Choice'
);
const helpTextSelector = buildNestedSelector(
  choiceWithDescriptionWrapperSelector,
  'div.Polaris-Choice__Descriptions',
  'div.Polaris-Choice__HelpText'
);
const choiceErrorSelector = buildNestedSelector(
  choiceListSelector,
  'div.Polaris-ChoiceList__ChoiceError'
)

test('it renders the correct HTML when allowMultiple is false', function(assert) {
  this.render(hbs`
    {{polaris-choice-list
      name="test-single-choice-list"
      allowMultiple=false
      choices=(array
        (hash
          label="First option"
          value="one"
        )
        (hash
          label="Second option"
          value="two"
        )
        (hash
          label="Third option"
          value="three"
        )
      )
      selected=(array
        "two"
      )
    }}
  `);

  const choices = findAll(choiceSelector);
  assert.equal(choices.length, 3, 'renders three choices');

  // Check the choices.
  let choice = choices[0];
  assert.dom(choice).hasText('First option', 'first choice - has correct label text');
  let radioInput = find(radioInputSelector, choice);
  assert.ok(radioInput, 'first choice - renders radio input');
  assert.equal(
    radioInput.value,
    'one',
    'first choice - radio input has the correct value'
  );
  assert.equal(
    radioInput.name,
    'test-single-choice-list',
    'first choice - radio input has the correct name'
  );
  assert.notOk(radioInput.checked, 'first choice - radio input is not checked');

  choice = choices[1];
  assert.dom(choice).hasText('Second option', 'second choice - has correct label text');
  radioInput = find(radioInputSelector, choice);
  assert.ok(radioInput, 'second choice - renders radio input');
  assert.equal(
    radioInput.value,
    'two',
    'second choice - radio input has the correct value'
  );
  assert.equal(
    radioInput.name,
    'test-single-choice-list',
    'second choice - radio input has the correct name'
  );
  assert.ok(radioInput.checked, 'second choice - radio input is checked');

  choice = choices[2];
  assert.dom(choice).hasText('Third option', 'third choice - has correct label text');
  radioInput = find(radioInputSelector, choice);
  assert.ok(radioInput, 'third choice - renders radio input');
  assert.equal(
    radioInput.value,
    'three',
    'third choice - radio input has the correct value'
  );
  assert.equal(
    radioInput.name,
    'test-single-choice-list',
    'third choice - radio input has the correct name'
  );
  assert.notOk(radioInput.checked, 'third choice - radio input is not checked');
});

test('it renders the correct HTML when allowMultiple is true', function(assert) {
  this.render(hbs`
    {{polaris-choice-list
      name="test-multiple-choice-list"
      allowMultiple=true
      choices=(array
        (hash
          label="First option"
          value="one"
        )
        (hash
          label="Second option"
          value="two"
        )
        (hash
          label="Third option"
          value="three"
        )
      )
      selected=(array
        "two"
        "three"
      )
    }}
  `);

  const choices = findAll(choiceSelector);
  assert.equal(choices.length, 3, 'renders three choices');

  // Check the choices.
  let choice = choices[0];
  assert.dom(choice).hasText('First option', 'first choice - has correct label text');
  let checkboxInput = find(checkboxInputSelector, choice);
  assert.ok(checkboxInput, 'first choice - renders checkbox input');
  assert.equal(
    checkboxInput.value,
    'one',
    'first choice - checkbox input has the correct value'
  );
  assert.equal(
    checkboxInput.name,
    'test-multiple-choice-list[]',
    'first choice - checkbox input has the correct name'
  );
  assert.notOk(
    checkboxInput.checked,
    'first choice - checkbox input is not checked'
  );

  choice = choices[1];
  assert.dom(choice).hasText('Second option', 'second choice - has correct label text');
  checkboxInput = find(checkboxInputSelector, choice);
  assert.ok(checkboxInput, 'second choice - renders checkbox input');
  assert.equal(
    checkboxInput.value,
    'two',
    'second choice - checkbox input has the correct value'
  );
  assert.equal(
    checkboxInput.name,
    'test-multiple-choice-list[]',
    'second choice - checkbox input has the correct name'
  );
  assert.ok(checkboxInput.checked, 'second choice - checkbox input is checked');

  choice = choices[2];
  assert.dom(choice).hasText('Third option', 'third choice - has correct label text');
  checkboxInput = find(checkboxInputSelector, choice);
  assert.ok(checkboxInput, 'third choice - renders checkbox input');
  assert.equal(
    checkboxInput.value,
    'three',
    'third choice - checkbox input has the correct value'
  );
  assert.equal(
    checkboxInput.name,
    'test-multiple-choice-list[]',
    'third choice - checkbox input has the correct name'
  );
  assert.ok(checkboxInput.checked, 'third choice - checkbox input is checked');
});

test('it handles title and titleHidden attributes correctly', function(assert) {
  this.setProperties({
    title: 'Original title',
    titleHidden: false,
  });
  this.render(hbs`{{polaris-choice-list title=title titleHidden=titleHidden}}`);

  const choiceLists = findAll(choiceListSelector);
  assert.equal(
    choiceLists.length,
    1,
    'with title set and unhidden - renders one choice list'
  );
  const choiceList = choiceLists[0];
  assert.dom(choiceList).hasNoClass(
    'Polaris-ChoiceList--titleHidden',
    'with title set and unhidden - does not apply titleHidden class to choice list'
  );

  let titles = findAll(titleSelector);
  assert.equal(
    titles.length,
    1,
    'with title set and unhidden - renders one title'
  );
  assert.dom(titles[0]).hasText(
    'Original title',
    'with title set and unhidden - renders the correct title text'
  );

  this.set('titleHidden', true);
  assert.dom(choiceList).hasClass(
    'Polaris-ChoiceList--titleHidden',
    'with title set and hidden - applies titleHidden class to choice list'
  );

  this.set('title', null);
  titles = findAll(titleSelector);
  assert.equal(titles.length, 0, 'with title unset - does not render a title');
});

test('it handles choice selection correctly when allowMultiple is false', function(assert) {
  this.set('selected', ['two']);
  this.set('choices', [
    {
      label: 'First option',
      value: 'one',
    },
    {
      label: 'Second option',
      value: 'two',
    },
    {
      label: 'Third option',
      value: 'three',
    },
  ]);
  this.render(hbs`
    {{polaris-choice-list
      allowMultiple=false
      choices=choices
      selected=selected
      onChange=(action (mut selected))
    }}
  `);

  const radioInputs = findAll(radioInputSelector);
  assert.equal(radioInputs.length, 3, 'renders three radio inputs');

  assert.notOk(
    radioInputs[0].checked,
    'before click - first radio input is not checked'
  );
  assert.ok(
    radioInputs[1].checked,
    'before click - second radio input is checked'
  );
  assert.notOk(
    radioInputs[2].checked,
    'before click - third radio input is not checked'
  );

  // Click the first choice.
  click(`${radioInputSelector}[value="one"]`);

  assert.deepEqual(
    this.get('selected'),
    ['one'],
    'after click - selected value updated correctly'
  );
  assert.ok(
    radioInputs[0].checked,
    'after clicking first radio button - first radio input is checked'
  );
  assert.notOk(
    radioInputs[1].checked,
    'after clicking first radio button - second radio input is not checked'
  );
  assert.notOk(
    radioInputs[2].checked,
    'after clicking first radio button - third radio input is not checked'
  );
});

test('it handles choice selection correctly when allowMultiple is true', function(assert) {
  this.set('selected', ['one', 'three']);
  this.set('choices', [
    {
      label: 'First option',
      value: 'one',
    },
    {
      label: 'Second option',
      value: 'two',
    },
    {
      label: 'Third option',
      value: 'three',
    },
  ]);
  this.render(hbs`
    {{polaris-choice-list
      allowMultiple=true
      choices=choices
      selected=selected
      onChange=(action (mut selected))
    }}
  `);

  const checkboxInputs = findAll(checkboxInputSelector);
  assert.equal(checkboxInputs.length, 3, 'renders three checkbox inputs');

  assert.ok(
    checkboxInputs[0].checked,
    'before click - first checkbox input is checked'
  );
  assert.notOk(
    checkboxInputs[1].checked,
    'before click - second checkbox input is not checked'
  );
  assert.ok(
    checkboxInputs[2].checked,
    'before click - third checkbox input is checked'
  );

  // Click the second choice to select it.
  click(`${checkboxInputSelector}[value="two"]`);

  let selected = this.get('selected');
  assert.ok(
    selected.indexOf('one') > -1,
    "after clicking second checkbox - selected values contains 'one'"
  );
  assert.ok(
    selected.indexOf('two') > -1,
    "after clicking second checkbox - selected values contains 'two'"
  );
  assert.ok(
    selected.indexOf('three') > -1,
    "after clicking second checkbox - selected values contains 'three'"
  );
  assert.ok(
    checkboxInputs[0].checked,
    'after clicking second checkbox - first checkbox input is checked'
  );
  assert.ok(
    checkboxInputs[1].checked,
    'after clicking second checkbox - second checkbox input is checked'
  );
  assert.ok(
    checkboxInputs[2].checked,
    'after clicking second checkbox - third checkbox input is checked'
  );

  // Click the third choice to deselect it.
  click(`${checkboxInputSelector}[value="three"]`);

  selected = this.get('selected');
  assert.ok(
    selected.indexOf('one') > -1,
    "after clicking third checkbox - selected values contains 'one'"
  );
  assert.ok(
    selected.indexOf('two') > -1,
    "after clicking third checkbox - selected values contains 'two'"
  );
  assert.notOk(
    selected.indexOf('three') > -1,
    "after clicking third checkbox - selected values does not contain 'three'"
  );
  assert.ok(
    checkboxInputs[0].checked,
    'after clicking third checkbox - first checkbox input is checked'
  );
  assert.ok(
    checkboxInputs[1].checked,
    'after clicking third checkbox - second checkbox input is checked'
  );
  assert.notOk(
    checkboxInputs[2].checked,
    'after clicking third checkbox - third checkbox input is not checked'
  );
});

test('it handles choice helpText correctly when allowMultiple is false', function(assert) {
  this.render(hbs`
    {{polaris-choice-list
      allowMultiple=false
      choices=(array
        (hash
          label="First option"
          value="one"
          helpText="This is the first option"
        )
        (hash
          label="Second option"
          value="two"
          helpText="This is the second option"
        )
        (hash
          label="Third option"
          value="three"
          helpText="This is the third option"
        )
      )
    }}
  `);

  const choices = findAll(choiceWithDescriptionSelector);
  assert.equal(choices.length, 3, 'renders three choices with descriptions');

  const helpTexts = findAll(helpTextSelector);
  assert.equal(helpTexts.length, 3, 'renders three help text descriptions');
  assert.dom(helpTexts[0]).hasText('This is the first option', 'first choice - renders the correct help text');
  assert.dom(helpTexts[1]).hasText(
    'This is the second option',
    'second choice - renders the correct help text'
  );
  assert.dom(helpTexts[2]).hasText('This is the third option', 'third choice - renders the correct help text');
});

test('it handles choice helpText correctly when allowMultiple is true', function(assert) {
  this.render(hbs`
    {{polaris-choice-list
      allowMultiple=true
      choices=(array
        (hash
          label="First option"
          value="one"
          helpText="This is the first option"
        )
        (hash
          label="Second option"
          value="two"
          helpText="This is the second option"
        )
        (hash
          label="Third option"
          value="three"
          helpText="This is the third option"
        )
      )
    }}
  `);

  const choices = findAll(choiceWithDescriptionSelector);
  assert.equal(choices.length, 3, 'renders three choices with descriptions');

  const helpTexts = findAll(helpTextSelector);
  assert.equal(helpTexts.length, 3, 'renders three help text descriptions');
  assert.dom(helpTexts[0]).hasText('This is the first option', 'first choice - renders the correct help text');
  assert.dom(helpTexts[1]).hasText(
    'This is the second option',
    'second choice - renders the correct help text'
  );
  assert.dom(helpTexts[2]).hasText('This is the third option', 'third choice - renders the correct help text');
});

test('it handles choice disabled correctly when allowMultiple is false', function(assert) {
  this.render(hbs`
    {{polaris-choice-list
      allowMultiple=false
      choices=(array
        (hash
          label="First (disabled) option"
          value="one"
          disabled=true
        )
        (hash
          label="Second (enabled) option"
          value="two"
          disabled=false
        )
      )
    }}
  `);

  const choiceControls = findAll(radioInputSelector);
  assert.equal(choiceControls.length, 2, 'renders two choices');
  assert.ok(choiceControls[0].disabled, 'first choice is disabled');
  assert.notOk(choiceControls[1].disabled, 'second choice is enabled');
});

test('it handles choice disabled correctly when allowMultiple is true', function(assert) {
  this.render(hbs`
    {{polaris-choice-list
      allowMultiple=true
      choices=(array
        (hash
          label="First (disabled) option"
          value="one"
          disabled=true
        )
        (hash
          label="Second (enabled) option"
          value="two"
          disabled=false
        )
      )
    }}
  `);

  const choiceControls = findAll(checkboxInputSelector);
  assert.equal(choiceControls.length, 2, 'renders two choices');
  assert.ok(choiceControls[0].disabled, 'first choice is disabled');
  assert.notOk(choiceControls[1].disabled, 'second choice is enabled');
});

test('it renders an error when `error` is present', function(assert) {
  this.render(hbs`
    {{polaris-choice-list
      error="oh noes!"
      choices=(array
        (hash
          label="option"
          value="one"
        )
      )
    }}
  `);

  assert.dom(choiceErrorSelector).exists();
});
