import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const label = 'Test-Label';
const accessibilityLabel = 'Accessibility-Label';
const componentSelector = '.Polaris-ResourceList-CheckableButton';
const checkboxInputSelector = 'input.Polaris-Checkbox__Input[type="checkbox"]';
const checkboxAccessibilityLabelSelector =
  '.Polaris-ResourceList-CheckableButton__Checkbox .Polaris-Choice--labelHidden .Polaris-Choice__Label';
const labelSelector = '.Polaris-ResourceList-CheckableButton__Label';

module(
  'Integration | Component | polaris-resource-list/checkable-button',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it correctly handles its attributes', async function (assert) {
      this.setProperties({
        label,
        accessibilityLabel,
        selected: true,
        selectMode: false,
        disabled: false,
      });

      await render(hbs`
      {{polaris-resource-list/checkable-button
        label=label
        accessibilityLabel=accessibilityLabel
        selected=selected
        selectMode=selectMode
        disabled=disabled
      }}
    `);

      assert
        .dom(checkboxInputSelector)
        .isChecked('selected attribute is passed down correctly');
      assert
        .dom(labelSelector)
        .hasText(label, 'label attribute renders label correctly');
      assert
        .dom(checkboxAccessibilityLabelSelector)
        .hasText(
          accessibilityLabel,
          'accessibilityLabel attribute renders as label on checkbox'
        );
      assert
        .dom(checkboxInputSelector)
        .hasNoAttribute(
          'disabled',
          'disabled attribute is passed down correctly'
        );
    });

    test('onToggleAll action works', async function (assert) {
      assert.expect(2);

      this.handleWrapperClick = () =>
        assert.notOk(true, "click event doesn't bubble");
      this.handleToggle = (event) => {
        assert.ok(true, 'triggers @onToggleAll handler');
        assert.notOk(
          event,
          'does not curry click event to the @onToggleAll handler'
        );
      };

      await render(hbs`
        {{!-- template-lint-disable no-invalid-interactive--}}
        <div {{on "click" this.handleWrapperClick}}>
          {{polaris-resource-list/checkable-button onToggleAll=this.handleToggle}}
        </div>
      `);

      await click(componentSelector);
    });
  }
);
