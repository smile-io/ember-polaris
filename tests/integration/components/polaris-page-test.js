import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import stubRouting from '../../helpers/stub-routing';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const availableRoutes = [
  'home',
  'home.the-beginning'
];

moduleForComponent('polaris-page', 'Integration | Component | polaris page', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent);
    stubRouting(this.registry, availableRoutes);
  }
});

const pageSelector = 'div.Polaris-Page';
const headerSelector = buildNestedSelector(pageSelector, 'div.Polaris-Page__Header');

test('it renders the page correctly', function(assert) {
  this.setProperties({
    fullWidth: false,
    singleColumn: false,
  });

  this.render(hbs`
    {{#polaris-page
      title="This is the title"
      fullWidth=fullWidth
      singleColumn=singleColumn
      titleHidden=titleHidden
    }}
      <div class="test-page-content">This is some test content</div>
    {{/polaris-page}}`
  );

  const pages = findAll(pageSelector);
  assert.equal(pages.length, 1, 'renders one page div');

  const page = pages[0];
  assert.notOk(page.classList.contains('Polaris-Page--fullWidth'), 'does not apply full width class');
  assert.notOk(page.classList.contains('Polaris-Page--singleColumn'), 'does not apply single column class');

  const headers = findAll(headerSelector);
  assert.equal(headers.length, 1, 'renders one page header div');
  assert.notOk(headers[0].classList.contains('Polaris-Page__Header--hasSecondaryActions'), 'does not apply secondary actions class to header');

  const displayTextSelector = buildNestedSelector(
    headerSelector,
    'div.Polaris-Page__Title',
    'h1.Polaris-DisplayText.Polaris-DisplayText--sizeLarge'
  );
  const displayTexts = findAll(displayTextSelector);
  assert.equal(displayTexts.length, 1, 'renders one page header display text');
  const titleText = displayTexts[0].textContent.trim();
  assert.equal(titleText, 'This is the title', 'renders correct page header display text content');

  const contentWrapperSelector = buildNestedSelector(pageSelector, 'div.Polaris-Page__Content');
  const contentWrappers = findAll(contentWrapperSelector);
  assert.equal(contentWrappers.length, 1, 'renders one page content wrapper div');

  const contentSelector = buildNestedSelector(contentWrapperSelector, 'div.test-page-content');
  const contents = findAll(contentSelector);
  assert.equal(contents.length, 1, 'renders one content div');

  const contentText = contents[0].textContent.trim();
  assert.equal(contentText, 'This is some test content', 'renders correct content');

  assert.notOk(page.classList.contains('Polaris-Page--fullWidth'), 'fullWidth unset - does not apply fullWidth class');
  this.set('fullWidth', true);
  assert.ok(page.classList.contains('Polaris-Page--fullWidth'), 'fullWidth set - applies fullWidth class');

  assert.notOk(page.classList.contains('Polaris-Page--singleColumn'), 'singleColumn unset - does not apply singleColumn class');
  this.set('singleColumn', true);
  assert.ok(page.classList.contains('Polaris-Page--singleColumn'), 'singleColumn set - applies singleColumn class');

  let header = headers[0];
  assert.notOk(header.classList.contains('Polaris-Page__Title--hidden'), 'titleHidden unset - does not apply titleHidden class');
  this.set('titleHidden', true);
  assert.ok(header.classList.contains('Polaris-Page__Title--hidden'), 'titleHidden set - applies titleHidden class');
});

