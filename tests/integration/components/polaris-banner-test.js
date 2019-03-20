import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent(
  'polaris-banner',
  'Integration | Component | polaris banner',
  {
    integration: true,

    beforeEach() {
      this.register('component:svg-jar', MockSvgJarComponent);
    },
  }
);

const bannerSelector = 'div.Polaris-Banner';
const iconSelector = 'div.Polaris-Banner__Ribbon > span.Polaris-Icon';
const headingSelector = 'div.Polaris-Banner__Heading';
const headingTitleSelector = 'p.Polaris-Heading';
const contentSelector = 'div.Polaris-Banner__Content';
const dismissSelector = 'div.Polaris-Banner__Dismiss';
const actionsSelector = 'div.Polaris-Banner__Actions';

test('it renders correctly in basic usage', function(assert) {
  this.render(hbs`{{polaris-banner}}`);

  let banner = find(bannerSelector);
  assert.ok(banner, 'inline-mode - banner exists');
  assert.equal(
    banner.textContent.trim(),
    '',
    'inline-mode - banner is empty, by default'
  );
  assert.equal(banner.tabIndex, '0', 'inline-mode - has correct tabIndex');
  assert.equal(
    banner.getAttribute('role'),
    'status',
    'inline-mode - has correct role attribute'
  );
  assert.equal(
    banner.getAttribute('aria-live'),
    'polite',
    'inline-mode - has correct aria-live attribute'
  );

  let bannerIcon = find(iconSelector, banner);
  let iconSvg = find('svg', iconSelector);
  assert.ok(bannerIcon, 'inline-mode - has icon');
  assert.ok(
    bannerIcon.classList.contains('Polaris-Icon--colorInkLighter'),
    'inline-mode - icon has inkLighter color'
  );
  assert.ok(
    bannerIcon.classList.contains('Polaris-Icon--hasBackdrop'),
    'inline-mode - icon has backdrop'
  );
  assert.equal(
    iconSvg.dataset.iconSource,
    'polaris/flag',
    'inline-mode - default icon is polaris/flag'
  );

  // Template block usage:
  this.render(hbs`
    {{#polaris-banner}}
      template block text
    {{/polaris-banner}}
  `);

  banner = find(bannerSelector);
  assert.ok(banner, 'block-mode - banner exists');
  assert.equal(
    banner.textContent.trim(),
    'template block text',
    'block-mode - banner has correct content'
  );
});

test('it renders banner heading correctly', function(assert) {
  let title = 'Your shipping label is ready to print.';

  this.render(hbs`{{polaris-banner title=title}}`);

  let banner = find(bannerSelector);
  let heading = find(headingSelector, banner);
  assert.notOk(heading, 'banner without title - no heading rendered');
  assert.notOk(
    banner.getAttribute('aria-labelledby'),
    'banner without title - no aria-labelledby for banner'
  );

  this.set('title', title);

  heading = find(headingSelector, banner);
  let headingTitle = find(headingTitleSelector, heading);
  assert.ok(heading, 'banner with title - heading rendered');
  assert.equal(
    headingTitle.textContent.trim(),
    title,
    'banner with title - has correct title'
  );
  assert.ok(
    banner.hasAttribute('aria-labelledby'),
    'banner with title - has aria-labelledby attribute'
  );
  assert.equal(
    banner.getAttribute('aria-labelledby'),
    heading.getAttribute('id'),
    "banner with title - has the banner's aria-labelledby as the heading Id"
  );
});

test('it handles banner content correctly', function(assert) {
  let contentText =
    'Use your finance report to get detailed information about your business.';

  this.render(hbs`{{polaris-banner text=contentText}}`);

  let banner = find(bannerSelector);
  let content = find(contentSelector, banner);
  assert.notOk(content, 'banner without content - no content rendered');
  assert.notOk(
    banner.getAttribute('aria-describedby'),
    'banner without content - no aria-describedby for banner'
  );

  this.set('contentText', contentText);

  content = find(contentSelector, banner);
  assert.ok(content, 'banner with content - content rendered');
  assert.equal(
    content.textContent.trim(),
    contentText,
    'banner with content - has correct content'
  );
  assert.ok(
    banner.hasAttribute('aria-describedby'),
    'banner with content - has aria-describedby attribute'
  );
  assert.equal(
    banner.getAttribute('aria-describedby'),
    content.getAttribute('id'),
    "banner with content - has the banner's aria-describedby as the content Id"
  );

  // Block-mode
  this.render(hbs`
    {{#polaris-banner}}
      <p>{{contentText}}</p>
    {{/polaris-banner}}
  `);

  banner = find(bannerSelector);
  content = find(contentSelector, banner);
  assert.ok(content, 'banner with content (block) - content rendered');
  assert.equal(
    content.textContent.trim(),
    contentText,
    'banner with content (block) - has correct content'
  );
  assert.ok(
    banner.hasAttribute('aria-describedby'),
    'banner with content (block) - has aria-describedby attribute'
  );
  assert.equal(
    banner.getAttribute('aria-describedby'),
    content.getAttribute('id'),
    "banner with content (block) - has the banner's aria-describedby as the content Id"
  );
});

