import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import stubRouting from '../../helpers/stub-routing';

const availableRoutes = [
  'home',
  'home.the-beginning',
];

moduleForComponent('polaris-page', 'Integration | Component | polaris page', {
  integration: true,
  setup() {
    stubRouting(this.registry, availableRoutes);
  }
});

const pageSelector = 'div.Polaris-Page';
const headerSelector = buildNestedSelector(pageSelector, 'div.Polaris-Page__Header');

test('it renders the page correctly', function(assert) {
  this.set('fullWidth', false);
  this.render(hbs`
    {{#polaris-page
      title="This is the title"
      fullWidth=fullWidth
    }}
      <div class="test-page-content">This is some test content</div>
    {{/polaris-page}}`
  );

  const pages = findAll(pageSelector);
  assert.equal(pages.length, 1, 'renders one page div');

  const page = pages[0];
  assert.notOk(page.classList.contains('Polaris-Page--fullWidth'), 'renders normal-width page');

  const headers = findAll(headerSelector);
  assert.equal(headers.length, 1, 'renders one page header div');

  const displayTextSelector = buildNestedSelector(headerSelector, 'h1.Polaris-DisplayText.Polaris-DisplayText--sizeLarge');
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

  this.set('fullWidth', true);
  assert.ok(page.classList.contains('Polaris-Page--fullWidth'), 'honours fullWidth flag');
});

test('it handles primary action correctly when a primary action is supplied', function(assert) {
  let primaryActionFired = false;
  this.on('primaryActionFired', () => {
    primaryActionFired = true;
  });
  this.set('primaryActionDisabled', true);

  this.render(hbs`
    {{polaris-page
      title="This is the title"
      primaryAction=(hash
        text="Take action!"
        action=(action "primaryActionFired")
        disabled=primaryActionDisabled
      )
    }}
  `);

  const primaryButtonSelector = buildNestedSelector(
    'div.Polaris-Page',
    'div.Polaris-Page__Header',
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
  this.set('primaryActionDisabled', false);
  assert.notOk(primaryButton.disabled, 'primary action button becomes enabled');

  assert.notOk(primaryActionFired, 'hasn\'t fired primary action before clicking button');
  click(primaryButtonSelector)
  .then(() => {
    assert.ok(primaryActionFired, 'fires primary action on click');
  });
});

skip('it handles breadcrumbs correctly', function(assert) {
  this.render(hbs`{{polaris-page breadcrumbs=breadcrumbs}}`);

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
      content: 'Go back',
      route: 'home'
    },
    {
      content: 'No, really!',
      route: 'home.the-beginning'
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
  assert.equal(breadcrumbLinks.length, 2, 'with breadcrumbs - renders 2 breadcrumbs');

  // Check the first breadcrumb.
  const iconSelector = buildNestedSelector('span.Polaris-Breadcrumbs__Icon', 'span.Polaris-Icon');
  let breadcrumbLink = breadcrumbLinks[0];
  assert.equal(breadcrumbLink.href, `${window.location.origin}/home`, 'first breadcrumb - has correct href');
  assert.equal(breadcrumbLink.dataset.polarisUnstyled, 'true', 'first breadcrumb - has data-polaris-unstyled attribute');
  assert.equal(breadcrumbLink.textContent.trim(), 'Go back', 'first breadcrumb - renders correct text');

  let icons = findAll(iconSelector, breadcrumbLink);
  assert.equal(icons.length, 1, 'first breadcrumb - renders icon');

  // Check the second breadcrumb.
  breadcrumbLink = breadcrumbLinks[1];
  assert.equal(breadcrumbLink.href, `${window.location.origin}/home/the-beginning`, 'second breadcrumb - has correct href');
  assert.equal(breadcrumbLink.dataset.polarisUnstyled, 'true', 'second breadcrumb - has data-polaris-unstyled attribute');
  assert.equal(breadcrumbLink.textContent.trim(), 'No, really!', 'second breadcrumb - renders correct text');

  icons = findAll(iconSelector, breadcrumbLink);
  assert.equal(icons.length, 1, 'second breadcrumb - renders icon');
});
