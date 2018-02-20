import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import stubMathRandom from '../../stubbers/math/random';

moduleForComponent('polaris-skeleton-page', 'Integration | Component | polaris skeleton page', {
  integration: true
});

const pageSelector = 'div.Polaris-SkeletonPage__Page[role="status"][aria-label="Page loading"]';
const headerSelector = buildNestedSelector(
  pageSelector,
  'div.Polaris-SkeletonPage__Header'
);
const contentSelector = buildNestedSelector(
  pageSelector,
  'div.Polaris-SkeletonPage__Content'
);

test('it renders a basic skeleton page', function(assert) {
  this.render(hbs`{{polaris-skeleton-page}}`);

  let pages = findAll(pageSelector);
  assert.equal(pages.length, 1, 'renders one skeleton page');

  let headers = findAll(headerSelector);
  assert.equal(headers.length, 1, 'renders one skeleton page header container');

  let contents = findAll(contentSelector);
  assert.equal(contents.length, 1, 'renders one skeleton page content wrapper');
});

test('it renders the correct page content', function(assert) {
  this.render(hbs`{{polaris-skeleton-page text="Skeleton page - inline content"}}`);

  let content = find(contentSelector);
  assert.equal(content.textContent.trim(), 'Skeleton page - inline content', 'inline usage - renders the correct skeleton page content');

  this.render(hbs`
    {{#polaris-skeleton-page}}
      <p id="block-content">Skeleton page - block content</p>
    {{/polaris-skeleton-page}}
  `);

  const blockContentSelector = buildNestedSelector(
    contentSelector,
    'p#block-content'
  );
  content = find(blockContentSelector);
  assert.equal(content.textContent.trim(), 'Skeleton page - block content', 'block usage - renders the correct skeleton page content');
});

test('it renders the page at the correct width', function(assert) {
  this.render(hbs`{{polaris-skeleton-page fullWidth=fullWidth}}`);

  let page = find(pageSelector);
  assert.notOk(page.classList.contains('Polaris-SkeletonPage--fullWidth'), 'fullWidth unspecified - does not apply full width class');

  this.set('fullWidth', true);
  assert.ok(page.classList.contains('Polaris-SkeletonPage--fullWidth'), 'fullWidth true - applies full width class');

  this.set('fullWidth', false);
  assert.notOk(page.classList.contains('Polaris-SkeletonPage--fullWidth'), 'fullWidth false - does not apply full width class');
});

test('it renders the page title correctly', function(assert) {
  this.render(hbs`{{polaris-skeleton-page title=title}}`);

  const titleSelector = buildNestedSelector(
    headerSelector,
    'div.Polaris-SkeletonPage__Title'
  );
  const skeletonTitleSelector = buildNestedSelector(
    titleSelector,
    'div.Polaris-SkeletonDisplayText__DisplayText.Polaris-SkeletonDisplayText--sizeLarge'
  );
  const realTitleSelector = buildNestedSelector(
    titleSelector,
    'h1.Polaris-DisplayText.Polaris-DisplayText--sizeLarge'
  );

  // undefined title -> renders large skeleton display text.
  let titles = findAll(titleSelector);
  assert.equal(titles.length, 1, 'unspecified title - renders one title');

  let skeletonTitles = findAll(skeletonTitleSelector);
  assert.equal(skeletonTitles.length, 1, 'unspecified title - renders one skeleton title');

  let realTitles = findAll(realTitleSelector);
  assert.equal(realTitles.length, 0, 'unspecified title - does not render any actual titles');

  // null title -> renders no title.
  this.set('title', null);
  titles = findAll(titleSelector);
  assert.equal(titles.length, 0, 'null title - does not render a title');

  // Text title -> renders large display text.
  this.set('title', 'Spooky Skeleton Page');
  titles = findAll(titleSelector);
  assert.equal(titles.length, 1, 'title specified - renders one title');

  skeletonTitles = findAll(skeletonTitleSelector);
  assert.equal(skeletonTitles.length, 0, 'title specified - does not render any skeleton titles');

  realTitles = findAll(realTitleSelector);
  assert.equal(realTitles.length, 1, 'title specified - renders one actual title');
  assert.equal(realTitles[0].textContent.trim(), 'Spooky Skeleton Page', 'title specified - renders the correct title');
});

