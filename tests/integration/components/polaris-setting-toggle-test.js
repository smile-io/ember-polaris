import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris setting toggle', function(hooks) {
  setupRenderingTest(hooks);

  const settingActionSelector = buildNestedSelector(
    'div.Polaris-Card',
    'div.Polaris-Card__Section',
    'div.Polaris-SettingAction'
  );
  const settingActionSettingSelector = buildNestedSelector(
    settingActionSelector,
    'div.Polaris-SettingAction__Setting'
  );
  const settingActionWrapperSelector = buildNestedSelector(
    settingActionSelector,
    'div.Polaris-SettingAction__Action'
  );
  const settingActionButtonSelector = buildNestedSelector(
    settingActionWrapperSelector,
    'button.Polaris-Button'
  );

  test('it renders the correct HTML in inline usage with default attributes', async function(assert) {
    await render(hbs`{{polaris-setting-toggle text="Inline setting toggle"}}`);

    assert
      .dom(settingActionSelector)
      .exists({ count: 1 }, 'renders one setting action');

    const settingActionSettings = assert.dom(settingActionSettingSelector);
    settingActionSettings.exists(
      { count: 1 },
      'renders one setting action setting'
    );
    settingActionSettings.hasText(
      'Inline setting toggle',
      'renders the correct setting action setting text'
    );

    assert
      .dom(settingActionWrapperSelector)
      .exists({ count: 1 }, 'renders one setting action wrapper');

    assert
      .dom(settingActionButtonSelector)
      .doesNotExist('does not render any setting action buttons');
  });

  test('it renders the correct HTML in block usage with action supplied', async function(assert) {
    await render(hbs`
      {{#polaris-setting-toggle
        action=(hash
          text="Take action!"
        )
      }}
        Block setting toggle
      {{/polaris-setting-toggle}}
    `);

    assert
      .dom(settingActionSelector)
      .exists({ count: 1 }, 'renders one setting action');

    const settingActionSettings = assert.dom(settingActionSettingSelector);
    settingActionSettings.exists(
      { count: 1 },
      'renders one setting action setting'
    );
    settingActionSettings.hasText(
      'Block setting toggle',
      'renders the correct setting action setting content'
    );

    assert
      .dom(settingActionWrapperSelector)
      .exists({ count: 1 }, 'renders one setting action wrapper');

    const settingActionButtons = assert.dom(settingActionButtonSelector);

    settingActionButtons.exists(
      { count: 1 },
      'renders one setting action button'
    );

    settingActionButtons.hasText(
      'Take action!',
      'renders the correct setting action button content'
    );
    settingActionButtons.hasNoClass(
      'Polaris-Button--primary',
      'renders plain setting action button'
    );
  });

  test('it handles the enabled attribute correctly', async function(assert) {
    this.set('enabled', true);
    await render(hbs`
      {{polaris-setting-toggle
        enabled=enabled
        action=(hash
          text="Flip the switch"
        )
      }}
    `);

    const settingActionButton = assert.dom(settingActionButtonSelector);
    settingActionButton.exists('renders the setting action button');
    settingActionButton.hasText(
      'Flip the switch',
      'renders the correct setting action button content'
    );

    settingActionButton.hasClass(
      'Polaris-Button--primary',
      'with enabled true - renders primary setting action button'
    );

    this.set('enabled', false);
    settingActionButton.hasNoClass(
      'Polaris-Button--primary',
      'with enabled false - renders plain setting action button'
    );
  });

  test('it handles the supplied action correctly', async function(assert) {
    this.set('actionFired', false);
    await render(hbs`
      {{polaris-setting-toggle
        enabled=enabled
        action=(hash
          text="Flip the switch"
          onAction=(action (mut actionFired) true)
        )
      }}
    `);

    await click(settingActionButtonSelector);
    assert.ok(this.get('actionFired'), 'fires the action when button clicked');
  });

  test("it obeys the passed-in action hash's loading and disabled flags", async function(assert) {
    this.setProperties({
      isLoading: true,
      isDisabled: false,
    });

    await render(hbs`
      {{polaris-setting-toggle
        action=(hash
          text="Toggle"
          loading=isLoading
          disabled=isDisabled
          onAction=(action (mut dummy))
        )
      }}
    `);

    let button = assert.dom(settingActionButtonSelector);
    button.hasClass(
      'Polaris-Button--loading',
      'button is in loading state when loading is true'
    );

    this.setProperties({
      isLoading: false,
      isDisabled: true,
    });

    button.hasClass(
      'Polaris-Button--disabled',
      'button is in disabled state when disabled is true'
    );
    button.hasNoClass(
      'Polaris-Button--loading',
      'button is not in loading state when loading is false'
    );
  });
});
