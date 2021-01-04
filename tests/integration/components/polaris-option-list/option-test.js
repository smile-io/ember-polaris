import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerEvent } from '@ember/test-helpers';

const defaultProps = {
  id: 'itemId',
  label: 'Option Item',
  value: 'option_item',
  section: 0,
  index: 0,
};

module(
  'Integration | Component | polaris-option-list/option',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
      this.set('defaultProps', defaultProps);
    });

    test('renders a checkbox if allowMultiple is true', async function (assert) {
      await render(hbs`
      {{polaris-option-list/option
        optionId=defaultProps.id
        label=defaultProps.label
        value=defaultProps.value
        section=defaultProps.section
        index=defaultProps.index
        allowMultiple=true
      }}
    `);
      assert.dom('input[type="checkbox"]').exists();
    });

    test('renders a button if allowMultiple is false or undefined', async function (assert) {
      await render(hbs`
      {{polaris-option-list/option
        optionId=defaultProps.id
        label=defaultProps.label
        value=defaultProps.value
        section=defaultProps.section
        index=defaultProps.index
      }}
    `);
      assert.dom('button').exists();
    });

    test('calls onClick with section and index if option is not disabled', async function (assert) {
      assert.expect(2);

      this.set('onOptionClicked', (optionSection, optionIndex) => {
        const { section, index } = defaultProps;
        assert.equal(optionSection, section);
        assert.equal(optionIndex, index);
      });

      await render(hbs`
      {{polaris-option-list/option
        optionId=defaultProps.id
        label=defaultProps.label
        value=defaultProps.value
        section=defaultProps.section
        index=defaultProps.index
        onClick=(action onOptionClicked)
      }}
    `);

      await click('button');
    });

    test('supports option being disabled', async function (assert) {
      await render(hbs`
      {{polaris-option-list/option
        optionId=defaultProps.id
        label=defaultProps.label
        value=defaultProps.value
        section=defaultProps.section
        index=defaultProps.index
        onClick=(action (mut wasOnClickCalled) true)
        disabled=true
      }}
    `);

      assert.dom('button').isDisabled();
    });

    test('calls onClick with section and index if option is not disabled and multiple options are allowed', async function (assert) {
      assert.expect(2);

      this.set('onOptionClicked', (optionSection, optionIndex) => {
        const { section, index } = defaultProps;
        assert.equal(optionSection, section);
        assert.equal(optionIndex, index);
      });

      await render(hbs`
      {{polaris-option-list/option
        optionId=defaultProps.id
        label=defaultProps.label
        value=defaultProps.value
        section=defaultProps.section
        index=defaultProps.index
        onClick=(action onOptionClicked)
        allowMultiple=true
      }}
    `);

      await triggerEvent('input', 'change');
    });

    test('sets the pass through props for Checkbox if multiple items are allowed', async function (assert) {
      await render(hbs`
      {{polaris-option-list/option
        optionId=defaultProps.id
        label=defaultProps.label
        value=defaultProps.value
        section=defaultProps.section
        index=defaultProps.index
        allowMultiple=true
      }}
    `);

      assert.dom('input[type="checkbox"]').hasAttribute('id', defaultProps.id);
      assert
        .dom('input[type="checkbox"]')
        .hasAttribute('value', defaultProps.value);
    });
  }
);