test('it handles banner status correctly', function(assert) {
  this.render(hbs`{{polaris-banner status=status}}`);

  let banner = find(bannerSelector);
  banner.classList.forEach((bannerClass) =>
    assert.notOk(
      /Polaris-Banner--status/.test(bannerClass),
      'banner without status - has no status class'
    )
  );

  let bannerIcon = find(iconSelector, banner);
  let iconSvg = find('svg', iconSelector);

  this.set('status', 'success');
  assert.ok(
    banner.classList.contains('Polaris-Banner--statusSuccess'),
    'banner with success status - has correct class'
  );
  assert.equal(
    banner.getAttribute('role'),
    'status',
    'banner with success status - has correct role attribute'
  );
  assert.ok(
    bannerIcon.classList.contains('Polaris-Icon--colorGreenDark'),
    'banner with success status - has greenDark icon color'
  );
  assert.equal(
    iconSvg.dataset.iconSource,
    'polaris/circle-check-mark',
    'banner with success status - has icon polaris/circle-check-mark'
  );

  this.set('status', 'info');
  assert.ok(
    banner.classList.contains('Polaris-Banner--statusInfo'),
    'banner with info status - has correct class'
  );
  assert.equal(
    banner.getAttribute('role'),
    'status',
    'banner with info status - has correct role attribute'
  );
  assert.ok(
    bannerIcon.classList.contains('Polaris-Icon--colorTealDark'),
    'banner with info status - has tealDark icon color'
  );
  assert.equal(
    iconSvg.dataset.iconSource,
    'polaris/circle-information',
    'banner with info status - has icon polaris/circle-information'
  );

  this.set('status', 'warning');
  assert.ok(
    banner.classList.contains('Polaris-Banner--statusWarning'),
    'banner with warning status - has correct class'
  );
  assert.equal(
    banner.getAttribute('role'),
    'alert',
    'banner with warning status - has correct role attribute'
  );
  assert.ok(
    bannerIcon.classList.contains('Polaris-Icon--colorYellowDark'),
    'banner with warning status - has yellowDark icon color'
  );
  assert.equal(
    iconSvg.dataset.iconSource,
    'polaris/circle-alert',
    'banner with warning status - has icon polaris/circle-alert'
  );

  this.set('status', 'critical');
  assert.ok(
    banner.classList.contains('Polaris-Banner--statusCritical'),
    'banner with critical status - has correct class'
  );
  assert.equal(
    banner.getAttribute('role'),
    'alert',
    'banner with critical status - has correct role attribute'
  );
  assert.ok(
    bannerIcon.classList.contains('Polaris-Icon--colorRedDark'),
    'banner with critical status - has redDark icon color'
  );
  assert.equal(
    iconSvg.dataset.iconSource,
    'polaris/circle-barred',
    'banner with critical status - has icon polaris/circle-barred'
  );
});

test('it handles dismissable banner correctly', function(assert) {
  this.render(hbs`{{polaris-banner}}`);

  let banner = find(bannerSelector);
  let dismissWrapper = find(dismissSelector, banner);
  assert.notOk(
    banner.classList.contains('Polaris-Banner--hasDismiss'),
    'banner non-dismissable - does not have dismissable class'
  );
  assert.notOk(
    dismissWrapper,
    'banner non-dismissable - does not render the dismiss element'
  );

  let dismissed = false;
  this.on('dismiss', () => (dismissed = true));

  this.render(hbs`{{polaris-banner onDismiss=(action "dismiss")}}`);

  banner = find(bannerSelector);
  dismissWrapper = find(dismissSelector, banner);
  let dismissBtn = find(
    'button.Polaris-Button.Polaris-Button--plain.Polaris-Button--iconOnly',
    dismissWrapper
  );
  assert.ok(
    banner.classList.contains('Polaris-Banner--hasDismiss'),
    'banner dismissable - has dismissable class'
  );
  assert.ok(
    dismissWrapper,
    'banner dismissable - does render the dismiss element'
  );
  assert.ok(dismissBtn, 'banner dismissable - has correct dismiss button');
  assert.equal(
    dismissBtn.getAttribute('aria-label'),
    'Dismiss notification',
    'banner dismissable - dismiss button has correct aria-label'
  );

  click(dismissBtn);

  assert.ok(dismissed, 'banner dismissable - fires dismiss action');
});

