import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import stubRouting from '../../helpers/stub-routing';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const availableRoutes = ['home', 'home.the-beginning'];

module('Integration | Component | polaris page', function(hooks) {
  const pageSelector = 'div.Polaris-Page';
  const headerSelector = buildNestedSelector(
    pageSelector,
    'div.Polaris-Page-Header'
  );
  const secondaryActionsWrapperSelector = buildNestedSelector(
    headerSelector,
    'div.Polaris-Page-Header__Actions',
    'div.Polaris-Page-Header__SecondaryActions',
    'div.Polaris-Page-Header__IndividualActions'
  );

  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);

    this.owner.register('component:svg-jar', MockSvgJarComponent);
    stubRouting(this.owner, availableRoutes);
  });

  const primaryButtonSelector = buildNestedSelector(
    headerSelector,
    'div.Polaris-Page-Header__MainContent',
    'div.Polaris-Page-Header__TitleAndActions',
    'div.Polaris-Page-Header__Actions',
    'div.Polaris-Page-Header__PrimaryAction',
    'button.Polaris-Button'
  );

  test('it renders the page correctly', async function(assert) {
    this.setProperties({
      fullWidth: false,
      singleColumn: false,
    });

    await render(hbs`
      {{#polaris-page
        title="This is the title"
        fullWidth=fullWidth
        singleColumn=singleColumn
        titleHidden=titleHidden
      }}
        <div class="test-page-content">This is some test content</div>
      {{/polaris-page}}`);

    const pages = assert.dom(pageSelector);
    pages.exists({ count: 1 }, 'renders one page div');

    pages.hasNoClass(
      'Polaris-Page--fullWidth',
      'does not apply full width class'
    );
    pages.hasNoClass(
      'Polaris-Page--singleColumn',
      'does not apply single column class'
    );

    const headers = assert.dom(headerSelector);
    headers.exists({ count: 1 }, 'renders one page header div');

    headers.hasNoClass(
      'Polaris-Page-Header__Header--hasSecondaryActions',
      'does not apply secondary actions class to header'
    );

    const displayTextSelector = buildNestedSelector(
      headerSelector,
      'div.Polaris-Page-Header__TitleAndRollup',
      'div.Polaris-Page-Header__Title',
      'div',
      'h1.Polaris-DisplayText.Polaris-DisplayText--sizeLarge'
    );
    const displayTexts = assert.dom(displayTextSelector);

    displayTexts.exists(
      { count: 1 },

      'renders one page header display text'
    );

    displayTexts.hasText(
      'This is the title',
      'renders correct page header display text content'
    );

    const contentWrapperSelector = buildNestedSelector(
      pageSelector,
      'div.Polaris-Page__Content'
    );
    assert
      .dom(contentWrapperSelector)
      .exists({ count: 1 }, 'renders one page content wrapper div');

    const contentSelector = buildNestedSelector(
      contentWrapperSelector,
      'div.test-page-content'
    );
    const contents = assert.dom(contentSelector);
    contents.exists({ count: 1 }, 'renders one content div');

    contents.hasText('This is some test content', 'renders correct content');

    pages.hasNoClass(
      'Polaris-Page--fullWidth',
      'fullWidth unset - does not apply fullWidth class'
    );
    this.set('fullWidth', true);
    pages.hasClass(
      'Polaris-Page--fullWidth',
      'fullWidth set - applies fullWidth class'
    );

    pages.hasNoClass(
      'Polaris-Page--singleColumn',
      'singleColumn unset - does not apply singleColumn class'
    );
    this.set('singleColumn', true);
    pages.hasClass(
      'Polaris-Page--singleColumn',
      'singleColumn set - applies singleColumn class'
    );

    headers.hasNoClass(
      'Polaris-Page-Header__Title--hidden',
      'titleHidden unset - does not apply titleHidden class'
    );
    this.set('titleHidden', true);
    headers.hasClass(
      'Polaris-Page-Header__Title--hidden',
      'titleHidden set - applies titleHidden class'
    );
  });

  test('it handles primary action correctly when supplied', async function(assert) {
    let primaryActionFired = false;
    this.actions.primaryActionFired = () => {
      primaryActionFired = true;
    };
    this.setProperties({
      primaryActionDisabled: true,
      primaryActionLoading: false,
    });

    await render(hbs`
      {{polaris-page
        title="This is the title"
        primaryAction=(hash
          text="Take action!"
          disabled=primaryActionDisabled
          loading=primaryActionLoading
          onAction=(action "primaryActionFired")
        )
      }}
    `);

    const primaryButtons = assert.dom(primaryButtonSelector);
    primaryButtons.exists({ count: 1 }, 'renders one primary button');

    primaryButtons.hasText(
      'Take action!',
      'uses correct text on primary button'
    );

    primaryButtons.isDisabled('primary action button is initially disabled');
    primaryButtons.hasNoClass(
      'Polaris-Button--loading',
      'primary action button is not initially in loading state'
    );

    this.setProperties({
      primaryActionDisabled: false,
      primaryActionLoading: true,
    });

    primaryButtons.hasClass(
      'Polaris-Button--loading',
      'primary action button goes into loading state'
    );

    this.set('primaryActionLoading', false);

    primaryButtons.isNotDisabled('primary action button becomes enabled');
    assert.notOk(
      primaryActionFired,
      "hasn't fired primary action before clicking button"
    );

    await click(primaryButtonSelector);
    assert.ok(primaryActionFired, 'fires primary action on click');
  });

  test('it handles secondary actions correctly when supplied', async function(assert) {
    let secondaryAction1Fired = false;
    this.actions.secondaryAction1 = () => {
      secondaryAction1Fired = true;
    };
    let secondaryAction2Fired = false;
    this.actions.secondaryAction2 = () => {
      secondaryAction2Fired = true;
    };

    await render(hbs`
      {{polaris-page
        title="This is the title"
        secondaryActions=(array
          (hash
            text="First secondary action"
            onAction=(action "secondaryAction1")
          )
          (hash
            text="Second secondary action"
            onAction=(action "secondaryAction2")
          )
        )
      }}
    `);

    assert
      .dom(headerSelector)
      .hasClass(
        'Polaris-Page-Header__Header--hasSecondaryActions',
        'applies secondary actions class'
      );

    const secondaryActionsButtonSelector = buildNestedSelector(
      secondaryActionsWrapperSelector,
      'div.Polaris-Page-Header__IndividualAction',
      'button.Polaris-Header-Action'
    );

    const secondaryButtons = findAll(secondaryActionsButtonSelector);
    assert.equal(secondaryButtons.length, 2, 'renders two secondary buttons');

    assert
      .dom(secondaryButtons[0])
      .hasText(
        'First secondary action',
        'first secondary action - uses correct text on button'
      );
    assert
      .dom(secondaryButtons[1])
      .hasText(
        'Second secondary action',
        'second secondary action - uses correct text on button'
      );

    assert.notOk(
      secondaryAction1Fired,
      'first secondary action - not fired before clicking button'
    );
    assert.notOk(
      secondaryAction2Fired,
      'second secondary action - not fired before clicking button'
    );

    const focussedSecondaryButtonSelector = `${secondaryActionsButtonSelector}:focus`;
    await click(
      buildNestedSelector(
        secondaryActionsWrapperSelector,
        'div.Polaris-Page-Header__IndividualAction:first-child',
        'button'
      )
    );
    assert.ok(
      secondaryAction1Fired,
      'first secondary action - fired after clicking button'
    );
    assert.notOk(
      secondaryAction2Fired,
      'second secondary action - not fired after clicking first button'
    );

    assert
      .dom(focussedSecondaryButtonSelector)
      .doesNotExist(
        'no focussed buttons after clicking first secondary action'
      );

    await click(
      buildNestedSelector(
        secondaryActionsWrapperSelector,
        'div.Polaris-Page-Header__IndividualAction:last-child',
        'button'
      )
    );
    assert.ok(
      secondaryAction2Fired,
      'second secondary action - fired after clicking button'
    );
    assert
      .dom(focussedSecondaryButtonSelector)
      .doesNotExist(
        'no focussed buttons after clicking second secondary action'
      );
  });

  test('it renders action icons correctly', async function(assert) {
    await render(hbs`
      {{polaris-page
        title="This is the title"
        secondaryActions=(array
          (hash
            text="First secondary action"
            icon="add"
            onAction=(action (mut dummy))
          )
          (hash
            text="Second secondary action"
            icon="cancel"
            onAction=(action (mut dummy))
          )
        )
      }}
    `);

    const secondaryActionsSelector = buildNestedSelector(
      secondaryActionsWrapperSelector,
      'div.Polaris-Page-Header__IndividualAction',
      'button.Polaris-Header-Action',
      'span.Polaris-Header-Action__ActionContent'
    );
    assert.dom(secondaryActionsSelector).exists({ count: 2 });

    const secondaryActionIconSelector = buildNestedSelector(
      secondaryActionsSelector,
      'span.Polaris-Header-Action__ActionIcon',
      'span.Polaris-Icon',
      'svg'
    );
    assert.dom(secondaryActionIconSelector).exists({ count: 2 });

    // TODO: target these using selectors so we can use qunit-dom assertions here.
    const secondaryActionIcons = findAll(secondaryActionIconSelector);
    assert.equal(
      secondaryActionIcons[0].dataset.iconSource,
      'polaris/add',
      'first secondary action icon - renders the correct icon'
    );
    assert.equal(
      secondaryActionIcons[1].dataset.iconSource,
      'polaris/cancel',
      'second secondary action icon - renders the correct icon'
    );
  });

  test('it handles breadcrumbs correctly', async function(assert) {
    await render(
      hbs`{{polaris-page title="This is a page" breadcrumbs=breadcrumbs}}`
    );

    const headerWithBreadcrumbsClass =
      'Polaris-Page-Header__Header--hasBreadcrumbs';

    // Test before setting breadcrumbs.
    const header = assert.dom(headerSelector);

    header.exists('without breadcrumbs - renders header');
    header.hasNoClass(
      headerWithBreadcrumbsClass,
      'without breadcrumbs - does not apply hasBreadcrumbs class'
    );

    const navigationSelector = buildNestedSelector(
      headerSelector,
      'div.Polaris-Page-Header__Navigation'
    );
    assert
      .dom(navigationSelector)
      .doesNotExist('without breadcrumbs - does not render navigation div');

    // Add the breadcrumbs.
    this.set('breadcrumbs', [
      {
        content: 'Go back',
        url: '/home',
      },
      {
        content: 'No, really!',
        url: '/home/the-beginning',
      },
    ]);

    header.hasClass(
      headerWithBreadcrumbsClass,
      'with breadcrumbs - applies hasBreadcrumbs class'
    );

    // Check the breadcrumbs rendered.
    const breadcrumbLinkSelector = buildNestedSelector(
      navigationSelector,
      'nav[role="navigation"]',
      'a.Polaris-Breadcrumbs__Breadcrumb'
    );
    const breadcrumbLinks = assert.dom(breadcrumbLinkSelector);

    breadcrumbLinks.exists(
      { count: 1 },
      'with breadcrumbs - renders 1 breadcrumb'
    );

    // Check the last breadcrumb in the list was rendered.
    const iconSelector = buildNestedSelector(
      'span.Polaris-Breadcrumbs__Icon',
      'span.Polaris-Icon'
    );
    const contentSelector = 'span.Polaris-Breadcrumbs__Content';

    breadcrumbLinks.hasAttribute(
      'href',
      '/home/the-beginning',
      'breadcrumb has href of last breadcrumb in list'
    );
    breadcrumbLinks.hasAttribute(
      'data-polaris-unstyled',
      'true',
      'breadcrumb has data-polaris-unstyled attribute'
    );

    let contents = assert.dom(`${breadcrumbLinkSelector} ${contentSelector}`);
    contents.exists({ count: 1 }, 'breadcrumb renders content');
    contents.hasText(
      'No, really!',
      'breadcrumb renders text from last breadcrumb in list'
    );

    assert
      .dom(`${breadcrumbLinkSelector} ${iconSelector}`)
      .exists({ count: 1 }, 'breadcrumb renders icon');
  });

  test('it renders title metadata', async function(assert) {
    await render(hbs`
      {{polaris-page
        title="Testing title metadata"
        titleMetadata=(component "polaris-badge")
      }}
    `);

    assert.dom('.Polaris-Badge').exists('renders title metadata');
  });

  test('it allows the primary action to be rendered as not primary', async function(assert) {
    this.set('shouldRenderPrimaryActionAsPrimary', false);

    await render(hbs`
      {{polaris-page
        title="Testing primary button"
        primaryAction=(hash
          text="Primary"
          primary=shouldRenderPrimaryActionAsPrimary
          onAction=(action (mut dummy))
        )
      }}
    `);

    let primaryButton = assert.dom(primaryButtonSelector);
    primaryButton.exists('primary false - renders primary action');
    primaryButton.hasNoClass(
      'Polaris-Button--primary',
      'primary false - button is not rendered as primary'
    );

    this.set('shouldRenderPrimaryActionAsPrimary', null);
    primaryButton.hasNoClass(
      'Polaris-Button--primary',
      'primary null - button is not rendered as primary'
    );

    this.set('shouldRenderPrimaryActionAsPrimary', true);
    primaryButton.hasClass(
      'Polaris-Button--primary',
      'primary true - button is rendered as primary'
    );

    this.set('shouldRenderPrimaryActionAsPrimary', undefined);
    primaryButton.hasClass(
      'Polaris-Button--primary',
      'primary undefined - button is rendered as primary'
    );
  });
});
