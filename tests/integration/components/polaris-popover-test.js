import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-popover', 'Integration | Component | polaris popover', {
  integration: true,
});

const activatorSelector = 'button.Polaris-Button';
const overlaySelector = 'div.Polaris-PositionedOverlay';
const popoverSelector = buildNestedSelector(overlaySelector, 'div.Polaris-Popover');
const popoverChildSelector = buildNestedSelector(popoverSelector, 'div');
const popoverContentSelector = buildNestedSelector(
  popoverChildSelector,
  'div.Polaris-Popover__Content',
);
const popoverContentAboveSelector = '.ember-basic-dropdown-content--above';
const popoverContentBelowSelector = '.ember-basic-dropdown-content--below';
const popoverPaneSelector = buildNestedSelector(
  popoverContentSelector,
  'div.Polaris-Popover__Pane.Polaris-Scrollable.Polaris-Scrollable--vertical',
);

skip('it renders the correct HTML with default attributes', function(assert) {
  this.render(hbs`
    {{#polaris-popover as |popover|}}
      {{#popover.activator}}
        {{polaris-button text="Toggle popover"}}
      {{/popover.activator}}

      {{#popover.content}}
        This is the popover content
      {{/popover.content}}
    {{/polaris-popover}}
  `);

  const activator = find(activatorSelector);
  assert.ok(activator, 'renders activator');

  // Check that the popover content isn't rendered.
  let overlays = findAll(overlaySelector);
  assert.equal(overlays.length, 0, 'before clicking activator - does not render any content');

  // Click the activator button.
  click(activatorSelector);

  // Check that the content is now rendered.
  const popovers = findAll(popoverSelector);
  assert.equal(popovers.length, 1, 'renders one popover after clicking activator');
  assert.equal(
    popovers[0].dataset.polarisOverlay,
    'true',
    'popover has data-polaris-overlay attribute',
  );

  // Check the popover renders the correct HTML.
  const popoverChildren = findAll(popoverChildSelector);
  assert.equal(popoverChildren.length, 4, 'popover has the correct number of children');

  // Check the popover has the correct child elements.
  let child = popoverChildren[0];
  assert.ok(child.classList.contains('Polaris-Popover__Tip'), 'first popover child is tip');

  child = popoverChildren[1];
  assert.ok(
    child.classList.contains('Polaris-Popover__FocusTracker'),
    'second popover child is focus tracker',
  );

  child = popoverChildren[2];
  assert.ok(
    child.classList.contains('Polaris-Popover__Wrapper'),
    'third popover child is content wrapper',
  );

  child = popoverChildren[3];
  assert.ok(
    child.classList.contains('Polaris-Popover__FocusTracker'),
    'fourth popover child is focus tracker',
  );

  // Check the content was rendered correctly.
  const popoverContents = findAll(popoverContentSelector);
  assert.equal(popoverContents.length, 1, 'renders one popover content div');

  const popoverPanes = findAll(popoverPaneSelector);
  assert.equal(popoverPanes.length, 1, 'renders one popover pane');

  const popoverPane = popoverPanes[0];
  assert.equal(
    popoverPane.dataset.polarisScrollable,
    'true',
    'popover pane has data-polaris-scrollable attribute',
  );
  assert.equal(
    popoverPane.textContent.trim(),
    'This is the popover content',
    'popover pane contains the correct content',
  );

  // Click the activator button again.
  click(activatorSelector);

  // Check that the popover content is removed.
  overlays = findAll(overlaySelector);
  assert.equal(overlays.length, 0, 'after clicking activator twice - does not render any content');
});

test('it renders the correct HTML with sectioned attribute', function(assert) {
  this.render(hbs`
    {{#polaris-popover sectioned=true as |popover|}}
      {{#popover.activator}}
        {{polaris-button text="Toggle popover"}}
      {{/popover.activator}}

      {{#popover.content}}
        This is some sectioned popover content
      {{/popover.content}}
    {{/polaris-popover}}
  `);

  click(activatorSelector);

  const popoverSectionSelector = buildNestedSelector(
    popoverPaneSelector,
    'div.Polaris-Popover__Section',
  );
  const popoverSections = findAll(popoverSectionSelector);
  assert.equal(popoverSections.length, 1, 'renders one popover section');
  assert.equal(
    popoverSections[0].textContent.trim(),
    'This is some sectioned popover content',
    'popover section contains the correct content',
  );
});

test('it renders the correct HTML with preferredPosition attribute', function(assert) {
  assert.expect(2);

  this.set('preferredPosition', 'above');

  this.render(hbs`
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

  click(activatorSelector);

  const contentAbove = document.querySelector(popoverContentAboveSelector);
  assert.ok(contentAbove, 'renders popover content above the trigger');

  // close the popover before resetting position
  click(activatorSelector);

  this.set('preferredPosition', 'below');

  click(activatorSelector);

  const contentBelow = document.querySelector(popoverContentBelowSelector);
  assert.ok(contentBelow, 'renders popover content below the trigger');
});

test('it calls a passed-in onClose action when closed', function(assert) {
  this.set('onCloseCalled', false);

  this.on('close', () => {
    this.set('onCloseCalled', true);
  });

  this.render(hbs`
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
  click(activatorSelector);

  assert.notOk(this.get('onCloseCalled'), 'the passed-in onClose action has not been called');

  // close the popover
  click(activatorSelector);

  assert.ok(
    this.get('onCloseCalled'),
    'the passed-in onClose action is called when popover is closed',
  );
});
