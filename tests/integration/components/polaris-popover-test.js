import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris popover', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  const activatorSelector = 'button.Polaris-Button';
  const overlaySelector = 'div.Polaris-PositionedOverlay';
  const popoverSelector = buildNestedSelector(
    overlaySelector,
    'div.Polaris-Popover'
  );
  const popoverChildSelector = buildNestedSelector(popoverSelector, 'div');
  const popoverContentSelector = buildNestedSelector(
    popoverChildSelector,
    'div.Polaris-Popover__Content'
  );
  const popoverContentAboveSelector = '.ember-basic-dropdown-content--above';
  const popoverContentBelowSelector = '.ember-basic-dropdown-content--below';
  const popoverPaneSelector = buildNestedSelector(
    popoverContentSelector,
    'div.Polaris-Popover__Pane.Polaris-Scrollable.Polaris-Scrollable--vertical'
  );

  test('it renders the correct HTML with default attributes', async function(assert) {
    await render(hbs`
      {{#polaris-popover as |popover|}}
        {{#popover.activator}}
          {{polaris-button text="Toggle popover"}}
        {{/popover.activator}}

        {{#popover.content}}
          This is the popover content
        {{/popover.content}}
      {{/polaris-popover}}
    `);

    assert.dom(activatorSelector).exists('renders activator');

    // Check that the popover content isn't rendered.
    assert
      .dom(overlaySelector)
      .doesNotExist('before clicking activator - does not render any content');

    // Click the activator button.
    await click(activatorSelector);

    // Check that the content is now rendered.
    const popovers = assert.dom(popoverSelector);

    popovers.exists(
      { count: 1 },
      'renders one popover after clicking activator'
    );

    popovers.hasAttribute(
      'data-polaris-overlay',
      'true',
      'popover has data-polaris-overlay attribute'
    );

    // Check the popover renders the correct HTML.
    const popoverChildren = findAll(popoverChildSelector);
    assert.equal(
      popoverChildren.length,
      4,
      'popover has the correct number of children'
    );

    // Check the popover has the correct child elements.
    let child = popoverChildren[0];
    assert
      .dom(child)
      .hasClass('Polaris-Popover__Tip', 'first popover child is tip');

    child = popoverChildren[1];
    assert
      .dom(child)
      .hasClass(
        'Polaris-Popover__FocusTracker',
        'second popover child is focus tracker'
      );

    child = popoverChildren[2];
    assert
      .dom(child)
      .hasClass(
        'Polaris-Popover__Wrapper',
        'third popover child is content wrapper'
      );

    child = popoverChildren[3];
    assert
      .dom(child)
      .hasClass(
        'Polaris-Popover__FocusTracker',
        'fourth popover child is focus tracker'
      );

    // Check the content was rendered correctly.
    assert
      .dom(popoverContentSelector)
      .exists({ count: 1 }, 'renders one popover content div');

    const popoverPanes = findAll(popoverPaneSelector);
    assert.equal(popoverPanes.length, 1, 'renders one popover pane');

    const popoverPane = popoverPanes[0];
    assert.equal(
      popoverPane.dataset.polarisScrollable,
      'true',
      'popover pane has data-polaris-scrollable attribute'
    );
    assert
      .dom(popoverPane)
      .hasText(
        'This is the popover content',
        'popover pane contains the correct content'
      );

    // Click the activator button again.
    await click(activatorSelector);

    // Check that the popover content is removed.
    assert
      .dom(overlaySelector)
      .doesNotExist(
        'after clicking activator twice - does not render any content'
      );
  });

  test('it renders the correct HTML with sectioned attribute', async function(assert) {
    await render(hbs`
      {{#polaris-popover sectioned=true as |popover|}}
        {{#popover.activator}}
          {{polaris-button text="Toggle popover"}}
        {{/popover.activator}}

        {{#popover.content}}
          This is some sectioned popover content
        {{/popover.content}}
      {{/polaris-popover}}
    `);

    await click(activatorSelector);

    const popoverSectionSelector = buildNestedSelector(
      popoverPaneSelector,
      'div.Polaris-Popover__Section'
    );

    const popoverSections = assert.dom(popoverSectionSelector);
    popoverSections.exists({ count: 1 }, 'renders one popover section');

    popoverSections.hasText(
      'This is some sectioned popover content',
      'popover section contains the correct content'
    );
  });

  test('it renders the correct HTML with preferredPosition attribute', async function(assert) {
    assert.expect(2);

    this.set('preferredPosition', 'above');

    await render(hbs`
      {{#polaris-popover
        preferredPosition=preferredPosition
        sectioned=true
        as |popover|
      }}
        {{#popover.activator}}
          {{polaris-button text="Toggle popover"}}
        {{/popover.activator}}

        {{#popover.content}}
          This is some sectioned popover content
        {{/popover.content}}
      {{/polaris-popover}}
    `);

    await click(activatorSelector);

    const contentAbove = document.querySelector(popoverContentAboveSelector);
    assert.ok(contentAbove, 'renders popover content above the trigger');

    // close the popover before resetting position
    await click(activatorSelector);

    this.set('preferredPosition', 'below');

    await click(activatorSelector);

    const contentBelow = document.querySelector(popoverContentBelowSelector);
    assert.ok(contentBelow, 'renders popover content below the trigger');
  });

  test('it calls a passed-in onClose action when closed', async function(assert) {
    this.set('onCloseCalled', false);

    this.actions.close = () => {
      this.set('onCloseCalled', true);
    };

    await render(hbs`
      {{#polaris-popover
        sectioned=true
        onClose=(action "close")
        as |popover|
      }}
        {{#popover.activator}}
          {{polaris-button text="Toggle popover"}}
        {{/popover.activator}}

        {{#popover.content}}
          This is some sectioned popover content
        {{/popover.content}}
      {{/polaris-popover}}
    `);

    // open the popover
    await click(activatorSelector);

    assert.notOk(
      this.get('onCloseCalled'),
      'the passed-in onClose action has not been called'
    );

    // close the popover
    await click(activatorSelector);

    assert.ok(
      this.get('onCloseCalled'),
      'the passed-in onClose action is called when popover is closed'
    );
  });
});
