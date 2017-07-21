import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-page-actions', 'Integration | Component | polaris page actions', {
  integration: true
});

const pageActionsSelector = 'div.Polaris-PageActions';
const pageActionsStackSelector = buildNestedSelector(pageActionsSelector, 'div.Polaris-Stack');
const pageActionsStackItemSelector = buildNestedSelector(pageActionsStackSelector, 'div.Polaris-Stack__Item');

test('it renders the correct HTML when primary and secondary actions are supplied', function(assert) {
  this.render(hbs`
    {{polaris-page-actions
      primaryAction=(hash
        content="Primary button here"
      )
      secondaryActions=(array
        (hash
          content="This is a secondary button"
        )
        (hash
          content="This is another secondary button"
        )
      )
    }}
  `);

  const pageActions = findAll(pageActionsSelector);
  assert.equal(pageActions.length, 1, 'renders one page actions component');

  const pageActionsStacks = findAll(pageActionsStackSelector);
  assert.equal(pageActionsStacks.length, 1, 'renders one stack component');
  const pageActionsStack = pageActionsStacks[0];
  assert.ok(pageActionsStack.classList.contains('Polaris-Stack--spacingTight'), 'stack has tight spacing');
  assert.ok(pageActionsStack.classList.contains('Polaris-Stack--distributionEqualSpacing'), 'stack has equal distribution');

  const pageActionsStackItems = findAll(pageActionsStackItemSelector);
  assert.equal(pageActionsStackItems.length, 2, 'renders two stack items');

  const primaryButtonSelector = buildNestedSelector(
    pageActionsStackItemSelector,
    'button.Polaris-Button.Polaris-Button--primary'
  );
  const primaryButtons = findAll(primaryButtonSelector);
  assert.equal(primaryButtons.length, 1, 'renders one primary button');
  assert.equal(primaryButtons[0].textContent.trim(), 'Primary button here', 'primary button - renders the correct content');

  const secondaryButtonSelector = buildNestedSelector(
    pageActionsStackItemSelector,
    'div.Polaris-ButtonGroup',
    'div.Polaris-ButtonGroup__Item',
    'button.Polaris-Button'
  );
  const secondaryButtons = findAll(secondaryButtonSelector);
  assert.equal(secondaryButtons.length, 2, 'renders two secondary button');
  assert.equal(secondaryButtons[0].textContent.trim(), 'This is a secondary button', 'first secondary button - renders the correct content');
  assert.equal(secondaryButtons[1].textContent.trim(), 'This is another secondary button', 'second secondary button - renders the correct content');
});

test('it renders the correct HTML when primary action is supplied with empty secondary actions list', function(assert) {
  this.render(hbs`
    {{polaris-page-actions
      primaryAction=(hash
        content="Primary button here"
      )
      secondaryActions=(array)
    }}
  `);

  const pageActions = findAll(pageActionsSelector);
  assert.equal(pageActions.length, 1, 'renders one page actions component');

  const pageActionsStacks = findAll(pageActionsStackSelector);
  assert.equal(pageActionsStacks.length, 1, 'renders one stack component');
  const pageActionsStack = pageActionsStacks[0];
  assert.ok(pageActionsStack.classList.contains('Polaris-Stack--spacingTight'), 'stack has tight spacing');
  assert.ok(pageActionsStack.classList.contains('Polaris-Stack--distributionEqualSpacing'), 'stack has equal distribution');

  const pageActionsStackItems = findAll(pageActionsStackItemSelector);
  assert.equal(pageActionsStackItems.length, 2, 'renders two stack items');

  const primaryButtonSelector = buildNestedSelector(
    pageActionsStackItemSelector,
    'button.Polaris-Button.Polaris-Button--primary'
  );
  const primaryButtons = findAll(primaryButtonSelector);
  assert.equal(primaryButtons.length, 1, 'renders one primary button');
  assert.equal(primaryButtons[0].textContent.trim(), 'Primary button here', 'primary button - renders the correct content');

  const secondaryButtonSelector = buildNestedSelector(
    pageActionsStackItemSelector,
    'div.Polaris-ButtonGroup',
    'div.Polaris-ButtonGroup__Item',
    'button.Polaris-Button'
  );
  const secondaryButtons = findAll(secondaryButtonSelector);
  assert.equal(secondaryButtons.length, 0, 'does not render any secondary buttons');
});