test('it supports `action` and `secondaryAction`', function(assert) {
  this.render(hbs`{{polaris-banner text="Some content text"}}`);

  let banner = find(bannerSelector);
  let content = find(contentSelector, banner);
  let actions = find(actionsSelector, content);
  assert.notOk(
    actions,
    'banner without actions - does not render the actions container'
  );

  let mainActionFired = false;
  this.on('mainAction', () => (mainActionFired = true));

  let secActionFired = false;
  this.on('secAction', () => (secActionFired = true));

  this.render(hbs`{{polaris-banner
    secondaryAction=(hash text="View" onAction=(action "secAction"))
  }}`);

  banner = find(bannerSelector);
  content = find(contentSelector, banner);
  actions = find(actionsSelector, content);
  assert.notOk(
    actions,
    'banner with `secondaryAction` only - does not render the actions container'
  );

  this.render(hbs`{{polaris-banner
    action=(hash text="Edit" onAction=(action "mainAction"))
  }}`);

  banner = find(bannerSelector);
  content = find(contentSelector, banner);
  actions = find(actionsSelector, content);
  let btnGroup = find('div.Polaris-ButtonGroup', actions);
  let actionBtn = find(
    'div.Polaris-ButtonGroup__Item > div.Polaris-Banner__PrimaryAction > button.Polaris-Button.Polaris-Button--outline',
    btnGroup
  );
  let secondaryActionBtn = find(
    'div.Polaris-ButtonGroup__Item > button.Polaris-Banner__SecondaryAction',
    btnGroup
  );
  assert.ok(actions, 'banner with `action` only - renders actions container');
  assert.ok(actionBtn, 'banner with `action` only - renders `action` button');
  assert.notOk(
    secondaryActionBtn,
    'banner with `action` only - does not render `secondaryAction` button'
  );

  this.setProperties({
    mainActionLoading: true,
    mainActionDisabled: false,
  });
  this.render(hbs`{{polaris-banner
    action=(hash
      text="Edit"
      loading=mainActionLoading
      disabled=mainActionDisabled
      onAction=(action "mainAction")
    )
    secondaryAction=(hash
      text="View"
      onAction=(action "secAction")
    )
  }}`);

  banner = find(bannerSelector);
  content = find(contentSelector, banner);
  actions = find(actionsSelector, content);
  btnGroup = find('div.Polaris-ButtonGroup', actions);
  actionBtn = find(
    'div.Polaris-ButtonGroup__Item > div.Polaris-Banner__PrimaryAction > button.Polaris-Button.Polaris-Button--outline',
    btnGroup
  );
  secondaryActionBtn = find(
    'div.Polaris-ButtonGroup__Item > button.Polaris-Banner__SecondaryAction',
    btnGroup
  );
  assert.ok(actionBtn, 'banner with actions - renders `action` button');
  assert.ok(
    actionBtn.classList.contains('Polaris-Button--loading'),
    'banner with actions - `action` button starts in loading state'
  );

  this.setProperties({
    mainActionLoading: false,
    mainActionDisabled: true,
  });
  assert.notOk(
    actionBtn.classList.contains('Polaris-Button--loading'),
    'banner with actions - `action` button exits loading state'
  );
  assert.ok(
    actionBtn.disabled,
    'banner with actions - `action` button becomes disabled'
  );
  assert.equal(
    actionBtn.textContent.trim(),
    'Edit',
    'banner with actions - renders correct `action` button text'
  );

  assert.ok(
    secondaryActionBtn,
    'banner with actions - renders `secondaryAction` button'
  );
  assert.equal(
    secondaryActionBtn.textContent.trim(),
    'View',
    'banner with actions - renders correct `secondaryAction` button text'
  );

  this.set('mainActionDisabled', false);
  click(actionBtn);

  assert.ok(
    mainActionFired,
    "banner with actions - clicking `action` button - trigger `action`'s action"
  );
  assert.notOk(
    secActionFired,
    "banner with actions - clicking `action` button - does not trigger `secondaryAction`'s action"
  );

  mainActionFired = false;
  click(secondaryActionBtn);

  assert.ok(
    secActionFired,
    "banner with actions - clicking `secondaryAction` button - trigger `secondaryAction`'s action"
  );
  assert.notOk(
    mainActionFired,
    "banner with actions - clicking `secondaryAction` button - does not trigger `action`'s action"
  );
});
