import { module, test } from 'qunit';
import { click, find, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

module('Integration | Component | polaris page actions', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  const pageActionsSelector = 'div.Polaris-PageActions';
  const pageActionsStackSelector = buildNestedSelector(
    pageActionsSelector,
    'div.Polaris-Stack'
  );
  const pageActionsStackItemSelector = buildNestedSelector(
    pageActionsStackSelector,
    'div.Polaris-Stack__Item'
  );
  const secondaryButtonSelector = buildNestedSelector(
    pageActionsStackItemSelector,
    'div.Polaris-ButtonGroup',
    'div.Polaris-ButtonGroup__Item',
    'button.Polaris-Button'
  );
  const iconSelector = buildNestedSelector('span.Polaris-Icon', 'svg');

  test('it renders the correct HTML when primary and secondary actions are supplied', async function(assert) {
    await render(hbs`
      {{polaris-page-actions
        primaryAction=(hash
          text="Primary button here"
        )
        secondaryActions=(array
          (hash
            text="This is a secondary button"
          )
          (hash
            text="This is another secondary button"
          )
        )
      }}
    `);

    const pageActions = findAll(pageActionsSelector);
    assert.equal(pageActions.length, 1, 'renders one page actions component');

    const pageActionsStacks = findAll(pageActionsStackSelector);
    assert.equal(pageActionsStacks.length, 1, 'renders one stack component');
    const pageActionsStack = pageActionsStacks[0];
    assert
      .dom(pageActionsStack)
      .hasClass('Polaris-Stack--spacingTight', 'stack has tight spacing');
    assert
      .dom(pageActionsStack)
      .hasClass(
        'Polaris-Stack--distributionEqualSpacing',
        'stack has equal distribution'
      );

    const pageActionsStackItems = findAll(pageActionsStackItemSelector);
    assert.equal(pageActionsStackItems.length, 2, 'renders two stack items');

    const primaryButtonSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'button.Polaris-Button.Polaris-Button--primary'
    );
    const primaryButtons = findAll(primaryButtonSelector);
    assert.equal(primaryButtons.length, 1, 'renders one primary button');
    assert
      .dom(primaryButtons[0])
      .hasText(
        'Primary button here',
        'primary button - renders the correct content'
      );

    const secondaryButtons = findAll(secondaryButtonSelector);
    assert.equal(secondaryButtons.length, 2, 'renders two secondary button');
    assert
      .dom(secondaryButtons[0])
      .hasText(
        'This is a secondary button',
        'first secondary button - renders the correct content'
      );
    assert
      .dom(secondaryButtons[1])
      .hasText(
        'This is another secondary button',
        'second secondary button - renders the correct content'
      );
  });

  test('it renders the correct HTML when primary action is supplied with empty secondary actions list', async function(assert) {
    await render(hbs`
      {{polaris-page-actions
        primaryAction=(hash
          text="Primary button here"
        )
        secondaryActions=(array)
      }}
    `);

    const pageActions = findAll(pageActionsSelector);
    assert.equal(pageActions.length, 1, 'renders one page actions component');

    const pageActionsStacks = findAll(pageActionsStackSelector);
    assert.equal(pageActionsStacks.length, 1, 'renders one stack component');
    const pageActionsStack = pageActionsStacks[0];
    assert
      .dom(pageActionsStack)
      .hasClass('Polaris-Stack--spacingTight', 'stack has tight spacing');
    assert
      .dom(pageActionsStack)
      .hasClass(
        'Polaris-Stack--distributionEqualSpacing',
        'stack has equal distribution'
      );

    const pageActionsStackItems = findAll(pageActionsStackItemSelector);
    assert.equal(pageActionsStackItems.length, 2, 'renders two stack items');

    const primaryButtonSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'button.Polaris-Button.Polaris-Button--primary'
    );
    const primaryButtons = findAll(primaryButtonSelector);
    assert.equal(primaryButtons.length, 1, 'renders one primary button');
    assert
      .dom(primaryButtons[0])
      .hasText(
        'Primary button here',
        'primary button - renders the correct content'
      );

    const secondaryButtonSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'div.Polaris-ButtonGroup',
      'div.Polaris-ButtonGroup__Item',
      'button.Polaris-Button'
    );
    const secondaryButtons = findAll(secondaryButtonSelector);
    assert.equal(
      secondaryButtons.length,
      0,
      'does not render any secondary buttons'
    );
  });

  test('it renders the correct HTML when only a primary action is supplied', async function(assert) {
    await render(hbs`
      {{polaris-page-actions
        primaryAction=(hash
          text="I'm the only button here"
        )
      }}
    `);

    const pageActions = findAll(pageActionsSelector);
    assert.equal(pageActions.length, 1, 'renders one page actions component');

    const pageActionsStacks = findAll(pageActionsStackSelector);
    assert.equal(pageActionsStacks.length, 1, 'renders one stack component');
    const pageActionsStack = pageActionsStacks[0];
    assert
      .dom(pageActionsStack)
      .hasClass('Polaris-Stack--spacingTight', 'stack has tight spacing');
    assert
      .dom(pageActionsStack)
      .hasClass(
        'Polaris-Stack--distributionTrailing',
        'stack has trailing distribution'
      );

    const pageActionsStackItems = findAll(pageActionsStackItemSelector);
    assert.equal(pageActionsStackItems.length, 1, 'renders one stack item');

    const primaryButtonSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'button.Polaris-Button.Polaris-Button--primary'
    );
    const primaryButtons = findAll(primaryButtonSelector);
    assert.equal(primaryButtons.length, 1, 'renders one primary button');
    assert
      .dom(primaryButtons[0])
      .hasText(
        "I'm the only button here",
        'primary button - renders the correct content'
      );

    const secondaryButtonGroupSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'div.Polaris-ButtonGroup'
    );
    const secondaryButtons = findAll(secondaryButtonGroupSelector);
    assert.equal(
      secondaryButtons.length,
      0,
      'does not render a secondary button group'
    );
  });

  test('it renders the correct HTML when only a secondary action is supplied', async function(assert) {
    await render(hbs`
      {{polaris-page-actions
        secondaryActions=(array (hash
          text="I'm the only button here"
        ))
      }}
    `);

    const pageActions = findAll(pageActionsSelector);
    assert.equal(pageActions.length, 1, 'renders one page actions component');

    const pageActionsStacks = findAll(pageActionsStackSelector);
    assert.equal(pageActionsStacks.length, 1, 'renders one stack component');
    const pageActionsStack = pageActionsStacks[0];
    assert
      .dom(pageActionsStack)
      .hasClass('Polaris-Stack--spacingTight', 'stack has tight spacing');
    assert
      .dom(pageActionsStack)
      .hasClass(
        'Polaris-Stack--distributionEqualSpacing',
        'stack has equal spacing distribution'
      );

    const pageActionsStackItems = findAll(pageActionsStackItemSelector);
    assert.equal(pageActionsStackItems.length, 1, 'renders one stack item');

    const primaryButtonSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'button.Polaris-Button.Polaris-Button--primary'
    );
    const primaryButtons = findAll(primaryButtonSelector);
    assert.equal(primaryButtons.length, 0, 'does not render a primary button');

    const secondaryButtonGroupSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'div.Polaris-ButtonGroup',
      'div.Polaris-ButtonGroup__Item',
      'button.Polaris-Button'
    );
    const secondaryButtons = findAll(secondaryButtonGroupSelector);
    assert.equal(
      secondaryButtons.length,
      1,
      'renders one secondary button group'
    );
    assert
      .dom(secondaryButtons[0])
      .hasText(
        "I'm the only button here",
        'primary button - renders the correct content'
      );
  });

  test('it renders the correct HTML when the primary action is disabled', async function(assert) {
    await render(hbs`
      {{polaris-page-actions
        primaryAction=(hash
          text="I'm the only button here"
          disabled=true
        )
      }}
    `);

    const primaryButtonSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'button.Polaris-Button.Polaris-Button--primary'
    );
    const primaryButton = find(primaryButtonSelector);
    assert.ok(primaryButton, 'renders primary button');
    assert.ok(primaryButton.disabled, 'primary button is disabled');
  });

  test('it renders the correct HTML when the primary action is loading', async function(assert) {
    await render(hbs`
      {{polaris-page-actions
        primaryAction=(hash
          text="I'm the only button here"
          loading=true
        )
      }}
    `);

    const primaryButtonSelector = buildNestedSelector(
      pageActionsStackItemSelector,
      'button.Polaris-Button.Polaris-Button--primary'
    );
    const primaryButton = find(primaryButtonSelector);
    assert.ok(primaryButton, 'renders primary button');
    assert.ok(primaryButton.disabled, 'primary button is disabled');
    assert
      .dom(primaryButton)
      .hasClass(
        'Polaris-Button--loading',
        'primary button is in loading state'
      );
  });

  test('it renders the correct HTML when secondary actions have complex properties', async function(assert) {
    await render(hbs`
      {{polaris-page-actions
        secondaryActions=(array
          (hash
            text="Disabled secondary action"
            disabled=true
          )
          (hash
            text="Loading secondary action"
            loading=true
          )
          (hash
            text="Destructive secondary action"
            destructive=true
          )
          (hash
            text="Secondary action with icon"
            icon="notes"
          )
        )
      }}
    `);

    let secondaryButtons = assert.dom(secondaryButtonSelector);
    secondaryButtons.exists({ count: 4 }, 'renders four secondary buttons');

    secondaryButtons = findAll(secondaryButtonSelector);

    // Check the first (disabled) button.
    let secondaryButton = assert.dom(secondaryButtons[0]);

    secondaryButton.isDisabled('disabled secondary button is disabled');
    secondaryButton.hasClass(
      'Polaris-Button--disabled',
      'disabled secondary button has disabled class'
    );
    secondaryButton.hasNoClass(
      'Polaris-Button--loading',
      'disabled secondary button does not have loading class'
    );
    secondaryButton.hasNoClass(
      'Polaris-Button--destructive',
      'disabled secondary button does not have destructive class'
    );

    assert
      .dom(iconSelector, secondaryButton.target)
      .doesNotExist('disabled secondary button does not have an icon');

    // Check the second (loading) button.
    secondaryButton = assert.dom(secondaryButtons[1]);
    secondaryButton.isDisabled('loading secondary button is disabled');
    secondaryButton.hasClass(
      'Polaris-Button--disabled',
      'loading secondary button has disabled class'
    );
    secondaryButton.hasClass(
      'Polaris-Button--loading',
      'loading secondary button has loading class'
    );
    secondaryButton.hasNoClass(
      'Polaris-Button--destructive',
      'disabled secondary button does not have destructive class'
    );
    assert
      .dom(iconSelector, secondaryButton.target)
      .doesNotExist('disabled secondary button does not have an icon');

    // Check the third (destructive) button.
    secondaryButton = assert.dom(secondaryButtons[2]);

    secondaryButton.isNotDisabled(
      'destructive secondary button is not disabled'
    );
    secondaryButton.hasNoClass(
      'Polaris-Button--disabled',
      'destructive secondary button does not have disabled class'
    );
    secondaryButton.hasNoClass(
      'Polaris-Button--loading',
      'destructive secondary button does not have loading class'
    );
    secondaryButton.hasClass(
      'Polaris-Button--destructive',
      'destructive secondary button has destructive class'
    );
    assert
      .dom(iconSelector, secondaryButton.target)
      .doesNotExist('destructive secondary button does not have an icon');

    // Check the fourth (iconed) button.
    secondaryButton = assert.dom(secondaryButtons[3]);
    secondaryButton.isNotDisabled('iconed secondary button is not disabled');
    secondaryButton.hasNoClass(
      'Polaris-Button--disabled',
      'iconed secondary button does not have disabled class'
    );
    secondaryButton.hasNoClass(
      'Polaris-Button--loading',
      'iconed secondary button does not have loading class'
    );
    secondaryButton.hasNoClass(
      'Polaris-Button--destructive',
      'iconed secondary button does not have destructive class'
    );

    const icon = assert.dom(iconSelector, secondaryButton.target);
    icon.exists('iconed secondary button has an icon');
    icon.hasAttribute(
      'data-icon-source',
      'polaris/notes',
      'iconed secondary button has the correct icon'
    );
  });

  test('it handles item actions correctly', async function(assert) {
    const initState = () =>
      this.setProperties({
        primaryActionFired: false,
        secondaryAction1Fired: false,
        secondaryAction2Fired: false,
      });

    initState();
    await render(hbs`
      {{polaris-page-actions
        primaryAction=(hash
          text="Primary"
          onAction=(action (mut primaryActionFired) true)
        )
        secondaryActions=(array
          (hash
            text="Secondary 1"
            onAction=(action (mut secondaryAction1Fired) true)
          )
          (hash
            text="Secondary 2"
            onAction=(action (mut secondaryAction2Fired) true)
          )
        )
      }}
    `);

    const secondaryButtonGroupItems = findAll('div.Polaris-ButtonGroup__Item');
    assert.equal(
      secondaryButtonGroupItems.length,
      2,
      'renders both secondary buttons'
    );

    // Click the primary button.
    await click('button.Polaris-Button--primary');
    assert.ok(
      this.get('primaryActionFired'),
      'after clicking primary button - primary action fired'
    );
    assert.notOk(
      this.get('secondaryAction1Fired'),
      'after clicking primary button - second secondary action not fired'
    );
    assert.notOk(
      this.get('secondaryAction2Fired'),
      'after clicking primary button - second secondary action not fired'
    );

    initState();
    // Click the first secondary button.
    await click(secondaryButtonGroupItems[0].querySelector('button'));
    assert.notOk(
      this.get('primaryActionFired'),
      'after clicking first secondary button - primary action not fired'
    );
    assert.ok(
      this.get('secondaryAction1Fired'),
      'after clicking first secondary button - first secondary action fired'
    );
    assert.notOk(
      this.get('secondaryAction2Fired'),
      'after clicking first secondary button - second secondary action not fired'
    );

    initState();

    // Click the remaining secondary button.
    await click(secondaryButtonGroupItems[1].querySelector('button'));
    assert.notOk(
      this.get('primaryActionFired'),
      'after clicking second secondary button - primary action not fired'
    );
    assert.notOk(
      this.get('secondaryAction1Fired'),
      'after clicking second secondary button - first secondary action not fired'
    );
    assert.ok(
      this.get('secondaryAction2Fired'),
      'after clicking second secondary button - second secondary action fired'
    );
  });
});