test('it handles primary action correctly when supplied', function(assert) {
  let primaryActionFired = false;
  this.on('primaryActionFired', () => {
    primaryActionFired = true;
  });
  this.setProperties({
    primaryActionDisabled: true,
    primaryActionLoading: false,
  });

  this.render(hbs`
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

  const primaryButtonSelector = buildNestedSelector(
    'div.Polaris-Page',
    'div.Polaris-Page__Header',
    'div.Polaris-Page__MainContent',
    'div.Polaris-Page__TitleAndActions',
    'div.Polaris-Page__Actions',
    'div.Polaris-Page__PrimaryAction',
    'button.Polaris-Button.Polaris-Button--primary'
  );

  const primaryButtons = findAll(primaryButtonSelector);
  assert.equal(primaryButtons.length, 1, 'renders one primary button');
  const primaryButton = primaryButtons[0];
  const primaryButtonText = primaryButton.textContent.trim();
  assert.equal(primaryButtonText, 'Take action!', 'uses correct text on primary button');

  assert.ok(primaryButton.disabled, 'primary action button is initially disabled');
  assert.notOk(primaryButton.classList.contains('Polaris-Button--loading'), 'primary action button is not initially in loading state');

  this.setProperties({
    primaryActionDisabled: false,
    primaryActionLoading: true,
  });
  assert.ok(primaryButton.classList.contains('Polaris-Button--loading'), 'primary action button goes into loading state');

  this.set('primaryActionLoading', false);
  assert.notOk(primaryButton.disabled, 'primary action button becomes enabled');
  assert.notOk(primaryActionFired, 'hasn\'t fired primary action before clicking button');

  click(primaryButtonSelector);
  return wait().then(() => {
    assert.ok(primaryActionFired, 'fires primary action on click');
  });
});

test('it handles secondary actions correctly when supplied', function(assert) {
  let secondaryAction1Fired = false;
  this.on('secondaryAction1', () => {
    secondaryAction1Fired = true;
  });
  let secondaryAction2Fired = false;
  this.on('secondaryAction2', () => {
    secondaryAction2Fired = true;
  });

  this.render(hbs`
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

  const header = find(headerSelector);
  assert.ok(header.classList.contains('Polaris-Page__Header--hasSecondaryActions'), 'applies secondary actions class');

  const secondaryActionsWrapperSelector = buildNestedSelector(
    headerSelector,
    'div.Polaris-Page__Actions',
    'div.Polaris-Page__SecondaryActions',
    'div.Polaris-Page__IndividualActions'
  );
  const secondaryActionsButtonSelector = buildNestedSelector(
    secondaryActionsWrapperSelector,
    'button.Polaris-Page__Action'
  );

  const secondaryButtons = findAll(secondaryActionsButtonSelector);
  assert.equal(secondaryButtons.length, 2, 'renders two secondary buttons');

  assert.equal(secondaryButtons[0].textContent.trim(), 'First secondary action', 'first secondary action - uses correct text on button');
  assert.equal(secondaryButtons[1].textContent.trim(), 'Second secondary action', 'second secondary action - uses correct text on button');

  assert.notOk(secondaryAction1Fired, 'first secondary action - not fired before clicking button');
  assert.notOk(secondaryAction2Fired, 'second secondary action - not fired before clicking button');

  const focussedSecondaryButtonSelector = `${ secondaryActionsButtonSelector }:focus`;
  let secondaryActionsWrapper = find(secondaryActionsWrapperSelector);
  click('button:first-child', secondaryActionsWrapper);
  return wait().then(() => {
    assert.ok(secondaryAction1Fired, 'first secondary action - fired after clicking button');
    assert.notOk(secondaryAction2Fired, 'second secondary action - not fired after clicking first button');

    assert.notOk(find(focussedSecondaryButtonSelector), 'no focussed buttons after clicking first secondary action');

    click('button:last-child', secondaryActionsWrapper);
    return wait();
  }).then(() => {
    assert.ok(secondaryAction2Fired, 'second secondary action - fired after clicking button');
    assert.notOk(find(focussedSecondaryButtonSelector), 'no focussed buttons after clicking second secondary action');
  });
});

test('it renders action icons correctly', function(assert) {
  this.render(hbs`
    {{polaris-page
      title="This is the title"
      secondaryActions=(array
        (hash
          text="First secondary action"
          icon="add"
        )
        (hash
          text="Second secondary action"
          icon="cancel"
        )
      )
    }}
  `);

  const secondaryActionsSelector = buildNestedSelector(
    'div.Polaris-Page',
    'div.Polaris-Page__Header',
    'div.Polaris-Page__Actions',
    'div.Polaris-Page__SecondaryActions',
    'div.Polaris-Page__IndividualActions',
    'button.Polaris-Page__Action',
    'span.Polaris-Page__ActionContent'
  );
  const secondaryActions = findAll(secondaryActionsSelector);
  assert.equal(secondaryActions.length, 2, 'renders two secondary actions');

  const secondaryActionIconSelector = buildNestedSelector(
    secondaryActionsSelector,
    'span.Polaris-Page__ActionIcon',
    'span.Polaris-Icon',
    'svg'
  );
  const secondaryActionIcons = findAll(secondaryActionIconSelector);
  assert.equal(secondaryActionIcons.length, 2, 'renders two secondary action icons');
  assert.equal(secondaryActionIcons[0].dataset.iconSource, 'polaris/add', 'first secondary action icon - renders the correct icon');
  assert.equal(secondaryActionIcons[1].dataset.iconSource, 'polaris/cancel', 'second secondary action icon - renders the correct icon');
});

test('it handles breadcrumbs correctly', function(assert) {
  this.render(hbs`{{polaris-page title="This is a page" breadcrumbs=breadcrumbs}}`);

  // Test before setting breadcrumbs.
  const header = find(headerSelector);
  const headerWithBreadcrumbsClass = 'Polaris-Page__Header--hasBreadcrumbs';
  assert.ok(header, 'without breadcrumbs - renders header');
  assert.notOk(header.classList.contains(headerWithBreadcrumbsClass), 'without breadcrumbs - does not apply hasBreadcrumbs class');

  const navigationSelector = buildNestedSelector(headerSelector, 'div.Polaris-Page__Navigation');
  const navigations = findAll(navigationSelector);
  assert.equal(navigations.length, 0, 'without breadcrumbs - does not render navigation div');

  // Add the breadcrumbs.
  this.set('breadcrumbs', [
    {
      text: 'Go back',
      route: 'home'
    },
    {
      text: 'No, really!',
      route: 'home.the-beginning',
      models: [
        { id: 13 },
        27,
      ],
    }
  ]);

  assert.ok(header.classList.contains(headerWithBreadcrumbsClass), 'with breadcrumbs - applies hasBreadcrumbs class');

  // Check the breadcrumbs rendered.
  const breadcrumbLinkSelector = buildNestedSelector(
    navigationSelector,
    'nav[role="navigation"]',
    'a.Polaris-Breadcrumbs__Breadcrumb'
  );
  const breadcrumbLinks = findAll(breadcrumbLinkSelector)
  assert.equal(breadcrumbLinks.length, 1, 'with breadcrumbs - renders 1 breadcrumb');

  // Check the last breadcrumb in the list was rendered.
  const iconSelector = buildNestedSelector('span.Polaris-Breadcrumbs__Icon', 'span.Polaris-Icon');
  const contentSelector = 'span.Polaris-Breadcrumbs__Content';

  let breadcrumbLink = breadcrumbLinks[0];
  assert.equal(breadcrumbLink.href, `${window.location.origin}/home/the-beginning/13/27`, 'breadcrumb has href of last breadcrumb in list');
  assert.equal(breadcrumbLink.dataset.polarisUnstyled, 'true', 'breadcrumb has data-polaris-unstyled attribute');

  let contents = findAll(contentSelector, breadcrumbLink);
  assert.equal(contents.length, 1, 'breadcrumb renders content');
  assert.equal(contents[0].textContent.trim(), 'No, really!', 'breadcrumb renders text from last breadcrumb in list');

  let icons = findAll(iconSelector, breadcrumbLink);
  assert.equal(icons.length, 1, 'breadcrumb renders icon');
});