test('it renders breadcrumbs correctly', function(assert) {
  // Stub Math.random so we know what width the breadcrumb should be.
  const mathRandomStubber = stubMathRandom(0.1);

  this.render(hbs`{{polaris-skeleton-page breadcrumbs=breadcrumbs}}`);

  const breadcrumbSelector = buildNestedSelector(
    headerSelector,
    'div.Polaris-SkeletonPage__Actions',
    'div.Polaris-SkeletonPage__Action'
  );
  const breadcrumbSkeletonTextSelector = buildNestedSelector(
    breadcrumbSelector,
    'div.Polaris-SkeletonBodyText__SkeletonBodyTextContainer',
    'div.Polaris-SkeletonBodyText'
  );

  let header = find(headerSelector);
  assert.notOk(header.classList.contains('Polaris-SkeletonPage__Header--hasBreadcrumbs'), 'breadcrumbs unspecified - does not apply breadcrumbs class');

  let breadcrumbs = findAll(breadcrumbSelector);
  assert.equal(breadcrumbs.length, 0, 'breadcrumbs unspecified - does not render any breadcrumbs');

  this.set('breadcrumbs', true);
  header = find(headerSelector);
  assert.ok(header.classList.contains('Polaris-SkeletonPage__Header--hasBreadcrumbs'), 'breadcrumbs specified - applies breadcrumbs class');

  breadcrumbs = findAll(breadcrumbSelector);
  assert.equal(breadcrumbs.length, 1, 'breadcrumbs specified - renders one breadcrumb');
  assert.equal(breadcrumbs[0].style.width, '64px', 'breadcrumbs specified - renders the breadcrumb with the correct width');

  let breadcrumbSkeletonTexts = findAll(breadcrumbSkeletonTextSelector);
  assert.equal(breadcrumbSkeletonTexts.length, 1, 'breadcrumbs specified - renders one skeleton breadcrumb text');

  mathRandomStubber.restore();
});

test('it renders secondary actions correctly', function(assert) {
  // Stub Math.random so we know what width the breadcrumb should be.
  const mathRandomStubber = stubMathRandom(0.7, 1, 0);

  this.render(hbs`{{polaris-skeleton-page secondaryActions=secondaryActions}}`);

  const secondaryActionSelector = buildNestedSelector(
    headerSelector,
    'div.Polaris-SkeletonPage__Actions',
    'div.Polaris-SkeletonPage__Action'
  );
  const secondaryActionSkeletonTextSelector = buildNestedSelector(
    'div.Polaris-SkeletonBodyText__SkeletonBodyTextContainer',
    'div.Polaris-SkeletonBodyText'
  );

  let header = find(headerSelector);
  assert.notOk(header.classList.contains('Polaris-SkeletonPage__Header--hasSecondaryActions'), 'secondaryActions unspecified - does not apply secondary actions class');

  let secondaryActions = findAll(secondaryActionSelector);
  assert.equal(secondaryActions.length, 0, 'secondaryActions unspecified - does not render any secondary actions');

  this.set('secondaryActions', 3);
  assert.ok(header.classList.contains('Polaris-SkeletonPage__Header--hasSecondaryActions'), 'secondaryActions specified - applies secondary actions class');

  secondaryActions = findAll(secondaryActionSelector);
  assert.equal(secondaryActions.length, 3, 'secondaryActions specified - renders the correct number of secondary actions');

  let expectedWidths = [ 88, 100, 60 ];
  secondaryActions.forEach((secondaryAction, index) => {
    assert.equal(secondaryAction.style.width, `${ expectedWidths[index] }px`, `secondary action ${ index + 1 } - renders the action with the correct width`);

    let secondaryActionSkeletonTexts = findAll(secondaryActionSkeletonTextSelector, secondaryAction);
    assert.equal(secondaryActionSkeletonTexts.length, 1, `secondary action ${ index + 1 } - renders one skeleton action text`);
  });

  mathRandomStubber.restore();
});