test('it renders the correct HTML when only a primary action is supplied', function(assert) {
  this.render(hbs`
    {{polaris-page-actions
      primaryAction=(hash
        content="I'm the only button here"
      )
    }}
  `);

  const pageActions = findAll(pageActionsSelector);
  assert.equal(pageActions.length, 1, 'renders one page actions component');

  const pageActionsStacks = findAll(pageActionsStackSelector);
  assert.equal(pageActionsStacks.length, 1, 'renders one stack component');
  const pageActionsStack = pageActionsStacks[0];
  assert.ok(pageActionsStack.classList.contains('Polaris-Stack--spacingTight'), 'stack has tight spacing');
  assert.ok(pageActionsStack.classList.contains('Polaris-Stack--distributionTrailing'), 'stack has trailing distribution');

  const pageActionsStackItems = findAll(pageActionsStackItemSelector);
  assert.equal(pageActionsStackItems.length, 1, 'renders one stack item');

  const primaryButtonSelector = buildNestedSelector(
    pageActionsStackItemSelector,
    'button.Polaris-Button.Polaris-Button--primary'
  );
  const primaryButtons = findAll(primaryButtonSelector);
  assert.equal(primaryButtons.length, 1, 'renders one primary button');
  assert.equal(primaryButtons[0].textContent.trim(), 'I\'m the only button here', 'primary button - renders the correct content');

  const secondaryButtonGroupSelector = buildNestedSelector(
    pageActionsStackItemSelector,
    'div.Polaris-ButtonGroup'
  );
  const secondaryButtons = findAll(secondaryButtonGroupSelector);
  assert.equal(secondaryButtons.length, 0, 'does not render a secondary button group');
});

test('it renders the correct HTML when the primary action is disabled', function(assert) {
  this.render(hbs`
    {{polaris-page-actions
      primaryAction=(hash
        content="I'm the only button here"
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

test('it handles item actions correctly', function(assert) {
  let primaryActionFired = false;
  this.on('primaryAction', () => {
    primaryActionFired = true;
  });
  this.set('secondaryAction1Fired', false);
  this.set('secondaryAction2Fired', false);

  this.render(hbs`
    {{polaris-page-actions
      primaryAction=(hash
        content="Primary"
        action=(action "primaryAction")
      )
      secondaryActions=(array
        (hash
          content="Secondary 1"
          action=(action (mut secondaryAction1Fired) true)
        )
        (hash
          content="Secondary 2"
          action=(action (mut secondaryAction2Fired) true)
        )
      )
    }}
  `);

  const secondaryButtonGroupItems = findAll('div.Polaris-ButtonGroup__Item');
  assert.equal(secondaryButtonGroupItems.length, 2, 'renders both secondary buttons');

  // Click the first secondary button.
  click('button', secondaryButtonGroupItems[0]);
  assert.notOk(primaryActionFired, 'after clicking first secondary button - primary action not fired');
  assert.ok(this.get('secondaryAction1Fired'), 'after clicking first secondary button - first secondary action fired');
  assert.notOk(this.get('secondaryAction2Fired'), 'after clicking first secondary button - second secondary action not fired');

  // Click the primary button.
  click('button.Polaris-Button--primary');
  assert.ok(primaryActionFired, 'after clicking primary button - primary action fired');
  assert.notOk(this.get('secondaryAction2Fired'), 'after clicking first secondary button - second secondary action not fired');

  // Click the remaining secondary button.
  click('button', secondaryButtonGroupItems[1]);
  assert.ok(this.get('secondaryAction2Fired'), 'after clicking second secondary button - second secondary action fired');
});
