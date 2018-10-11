import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent(
  'polaris-setting-toggle',
  'Integration | Component | polaris setting toggle',
  {
    integration: true,
  }
);

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

test('it renders the correct HTML in inline usage with default attributes', function(assert) {
  this.render(hbs`{{polaris-setting-toggle text="Inline setting toggle"}}`);

  const settingActions = findAll(settingActionSelector);
  assert.equal(settingActions.length, 1, 'renders one setting action');

  const settingActionSettings = findAll(settingActionSettingSelector);
  assert.equal(
    settingActionSettings.length,
    1,
    'renders one setting action setting'
  );
  assert.equal(
    settingActionSettings[0].textContent.trim(),
    'Inline setting toggle',
    'renders the correct setting action setting text'
  );

  const settingActionWrappers = findAll(settingActionWrapperSelector);
  assert.equal(
    settingActionWrappers.length,
    1,
    'renders one setting action wrapper'
  );

  const settingActionButtons = findAll(settingActionButtonSelector);
  assert.equal(
    settingActionButtons.length,
    0,
    'does not render any setting action buttons'
  );
});

test('it renders the correct HTML in block usage with action supplied', function(assert) {
  this.render(hbs`
    {{#polaris-setting-toggle
      action=(hash
        text="Take action!"
      )
    }}
      Block setting toggle
    {{/polaris-setting-toggle}}
  `);

  const settingActions = findAll(settingActionSelector);
  assert.equal(settingActions.length, 1, 'renders one setting action');

  const settingActionSettings = findAll(settingActionSettingSelector);
  assert.equal(
    settingActionSettings.length,
    1,
    'renders one setting action setting'
  );
  assert.equal(
    settingActionSettings[0].textContent.trim(),
    'Block setting toggle',
    'renders the correct setting action setting content'
  );

  const settingActionWrappers = findAll(settingActionWrapperSelector);
  assert.equal(
    settingActionWrappers.length,
    1,
    'renders one setting action wrapper'
  );

  const settingActionButtons = findAll(settingActionButtonSelector);
  assert.equal(
    settingActionButtons.length,
    1,
    'renders one setting action button'
  );

  const settingActionButton = settingActionButtons[0];
  assert.equal(
    settingActionButton.textContent.trim(),
    'Take action!',
    'renders the correct setting action button content'
  );
  assert.notOk(
    settingActionButton.classList.contains('Polaris-Button--primary'),
    'renders plain setting action button'
  );
});

test('it handles the enabled attribute correctly', function(assert) {
  this.set('enabled', true);
  this.render(hbs`
    {{polaris-setting-toggle
      enabled=enabled
      action=(hash
        text="Flip the switch"
      )
    }}
  `);

  const settingActionButton = find(settingActionButtonSelector);
  assert.ok(settingActionButton, 'renders the setting action button');
  assert.equal(
    settingActionButton.textContent.trim(),
    'Flip the switch',
    'renders the correct setting action button content'
  );

  assert.ok(
    settingActionButton.classList.contains('Polaris-Button--primary'),
    'with enabled true - renders primary setting action button'
  );

  this.set('enabled', false);
  assert.notOk(
    settingActionButton.classList.contains('Polaris-Button--primary'),
    'with enabled false - renders plain setting action button'
  );
});

test('it handles the supplied action correctly', function(assert) {
  this.set('actionFired', false);
  this.render(hbs`
    {{polaris-setting-toggle
      enabled=enabled
      action=(hash
        text="Flip the switch"
        onAction=(action (mut actionFired) true)
      )
    }}
  `);

  click(settingActionButtonSelector);
  assert.ok(this.get('actionFired'), 'fires the action when button clicked');
});

test("it obeys the passed-in action hash's loading and disabled flags", function(assert) {
  this.setProperties({
    isLoading: true,
    isDisabled: false,
  });

  this.render(hbs`
    {{polaris-setting-toggle
      action=(hash
        text="Toggle"
        loading=isLoading
        disabled=isDisabled
        onAction=(action (mut dummy))
      )
    }}
  `);

  let button = find(settingActionButtonSelector);
  assert.ok(
    button.classList.contains('Polaris-Button--loading'),
    'button is in loading state when loading is true'
  );

  this.setProperties({
    isLoading: false,
    isDisabled: true,
  });

  assert.ok(
    button.classList.contains('Polaris-Button--disabled'),
    'button is in disabled state when disabled is true'
  );
  assert.notOk(
    button.classList.contains('Polaris-Button--loading'),
    'button is not in loading state when loading is false'
  );
});
