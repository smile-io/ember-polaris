import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const choiceListSelector = '[data-test-choice-list]';
const choicesWrapperSelector = '[data-test-choice-list-choices]';
const choiceSelector = '[data-test-choice]';
const radioInputSelector = '[data-test-radio-button-input]';
const checkboxInputSelector = '[data-test-checkbox-input]';
const titleSelector = '[data-test-choice-list-title]';
const choiceWithDescriptionWrapperSelector = buildNestedSelector(
  choicesWrapperSelector,
  '[data-test-choice-list-item]',
  'div'
);
const choiceWithDescriptionSelector = buildNestedSelector(
  choiceWithDescriptionWrapperSelector,
  choiceSelector
);
const helpTextSelector = '[data-test-choice-help-text]';
const choiceErrorSelector = '[data-test-choice-list-error]';

module('Integration | Component | polaris-choice-list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(/* assert */) {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  test('it renders the correct HTML when allowMultiple is false', async function(assert) {
    await render(hbs`
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

    assert.dom(choiceSelector).exists({ count: 3 }, 'renders three choices');

    const choices = findAll(choiceSelector);
    const radioInputs = findAll(radioInputSelector);

    // Check the choices.
    let choice = choices[0];
    assert
      .dom(choice)
      .hasText('First option', 'first choice - has correct label text');
    let radioInput = radioInputs[0];

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
    assert.notOk(
      radioInput.checked,
      'first choice - radio input is not checked'
    );

    choice = choices[1];
    assert
      .dom(choice)
      .hasText('Second option', 'second choice - has correct label text');
    radioInput = radioInputs[1];
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
    assert
      .dom(choice)
      .hasText('Third option', 'third choice - has correct label text');
    radioInput = radioInputs[2];
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
    assert.notOk(
      radioInput.checked,
      'third choice - radio input is not checked'
    );
  });

  test('it renders the correct HTML when allowMultiple is true', async function(assert) {
    await render(hbs`
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

    assert.dom(choiceSelector).exists({ count: 3 }, 'renders three choices');

    const choices = findAll(choiceSelector);
    const checkboxInputs = findAll(checkboxInputSelector);

    // Check the choices.
    let choice = choices[0];
    assert
      .dom(choice)
      .hasText('First option', 'first choice - has correct label text');
    let checkboxInput = checkboxInputs[0];
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
    assert
      .dom(choice)
      .hasText('Second option', 'second choice - has correct label text');
    checkboxInput = checkboxInputs[1];
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
    assert.ok(
      checkboxInput.checked,
      'second choice - checkbox input is checked'
    );

    choice = choices[2];
    assert
      .dom(choice)
      .hasText('Third option', 'third choice - has correct label text');
    checkboxInput = checkboxInputs[2];
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
    assert.ok(
      checkboxInput.checked,
      'third choice - checkbox input is checked'
    );
  });

  test('it handles title and titleHidden attributes correctly', async function(assert) {
    this.setProperties({
      title: 'Original title',
      titleHidden: false,
    });
    await render(
      hbs`{{polaris-choice-list title=title titleHidden=titleHidden}}`
    );

    const choiceLists = findAll(choiceListSelector);
    assert.equal(
      choiceLists.length,
      1,
      'with title set and unhidden - renders one choice list'
    );
    const choiceList = choiceLists[0];
    assert
      .dom(choiceList)
      .hasNoClass(
        'Polaris-ChoiceList--titleHidden',
        'with title set and unhidden - does not apply titleHidden class to choice list'
      );

    let titles = findAll(titleSelector);
    assert.equal(
      titles.length,
      1,
      'with title set and unhidden - renders one title'
    );
    assert
      .dom(titles[0])
      .hasText(
        'Original title',
        'with title set and unhidden - renders the correct title text'
      );

    this.set('titleHidden', true);
    assert
      .dom(choiceList)
      .hasClass(
        'Polaris-ChoiceList--titleHidden',
        'with title set and hidden - applies titleHidden class to choice list'
      );

    this.set('title', null);
    titles = findAll(titleSelector);
    assert.equal(
      titles.length,
      0,
      'with title unset - does not render a title'
    );
  });

  test('it handles choice selection correctly when allowMultiple is false', async function(assert) {
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
    await render(hbs`
      {{polaris-choice-list
        allowMultiple=false
        choices=choices
        selected=selected
        onChange=(action (mut selected))
      }}
    `);

    assert
      .dom(radioInputSelector)
      .exists({ count: 3 }, 'renders three radio inputs');

    assert.notOk(
      findAll(radioInputSelector)[0].checked,
      'before click - first radio input is not checked'
    );
    assert.ok(
      findAll(radioInputSelector)[1].checked,
      'before click - second radio input is checked'
    );
    assert.notOk(
      findAll(radioInputSelector)[2].checked,
      'before click - third radio input is not checked'
    );

    // Click the first choice.
    await click(`${radioInputSelector}[value="one"]`);

    assert.deepEqual(
      this.get('selected'),
      ['one'],
      'after click - selected value updated correctly'
    );
    assert.ok(
      findAll(radioInputSelector)[0].checked,
      'after clicking first radio button - first radio input is checked'
    );
    assert.notOk(
      findAll(radioInputSelector)[1].checked,
      'after clicking first radio button - second radio input is not checked'
    );
    assert.notOk(
      findAll(radioInputSelector)[2].checked,
      'after clicking first radio button - third radio input is not checked'
    );
  });

  test('it handles choice selection correctly when allowMultiple is true', async function(assert) {
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
    await render(hbs`
      {{polaris-choice-list
        allowMultiple=true
        choices=choices
        selected=selected
        onChange=(action (mut selected))
      }}
    `);

    assert
      .dom(checkboxInputSelector)
      .exists({ count: 3 }, 'renders three checkboxes');

    assert.ok(
      findAll(checkboxInputSelector)[0].checked,
      'before click - first checkbox input is checked'
    );
    assert.notOk(
      findAll(checkboxInputSelector)[1].checked,
      'before click - second checkbox input is not checked'
    );
    assert.ok(
      findAll(checkboxInputSelector)[2].checked,
      'before click - third checkbox input is checked'
    );

    // Click the second choice to select it.
    await click(`${checkboxInputSelector}[value="two"]`);

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
      findAll(checkboxInputSelector)[0].checked,
      'after clicking second checkbox - first checkbox input is checked'
    );
    assert.ok(
      findAll(checkboxInputSelector)[1].checked,
      'after clicking second checkbox - second checkbox input is checked'
    );
    assert.ok(
      findAll(checkboxInputSelector)[2].checked,
      'after clicking second checkbox - third checkbox input is checked'
    );

    // Click the third choice to deselect it.
    await click(`${checkboxInputSelector}[value="three"]`);

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
      findAll(checkboxInputSelector)[0].checked,
      'after clicking third checkbox - first checkbox input is checked'
    );
    assert.ok(
      findAll(checkboxInputSelector)[1].checked,
      'after clicking third checkbox - second checkbox input is checked'
    );
    assert.notOk(
      findAll(checkboxInputSelector)[2].checked,
      'after clicking third checkbox - third checkbox input is not checked'
    );
  });

  test('it handles choice helpText correctly when allowMultiple is false', async function(assert) {
    await render(hbs`
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

    assert
      .dom(choiceWithDescriptionSelector)
      .exists({ count: 3 }, 'renders three choices with descriptions');
    assert
      .dom(helpTextSelector)
      .exists({ count: 3 }, 'renders three help text descriptions');

    const helpTexts = findAll(helpTextSelector);

    assert
      .dom(helpTexts[0])
      .hasText(
        'This is the first option',
        'first choice - renders the correct help text'
      );
    assert
      .dom(helpTexts[1])
      .hasText(
        'This is the second option',
        'second choice - renders the correct help text'
      );
    assert
      .dom(helpTexts[2])
      .hasText(
        'This is the third option',
        'third choice - renders the correct help text'
      );
  });

  test('it handles choice helpText correctly when allowMultiple is true', async function(assert) {
    await render(hbs`
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

    assert
      .dom(choiceWithDescriptionSelector)
      .exists({ count: 3 }, 'renders three choices with descriptions');
    assert
      .dom(helpTextSelector)
      .exists({ count: 3 }, 'renders three help text descriptions');

    const helpTexts = findAll(helpTextSelector);

    assert
      .dom(helpTexts[0])
      .hasText(
        'This is the first option',
        'first choice - renders the correct help text'
      );
    assert
      .dom(helpTexts[1])
      .hasText(
        'This is the second option',
        'second choice - renders the correct help text'
      );
    assert
      .dom(helpTexts[2])
      .hasText(
        'This is the third option',
        'third choice - renders the correct help text'
      );
  });

  test('it handles choice disabled correctly when allowMultiple is false', async function(assert) {
    await render(hbs`
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

    assert.dom(radioInputSelector).exists({ count: 2 }, 'renders two choices');

    const choiceControls = findAll(radioInputSelector);

    assert.ok(choiceControls[0].disabled, 'first choice is disabled');
    assert.notOk(choiceControls[1].disabled, 'second choice is enabled');
  });

  test('it handles choice disabled correctly when allowMultiple is true', async function(assert) {
    await render(hbs`
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

    assert
      .dom(checkboxInputSelector)
      .exists({ count: 2 }, 'renders two choices');

    const choiceControls = findAll(checkboxInputSelector);

    assert.ok(choiceControls[0].disabled, 'first choice is disabled');
    assert.notOk(choiceControls[1].disabled, 'second choice is enabled');
  });

  test('it renders an error when `error` is present', async function(assert) {
    await render(hbs`
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

  test('it updates the list of selected choices when a new `selected` array is passed in', async function(assert) {
    this.set('selected', ['one']);
    await render(hbs`
      {{polaris-choice-list
        choices=(array
          (hash
            label="option"
            value="one"
          )
          (hash
            label="option"
            value="two"
          )
        )
        selected=selected
      }}
    `);

    this.set('selected', ['two']);

    assert.dom('.Polaris-RadioButton__Input:checked').hasValue('two');
  });
});
