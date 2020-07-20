import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const actionsCollection = [
  {
    text: 'button 3',
    onAction() {},
  },
  {
    text: 'button 4',
    onAction() {},
  },
  {
    text: 'button 5',
    onAction() {},
  },
];

const promotedActions = [
  {
    text: 'button 1',
    content: 'button 1',
    onAction() {},
  },
  {
    text: 'button 2',
    content: 'button 2',
    onAction() {},
  },
];

const largeScreenSelector =
  '.Polaris-ResourceList-BulkActions__Group--largeScreen';
const actionsButtonGroupSelector = `${largeScreenSelector} .Polaris-ResourceList-BulkActions__ButtonGroup`;
const actionsButtonGroupButtonsSelector = `${actionsButtonGroupSelector} .Polaris-ResourceList-BulkActions__Button`;
const actionsPopoverSelector = '.Polaris-ResourceList-BulkActions__Popover';
const checkableButtonSelector = `${largeScreenSelector} .Polaris-ResourceList-CheckableButton`;
const checkableButtonLabelSelector = `${checkableButtonSelector} > .Polaris-ResourceList-CheckableButton__Label`;
const checkableButtonAriaLabelSelector = `${checkableButtonSelector} .Polaris-Choice--labelHidden`;
const checkableButtonCheckboxSelector = `${checkableButtonSelector} .Polaris-Checkbox input`;
const selelectAllContainer =
  '.Polaris-ResourceList-BulkActions__PaginatedSelectAll';
const selectAllText = `${selelectAllContainer} > span`;
const selectAllButton = `${selelectAllContainer} > .Polaris-Button`;

module(
  'Integration | Component | polaris-resource-list/bulk-actions',
  function (hooks) {
    setupRenderingTest(hooks);

    module('actions', function () {
      test('promotedActions render in the last position on intial load', async function (assert) {
        this.setProperties({ promotedActions });

        await render(hbs`
        {{polaris-resource-list/bulk-actions
          promotedActions=promotedActions
          selectMode=true
        }}
      `);

        let allActionsButtons = findAll(actionsButtonGroupButtonsSelector);

        assert
          .dom(allActionsButtons[0])
          .hasText(
            'button 1',
            'first promoted action is the first button rendered'
          );
        assert
          .dom(allActionsButtons[1])
          .hasText(
            'button 2',
            'second promoted action is the second button rendered'
          );
      });

      test('actionsCollection actions render in the first position on initial load', async function (assert) {
        this.setProperties({
          actionsCollection,
          promotedActions,
        });

        await render(hbs`
        {{polaris-resource-list/bulk-actions
          actionsCollection=actionsCollection
          promotedActions=promotedActions
          selectMode=true
        }}
      `);

        const actionBtn = assert.dom(actionsButtonGroupSelector);
        actionBtn.doesNotIncludeText(
          'button 3',
          'non promoted actions are not rendered (button 3)'
        );
        actionBtn.doesNotIncludeText(
          'button 4',
          'non promoted actions are not rendered (button 4)'
        );
        actionBtn.doesNotIncludeText(
          'button 5',
          'non promoted actions are not rendered (button 5)'
        );
      });

      test('it renders a popover', async function (assert) {
        this.setProperties({
          actionsCollection,
        });

        await render(hbs`
        {{polaris-resource-list/bulk-actions
          actionsCollection=actionsCollection
          selectMode=true
        }}
      `);

        assert
          .dom(actionsPopoverSelector)
          .exists('it renders a popover when actionsCollection is present');
      });
    });

    module('props', function () {
      test('it correctly passes attributes down to checkable-button component', async function (assert) {
        let label = 'Test-Label';
        let accessibilityLabel = 'test-aria-label';

        this.setProperties({
          label,
          accessibilityLabel,
          disabled: true,
        });

        await render(hbs`
        {{polaris-resource-list/bulk-actions
          selectMode=true
          label=label
          accessibilityLabel=accessibilityLabel
          disabled=disabled
        }}
      `);

        assert
          .dom(checkableButtonLabelSelector)
          .hasText(
            label,
            'label is passed down and rendered in checkable-button'
          );
        assert
          .dom(checkableButtonAriaLabelSelector)
          .hasText(
            accessibilityLabel,
            'accessibilityLabel is passed down and rendered in checkable-button'
          );
        assert
          .dom(checkableButtonCheckboxSelector)
          .isDisabled('disabled is passed down into checkable-button');
      });

      test('renders a button for actions and one for each item in promotedActions', async function (assert) {
        this.setProperties({
          promotedActions,
        });

        await render(hbs`
        {{polaris-resource-list/bulk-actions
          promotedActions=promotedActions
          selectMode=true
        }}
      `);

        assert
          .dom(actionsButtonGroupButtonsSelector)
          .exists(
            { count: 2 },
            'it renders the correct amount of buttons for promotedActions'
          );
        assert
          .dom(checkableButtonSelector)
          .exists({ count: 1 }, 'it renders a single button for actions');
      });

      test('it correctly handles paginatedSelectAllText and paginatedSelectAllAction attributes', async function (assert) {
        let paginatedSelectAllText = 'paginated select all text string';
        let paginatedSelectAllActionText =
          'paginated select all action text string';

        this.setProperties({
          paginatedSelectAllText,
          paginatedSelectAllActionText,
          actionCalled: false,
        });

        await render(hbs`
        {{polaris-resource-list/bulk-actions
          selectMode=true
          paginatedSelectAllText=paginatedSelectAllText
          paginatedSelectAllAction=(hash
            content=paginatedSelectAllActionText
            onAction=(action (mut actionCalled) true)
          )
        }}
      `);

        assert
          .dom(selectAllText)
          .hasText(
            paginatedSelectAllText,
            'paginatedSelectAllText is rendered'
          );
        assert
          .dom(selectAllButton)
          .hasText(
            paginatedSelectAllActionText,
            'paginatedSelectAllAction `content` is rendered'
          );

        await click(selectAllButton);

        assert.ok(
          this.get('actionCalled'),
          'paginatedSelectAllAction `onAction` was called'
        );
      });
    });
  }
);
