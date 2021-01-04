import { hbs } from 'ember-cli-htmlbars';
import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

const bannerSelector = 'div.Polaris-Banner';
const iconSelector = 'div.Polaris-Banner__Ribbon > span.Polaris-Icon';
const headingSelector = 'div.Polaris-Banner__Heading';
const headingTitleSelector = 'p.Polaris-Heading';
const contentSelector = 'div.Polaris-Banner__Content';
const dismissSelector = 'div.Polaris-Banner__Dismiss';
const actionsSelector = 'div.Polaris-Banner__Actions';

module('Integration | Component | polaris banner', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  test('it renders correctly in basic usage', async function (assert) {
    await render(hbs`{{polaris-banner}}`);

    let banner = assert.dom(bannerSelector);
    banner.exists('inline-mode - banner exists');
    banner.hasText('', 'inline-mode - banner is empty, by default');
    banner.hasAttribute('tabIndex', '0', 'inline-mode - has correct tabIndex');
    banner.hasAttribute(
      'role',
      'status',
      'inline-mode - has correct role attribute'
    );
    banner.hasAttribute(
      'aria-live',
      'polite',
      'inline-mode - has correct aria-live attribute'
    );

    let bannerIcon = assert.dom(`${bannerSelector} ${iconSelector}`);

    bannerIcon.exists('inline-mode - has icon');
    bannerIcon.hasClass(
      'Polaris-Icon--colorInkLighter',
      'inline-mode - icon has inkLighter color'
    );
    bannerIcon.hasClass(
      'Polaris-Icon--hasBackdrop',
      'inline-mode - icon has backdrop'
    );

    assert
      .dom(`${iconSelector} svg`)
      .hasAttribute(
        'data-icon-source',
        'polaris/flag',
        'inline-mode - default icon is polaris/flag'
      );

    // Template block usage:
    await render(hbs`
      {{#polaris-banner}}
        template block text
      {{/polaris-banner}}
    `);

    banner = assert.dom(bannerSelector);
    banner.exists('block-mode - banner exists');
    banner.hasText(
      'template block text',
      'block-mode - banner has correct content'
    );
  });

  test('it renders banner heading correctly', async function (assert) {
    await render(hbs`{{polaris-banner title=title}}`);

    let bannerHeadingSelector = `${bannerSelector} ${headingSelector}`;
    let banner = assert.dom(bannerSelector);
    let heading = assert.dom(bannerHeadingSelector);

    heading.doesNotExist('banner without title - no heading rendered');
    banner.doesNotHaveAttribute(
      'aria-labelledby',
      'banner without title - no aria-labelledby for banner'
    );

    let title = 'Your shipping label is ready to print.';
    this.set('title', title);

    heading.exists('banner with title - heading rendered');
    assert
      .dom(`${headingSelector} ${headingTitleSelector}`)
      .hasText(title, 'banner with title - has correct title');

    banner.hasAttribute(
      'aria-labelledby',
      this.element.querySelector(bannerHeadingSelector).getAttribute('id'),
      "banner with title - has the banner's aria-labelledby as the heading Id"
    );
  });

  test('it handles banner content correctly', async function (assert) {
    let contentText =
      'Use your finance report to get detailed information about your business.';

    await render(hbs`{{polaris-banner text=contentText}}`);

    let bannerContentSelector = `${bannerSelector} ${contentSelector}`;
    let banner = assert.dom(bannerSelector);
    let content = assert.dom(bannerContentSelector);
    content.doesNotExist('banner without content - no content rendered');

    banner.doesNotHaveAttribute(
      'aria-describedby',
      'banner without content - no aria-describedby for banner'
    );

    this.set('contentText', contentText);

    content.exists('banner with content - content rendered');
    content.hasText(contentText, 'banner with content - has correct content');

    banner.hasAttribute(
      'aria-describedby',
      this.element.querySelector(bannerContentSelector).getAttribute('id'),
      "banner with content - has the banner's aria-describedby as the content Id"
    );

    // Block-mode
    await render(hbs`
      {{#polaris-banner}}
        <p>{{contentText}}</p>
      {{/polaris-banner}}
    `);

    banner = assert.dom(bannerSelector);
    content = assert.dom(bannerContentSelector);
    content.exists('banner with content (block) - content rendered');
    content.hasText(
      contentText,
      'banner with content (block) - has correct content'
    );

    banner.hasAttribute(
      'aria-describedby',
      this.element.querySelector(bannerContentSelector).getAttribute('id'),
      "banner with content (block) - has the banner's aria-describedby as the content Id"
    );
  });

  test('it handles banner status correctly', async function (assert) {
    await render(hbs`{{polaris-banner status=status}}`);

    let banner = assert.dom(bannerSelector);
    banner.doesNotHaveClass(
      'Polaris-Banner--status',
      'banner without status - has no status class'
    );

    let bannerIcon = assert.dom(`${bannerSelector} ${iconSelector}`);
    let iconSvg = assert.dom(`${iconSelector} svg`);

    this.set('status', 'success');
    banner.hasClass(
      'Polaris-Banner--statusSuccess',
      'banner with success status - has correct class'
    );

    banner.hasAttribute(
      'role',
      'status',
      'banner with success status - has correct role attribute'
    );
    bannerIcon.hasClass(
      'Polaris-Icon--colorGreenDark',
      'banner with success status - has greenDark icon color'
    );

    iconSvg.hasAttribute(
      'data-icon-source',
      'polaris/circle-check-mark',
      'banner with success status - has icon polaris/circle-check-mark'
    );

    this.set('status', 'info');
    banner.hasClass(
      'Polaris-Banner--statusInfo',
      'banner with info status - has correct class'
    );

    banner.hasAttribute(
      'role',
      'status',
      'banner with info status - has correct role attribute'
    );
    bannerIcon.hasClass(
      'Polaris-Icon--colorTealDark',
      'banner with info status - has tealDark icon color'
    );

    iconSvg.hasAttribute(
      'data-icon-source',
      'polaris/circle-information',
      'banner with info status - has icon polaris/circle-information'
    );

    this.set('status', 'warning');
    banner.hasClass(
      'Polaris-Banner--statusWarning',
      'banner with warning status - has correct class'
    );

    banner.hasAttribute(
      'role',
      'alert',
      'banner with warning status - has correct role attribute'
    );
    bannerIcon.hasClass(
      'Polaris-Icon--colorYellowDark',
      'banner with warning status - has yellowDark icon color'
    );

    iconSvg.hasAttribute(
      'data-icon-source',
      'polaris/circle-alert',
      'banner with warning status - has icon polaris/circle-alert'
    );

    this.set('status', 'critical');
    banner.hasClass(
      'Polaris-Banner--statusCritical',
      'banner with critical status - has correct class'
    );

    banner.hasAttribute(
      'role',
      'alert',
      'banner with critical status - has correct role attribute'
    );
    bannerIcon.hasClass(
      'Polaris-Icon--colorRedDark',
      'banner with critical status - has redDark icon color'
    );

    iconSvg.hasAttribute(
      'data-icon-source',
      'polaris/circle-barred',
      'banner with critical status - has icon polaris/circle-barred'
    );
  });

  test('it handles dismissable banner correctly', async function (assert) {
    await render(hbs`{{polaris-banner}}`);

    let banner = assert.dom(bannerSelector);
    let dismissWrapper = assert.dom(`${bannerSelector} ${dismissSelector}`);

    banner.hasNoClass(
      'Polaris-Banner--hasDismiss',
      'banner non-dismissable - does not have dismissable class'
    );

    dismissWrapper.doesNotExist(
      'banner non-dismissable - does not render the dismiss element'
    );

    let dismissed = false;
    this.dismiss = () => (dismissed = true);

    await render(hbs`{{polaris-banner onDismiss=(action dismiss)}}`);

    banner = assert.dom(bannerSelector);
    dismissWrapper = assert.dom(`${bannerSelector} ${dismissSelector}`);
    let dismissBtnSelector = `${bannerSelector} ${dismissSelector} button.Polaris-Button.Polaris-Button--plain.Polaris-Button--iconOnly`;
    let dismissBtn = assert.dom(dismissBtnSelector);
    banner.hasClass(
      'Polaris-Banner--hasDismiss',
      'banner dismissable - has dismissable class'
    );

    dismissWrapper.exists(
      'banner dismissable - does render the dismiss element'
    );
    dismissBtn.exists('banner dismissable - has correct dismiss button');

    dismissBtn.hasAttribute(
      'aria-label',
      'Dismiss notification',
      'banner dismissable - dismiss button has correct aria-label'
    );

    await click(dismissBtnSelector);

    assert.ok(dismissed, 'banner dismissable - fires dismiss action');
  });

  test('it supports `primaryAction` and `secondaryAction`', async function (assert) {
    assert.expect(14);

    await render(hbs`{{polaris-banner text="Some content text"}}`);

    let bannerContentSelector = `${bannerSelector} ${contentSelector}`;
    let bannerActionsSelector = `${bannerContentSelector} ${actionsSelector}`;

    assert
      .dom(bannerActionsSelector)
      .doesNotExist(
        'banner without actions - does not render the actions container'
      );

    this.set('primaryAction', () =>
      assert.ok(true, 'triggers primaryAction handler')
    );
    this.set('secondaryAction', () =>
      assert.ok(true, 'triggers secondaryAction handler')
    );

    await render(hbs`{{polaris-banner
      secondaryAction=(hash text="View" onAction=(action secondaryAction))
    }}`);

    assert
      .dom(`${bannerContentSelector} ${actionsSelector}`)
      .doesNotExist(
        'banner with `secondaryAction` only - does not render the actions container'
      );

    await render(hbs`{{polaris-banner
      primaryAction=(hash text="Edit" onAction=(action primaryAction))
    }}`);

    let btnGroupSelector = `${actionsSelector} div.Polaris-ButtonGroup`;
    let primaryActionBtnSelector = `${btnGroupSelector} div.Polaris-ButtonGroup__Item > div.Polaris-Banner__PrimaryAction > button.Polaris-Button.Polaris-Button--outline`;
    let secondaryActionBtnSelector = `${btnGroupSelector} div.Polaris-ButtonGroup__Item > button.Polaris-Banner__SecondaryAction`;
    assert
      .dom(bannerActionsSelector)
      .exists('banner with `action` only - renders actions container');
    assert
      .dom(primaryActionBtnSelector)
      .exists('banner with `action` only - renders `action` button');

    assert
      .dom(secondaryActionBtnSelector)
      .doesNotExist(
        'banner with `action` only - does not render `secondaryAction` button'
      );

    this.setProperties({
      mainActionLoading: true,
      mainActionDisabled: false,
    });

    await render(hbs`{{polaris-banner
      primaryAction=(hash
        text="Edit"
        loading=mainActionLoading
        disabled=mainActionDisabled
        onAction=(action primaryAction)
      )
      secondaryAction=(hash
        text="View"
        onAction=(action secondaryAction)
      )
    }}`);

    let primaryActionBtn = assert.dom(primaryActionBtnSelector);
    let secondaryActionBtn = assert.dom(secondaryActionBtnSelector);
    primaryActionBtn.exists('banner with actions - renders `action` button');
    primaryActionBtn.hasClass(
      'Polaris-Button--loading',
      'banner with actions - `action` button starts in loading state'
    );

    this.setProperties({
      mainActionLoading: false,
      mainActionDisabled: true,
    });
    primaryActionBtn.hasNoClass(
      'Polaris-Button--loading',
      'banner with actions - `action` button exits loading state'
    );
    primaryActionBtn.isDisabled(
      'banner with actions - `action` button becomes disabled'
    );
    primaryActionBtn.hasText(
      'Edit',
      'banner with actions - renders correct `action` button text'
    );

    secondaryActionBtn.exists(
      'banner with actions - renders `secondaryAction` button'
    );
    secondaryActionBtn.hasText(
      'View',
      'banner with actions - renders correct `secondaryAction` button text'
    );

    this.setProperties({
      mainActionLoading: false,
      mainActionDisabled: false,
    });

    await click(primaryActionBtnSelector);
    await click(secondaryActionBtnSelector);
  });

  test('it has backwards support for `action` as `primaryAction`', async function (assert) {
    this.set('primaryAction', () =>
      assert.ok(true, 'triggers primaryAction handler')
    );

    await render(hbs`{{polaris-banner
      action=(hash text="Edit" onAction=(action primaryAction))
    }}`);

    let btnGroupSelector = `${actionsSelector} div.Polaris-ButtonGroup`;
    let primaryActionBtnSelector = `${btnGroupSelector} div.Polaris-ButtonGroup__Item > div.Polaris-Banner__PrimaryAction > button.Polaris-Button.Polaris-Button--outline`;

    assert
      .dom(primaryActionBtnSelector)
      .exists('banner with actions - renders `action` button');
    assert
      .dom(primaryActionBtnSelector)
      .hasText(
        'Edit',
        'banner with actions - renders correct `action` button text'
      );

    await click(primaryActionBtnSelector);
  });
});
