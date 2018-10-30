import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris-select', function(hooks) {
  setupRenderingTest(hooks);

  module('onChange()', function() {
    test('is called with the value of the newly-selected option', async function(assert) {
      this.setProperties({
        selectedValue: null,
        selectId: null,
        onOptionSelected: function(selectedValue, selectId) {
          this.setProperties({ selectedValue, selectId });
        },
      });

      await render(hbs`
        {{polaris-select
          id="MySelect"
          label="Select"
          options=(array "one" "two")
          onChange=(action onOptionSelected)
        }}
      `);

      find('select').value = 'two';
      await triggerEvent('select', 'change');
      assert.equal(this.get('selectedValue'), 'two');
      assert.equal(this.get('selectId'), 'MySelect');
    });
  });

  module('onFocus()', function() {
    test('is called when the select is focused', async function(assert) {
      this.set('receivedFocus', false);
      await render(hbs`
        {{polaris-select
          label="Select"
          options=(array)
          onFocus=(action (mut receivedFocus) true)
        }}
      `);

      await triggerEvent('select', 'focus');
      assert.ok(this.get('receivedFocus'));
    });
  });

  module('onBlur()', function() {
    test('is called when the select is blurred', async function(assert) {
      this.set('receivedBlur', false);
      await render(hbs`
        {{polaris-select
          label="Select"
          options=(array)
          onBlur=(action (mut receivedBlur) true)
        }}
      `);

      await triggerEvent('select', 'focus');
      await triggerEvent('select', 'blur');
      assert.ok(this.get('receivedBlur'));
    });
  });

  module('options', function() {
    test('translates an array of strings into options', async function(assert) {
      let options = ['one', 'two'];
      this.set('options', options);
      await render(hbs`{{polaris-select label="Select" options=options}}`);

      let optionElements = findAll('option');
      options.forEach((option, index) => {
        let optionElement = optionElements[index];
        assert.dom(optionElement).hasAttribute('value', option);
        assert.dom(optionElement).hasText(option);
      });
    });

    test('translates an array of option descriptions into options', async function(assert) {
      let options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ];
      this.set('options', options);

      await render(hbs`{{polaris-select label="Select" options=options}}`);

      let optionElements = findAll('option');
      options.forEach(({ value, label }, index) => {
        let optionElement = optionElements[index];
        assert.dom(optionElement).hasAttribute('value', value);
        assert.dom(optionElement).hasText(label);
      });
    });

    test('sets disabled options as indicated in the option descriptor', async function(assert) {
      let options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two', disabled: true },
        { value: 'three', label: 'Three', disabled: false },
      ];
      this.set('options', options);

      await render(hbs`{{polaris-select label="Select" options=options}}`);

      let optionElements = findAll('option');
      options.forEach(({ disabled }, index) => {
        let optionElement = optionElements[index];
        if (disabled) {
          assert.dom(optionElement).isDisabled();
        } else {
          assert.dom(optionElement).isNotDisabled();
        }
      });
    });
  });

  module('groups', function() {
    let optionsAndGroups = [
      { title: 'Group one', options: ['one.1', 'one.2'] },
      'one',
      'two',
      { title: 'Group two', options: ['two.1', 'two.2'] },
    ];

    function testOptions(optionOrGroup, optionOrOptgroupElement, assert) {
      if (typeof optionOrGroup === 'string') {
        assert.equal(optionOrOptgroupElement.tagName.toLowerCase(), 'option');
        assert
          .dom(optionOrOptgroupElement)
          .hasAttribute('value', optionOrGroup);
        assert.dom(optionOrOptgroupElement).hasText(optionOrGroup);
      } else {
        assert.equal(optionOrOptgroupElement.tagName.toLowerCase(), 'optgroup');
        assert
          .dom(optionOrOptgroupElement)
          .hasAttribute('label', optionOrGroup.title);
        let options = optionOrOptgroupElement.children;

        optionOrGroup.options.forEach((option, optionIndex) => {
          let optionElement = options[optionIndex];
          assert.equal(optionElement.tagName.toLowerCase(), 'option');
          assert.dom(optionElement).hasAttribute('value', option);
          assert.dom(optionElement).hasText(option);
        });
      }
    }

    test('translates grouped options into optgroup tags', async function(assert) {
      this.set('optionsAndGroups', optionsAndGroups);
      await render(
        hbs`{{polaris-select label="Select" options=optionsAndGroups}}`
      );

      let optionOrOptgroupElements = find('select').children;
      optionsAndGroups.forEach((optionOrGroup, index) => {
        let optionOrOptgroupElement = optionOrOptgroupElements[index];
        testOptions(optionOrGroup, optionOrOptgroupElement, assert);
      });
    });
  });

  module('value', function() {
    test('uses the passed value for the select', async function(assert) {
      await render(hbs`
        {{polaris-select
          label="Select"
          value="Some value"
          options=(array "Some other value" "Some value")
          onChange=(action (mut dummy))
        }}
      `);

      assert.dom('select').hasValue('Some value');
    });
  });

  module('id', function() {
    test('sets the id on the input', async function(assert) {
      await render(
        hbs`{{polaris-select label="Select" id="MySelect" options=(array)}}`
      );

      assert.dom('select').hasAttribute('id', 'MySelect');
    });

    test('sets a random id on the input when none is passed', async function(assert) {
      await render(hbs`{{polaris-select label="Select" options=(array)}}`);

      assert.dom('select').hasAttribute('id');
    });
  });

  module('disabled', function() {
    test('sets the disabled attribute on the select', async function(assert) {
      await render(
        hbs`{{polaris-select label="Select" disabled=true options=(array)}}`
      );

      assert.dom('select').hasAttribute('disabled');
    });

    test('is only disabled when disabled is explicitly set to true', async function(assert) {
      await render(
        hbs`{{polaris-select label="Select" disabled=false options=(array)}}`
      );

      assert.dom('select').doesNotHaveAttribute('disabled');
    });
  });

  module('helpText', function() {
    test('connects the select to the help text', async function(assert) {
      await render(
        hbs`{{polaris-select label="Select" options=(array) helpText="Some help"}}`
      );

      let helpTextID = find('select').getAttribute('aria-describedby');
      assert.dom(`#${helpTextID}`).hasText('Some help');
    });
  });

  module('placeholder', function() {
    test('renders the placeholder as the initially selected option', async function(assert) {
      let placeholderValue = '';
      await render(hbs`
        {{polaris-select
          label="Select"
          placeholder="Choose something"
          options=(array)
        }}
      `);

      assert.dom('select option').hasValue(placeholderValue);
      assert.dom('select option').hasAttribute('disabled');
    });

    test('sets the placeholder value as the select value when there is an onChange handler', async function(assert) {
      await render(hbs`
        {{polaris-select
          label="Select"
          placeholder="Choose something"
          options=(array)
          onChange=(action (mut dummy))
        }}
      `);

      let placeholderOption = find('select option');
      assert.dom('select').hasValue(placeholderOption.value);
    });
  });

  module('error', function() {
    test('marks the select as invalid', async function(assert) {
      this.set('error', {
        componentName: 'polaris-text-style',
        props: { text: 'Invalid' },
      });
      await render(hbs`
        {{polaris-select
          label="Select"
          error=error
          onChange=(action (mut dummy))
        }}
      `);

      assert.dom('select').hasAttribute('aria-invalid', 'true');

      this.set('error', 'Some error');
      assert.dom('select').hasAttribute('aria-invalid', 'true');

      this.set('error', true);
      assert.dom('select').hasAttribute('aria-invalid', 'true');
    });

    test('connects the select to the error', async function(assert) {
      await render(hbs`
        {{polaris-select
          label="Select"
          error="Some error"
          onChange=(action (mut dummy))
        }}
      `);

      let errorID = find('select').getAttribute('aria-describedby');
      assert.dom(`#${errorID}`).hasText('Some error');
    });

    test('connects the select to an error rendered separately', async function(assert) {
      let errorMessage = 'Some error';
      let selectID = 'collectionRuleType';
      this.setProperties({ errorMessage, selectID });

      await render(hbs`
        {{polaris-select
          error=(if errorMessage true false)
          id=selectID
          label="Select"
          onChange=(action (mut dummy))
        }}
        {{polaris-inline-error message=errorMessage fieldID=selectID}}
      `);

      let errorID = find('select').getAttribute('aria-describedby');
      assert.dom('select').hasAttribute('aria-invalid', 'true');
      assert.dom(`#${errorID}`).hasText('Some error');
    });

    test('connects the select to both an error and help text', async function(assert) {
      await render(hbs`
        {{polaris-select
          label="Select"
          error="Some error"
          helpText="Some help"
          onChange=(action (mut dummy))
        }}
      `);

      let descriptions = find('select')
        .getAttribute('aria-describedby')
        .split(' ');
      assert.equal(descriptions.length, 2);
      assert.dom(`#${descriptions[0]}`).hasText('Some help');
      assert.dom(`#${descriptions[1]}`).hasText('Some error');
    });

    test('renders error markup when a non-boolean value', async function(assert) {
      await render(hbs`
        {{polaris-select
          label="Select"
          helpText="Some help"
          error="Some error"
          onChange=(action (mut dummy))
        }}
      `);

      assert.dom('.Polaris-InlineError').exists();
    });

    test('does not render error markup when a boolean value', async function(assert) {
      await render(hbs`
        {{polaris-select
          error=true
          label="Select"
          helpText="Some help"
          onChange=(action (mut dummy))
        }}
      `);

      assert.dom('.Polaris-InlineError').doesNotExist();
    });
  });
});
