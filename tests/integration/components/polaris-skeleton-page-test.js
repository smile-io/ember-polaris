import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris skeleton page', function(hooks) {
  setupRenderingTest(hooks);

  const pageSelector = '[data-test-skeleton-page]';
  const headerSelector = '[data-test-skeleton-page-header]';
  const contentSelector = '[data-test-skeleton-page-content]';
  const titleAndPrimarySelector =
    '[data-test-skeleton-page-title-primary-action]';
  const titleSelector = '[data-test-skeleton-page-title]';
  const titleTextSelector = '[data-test-skeleton-page-title-text]';
  const breadcrumbsSelector = '[data-test-skeleton-page-breadcrumbs]';
  const breadcrumbSelector = '[data-test-skeleton-page-breadcrumb]';
  const primaryActionSelector = '[data-test-skeleton-page-primary-action]';
  const secondaryActionsSelector = '[data-test-skeleton-page-actions]';
  const secondaryActionSelector = '[data-test-skeleton-page-action]';

  const pageTitleSelector = buildNestedSelector(
    headerSelector,
    titleAndPrimarySelector,
    titleSelector
  );

  const pagePrimaryActionSelector = buildNestedSelector(
    headerSelector,
    titleAndPrimarySelector,
    primaryActionSelector
  );

  const pageSecondaryActionSelector = buildNestedSelector(
    headerSelector,
    secondaryActionsSelector,
    secondaryActionSelector
  );

  test('it renders a basic skeleton page', async function(assert) {
    await render(hbs`{{polaris-skeleton-page}}`);

    assert.dom(pageSelector).exists('renders skeleton page');
    assert
      .dom(buildNestedSelector(pageSelector, headerSelector))
      .exists('renders skeleton page header');
    assert
      .dom(buildNestedSelector(pageSelector, contentSelector))
      .exists('renders skeleton page content');
  });

  test('it renders the correct page content', async function(assert) {
    await render(
      hbs`{{polaris-skeleton-page text="Skeleton page - inline content"}}`
    );

    assert
      .dom(contentSelector)
      .hasText(
        'Skeleton page - inline content',
        'inline usage - renders the correct skeleton page content'
      );

    await render(hbs`
      {{#polaris-skeleton-page}}
        <p>Skeleton page - block content</p>
      {{/polaris-skeleton-page}}
    `);

    assert
      .dom(contentSelector)
      .hasText(
        'Skeleton page - block content',
        'block usage - renders the correct skeleton page content'
      );
  });

  test('it renders the page at the correct width', async function(assert) {
    await render(
      hbs`{{polaris-skeleton-page fullWidth=fullWidth singleColumn=singleColumn}}`
    );

    assert
      .dom(pageSelector)
      .hasNoClass(
        'Polaris-SkeletonPage--fullWidth',
        'fullWidth unspecified - does not apply full width class'
      );
    assert
      .dom(pageSelector)
      .hasNoClass(
        'Polaris-SkeletonPage--singleColumn',
        'fullWidth unspecified - does not apply single column class'
      );

    this.set('fullWidth', true);
    assert
      .dom(pageSelector)
      .hasClass(
        'Polaris-SkeletonPage--fullWidth',
        'fullWidth true - applies full width class'
      );

    this.set('singleColumn', true);
    assert
      .dom(pageSelector)
      .hasClass(
        'Polaris-SkeletonPage--singleColumn',
        'singleColumn true - applies single column class'
      );
  });

  test('it renders the page title correctly', async function(assert) {
    await render(hbs`{{polaris-skeleton-page title=title}}`);

    // undefined title -> renders large skeleton display text.
    assert.dom(pageTitleSelector).exists('unspecified title - renders title');
    assert
      .dom(buildNestedSelector(titleSelector, titleTextSelector))
      .exists('unspecified title - renders title as skeleton title');
    assert
      .dom(titleTextSelector)
      .hasClass(
        'Polaris-SkeletonDisplayText--sizeLarge',
        'unspecified title - renders large skeleton title'
      );

    // Text title -> renders large display text.
    this.set('title', 'Spooky Skeleton Page');
    assert.dom(pageTitleSelector).exists('title specified - renders title');
    assert
      .dom(buildNestedSelector(titleSelector, titleTextSelector))
      .exists('title specified - renders title');
    assert
      .dom(titleTextSelector)
      .hasText(
        'Spooky Skeleton Page',
        'title specified - renders correct title text'
      );
    assert
      .dom(titleTextSelector)
      .hasClass(
        'Polaris-DisplayText--sizeLarge',
        'title specified - renders title text as large display text'
      );
  });

  test('it renders breadcrumbs correctly', async function(assert) {
    await render(hbs`{{polaris-skeleton-page breadcrumbs=breadcrumbs}}`);

    assert
      .dom(headerSelector)
      .hasNoClass(
        'Polaris-SkeletonPage__Header--hasBreadcrumbs',
        'breadcrumbs false - does not apply header breadcrumbs class'
      );
    assert
      .dom(buildNestedSelector(headerSelector, breadcrumbsSelector))
      .doesNotExist('breadcrumbs false - does not render breadcrumbs');

    this.set('breadcrumbs', true);
    assert
      .dom(headerSelector)
      .hasClass(
        'Polaris-SkeletonPage__Header--hasBreadcrumbs',
        'breadcrumbs true - applies header breadcrumbs class'
      );
    assert
      .dom(buildNestedSelector(headerSelector, breadcrumbsSelector))
      .exists('breadcrumbs true - renders breadcrumbs');
    assert
      .dom(buildNestedSelector(breadcrumbsSelector, breadcrumbSelector))
      .exists('breadcrumbs true - renders one skeleton breadcrumb');
  });

  test('it renders primary action correctly', async function(assert) {
    this.set('primaryAction', false);

    await render(hbs`{{polaris-skeleton-page primaryAction=primaryAction}}`);

    assert
      .dom(pagePrimaryActionSelector)
      .doesNotExist(
        'primaryAction unspecified - does not render a primary action'
      );

    this.set('primaryAction', true);
    assert
      .dom(pagePrimaryActionSelector)
      .exists('primaryAction true - it renders a primary action');
  });

  test('it renders secondary actions correctly', async function(assert) {
    await render(
      hbs`{{polaris-skeleton-page secondaryActions=secondaryActions}}`
    );

    assert
      .dom(headerSelector)
      .hasNoClass(
        'Polaris-SkeletonPage__Header--hasSecondaryActions',
        'secondaryActions unspecified - does not apply secondary actions class'
      );
    assert
      .dom(pageSecondaryActionSelector)
      .doesNotExist(
        'secondaryActions unspecified - does not render any secondary actions'
      );

    this.set('secondaryActions', 3);
    assert
      .dom(headerSelector)
      .hasClass(
        'Polaris-SkeletonPage__Header--hasSecondaryActions',
        'secondaryActions specified - applies secondary actions class'
      );
    assert
      .dom(pageSecondaryActionSelector)
      .exists(
        { count: 3 },
        'secondaryActions specified - renders the correct number of secondary actions'
      );
  });
});
