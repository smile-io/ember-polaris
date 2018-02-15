import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-callout-card', 'Integration | Component | polaris callout card', {
  integration: true
});

const calloutCardSelector = buildNestedSelector(
  'div.Polaris-Card',
  'div.Polaris-Card__Section',
  'div.Polaris-CalloutCard'
);
const calloutCardContentSelector = buildNestedSelector(
  calloutCardSelector,
  'div.Polaris-CalloutCard__Content'
);
const calloutCardContentHeadingSelector = buildNestedSelector(
  calloutCardContentSelector,
  'div.Polaris-CalloutCard__Title',
  'h2.Polaris-Heading'
);
const calloutCardContentTextSelector = buildNestedSelector(
  calloutCardContentSelector,
  'div.Polaris-TextContainer'
);
const calloutCardButtonWrapperSelector = buildNestedSelector(
  calloutCardContentSelector,
  'div.Polaris-CalloutCard__Buttons'
);
const calloutCardImageSelector = buildNestedSelector(
  calloutCardSelector,
  'img.Polaris-CalloutCard__Image'
);

test('it renders the correct HTML in inline form without secondary action', function(assert) {
  this.render(hbs`
    {{polaris-callout-card
      title="This is an inline callout card"
      text="Without a secondary action"
      illustration="http://www.somewhere.com/some-image.jpg"
      primaryAction=(hash
        text="Primary action here"
        onAction=(action (mut primaryActionFired) true)
      )
    }}
  `);

  const calloutCards = findAll(calloutCardSelector);
  assert.equal(calloutCards.length, 1, 'renders one callout card');

  const headings = findAll(calloutCardContentHeadingSelector);
  assert.equal(headings.length, 1, 'renders one heading');
  assert.equal(headings[0].textContent.trim(), 'This is an inline callout card', 'renders the correct heading');

  const texts = findAll(calloutCardContentTextSelector);
  assert.equal(texts.length, 1, 'renders one text container');
  assert.equal(texts[0].textContent.trim(), 'Without a secondary action', 'renders the correct text');

  const buttonWrappers = findAll(calloutCardButtonWrapperSelector);
  assert.equal(buttonWrappers.length, 1, 'renders one button wrapper');

  const buttonSelector = buildNestedSelector(calloutCardButtonWrapperSelector, 'button.Polaris-Button');
  const buttons = findAll(buttonSelector);
  assert.equal(buttons.length, 1, 'renders one button');
  assert.equal(buttons[0].textContent.trim(), 'Primary action here', 'renders the correct button text');

  const images = findAll(calloutCardImageSelector);
  assert.equal(images.length, 1, 'renders one image');

  const image = images[0];
  assert.equal(image.src, 'http://www.somewhere.com/some-image.jpg', 'renders the correct image');
  assert.equal(image.alt, '', 'renders an empty image title');
});

test('it renders the correct HTML in block form with secondary action', function(assert) {
  this.render(hbs`
    {{#polaris-callout-card
      title="This is a block callout card"
      illustration="http://www.somewhere.com/some-image.jpg"
      primaryAction=(hash
        text="Primary action here"
        onAction=(action (mut primaryActionFired) true)
      )
      secondaryAction=(hash
        text="Secondary action here"
        onAction=(action (mut secondaryActionFired) true)
      )
    }}
      With a secondary action
    {{/polaris-callout-card}}
  `);

  const calloutCards = findAll(calloutCardSelector);
  assert.equal(calloutCards.length, 1, 'renders one callout card');

  const headings = findAll(calloutCardContentHeadingSelector);
  assert.equal(headings.length, 1, 'renders one heading');
  assert.equal(headings[0].textContent.trim(), 'This is a block callout card', 'renders the correct heading');

  const texts = findAll(calloutCardContentTextSelector);
  assert.equal(texts.length, 1, 'renders one text container');
  assert.equal(texts[0].textContent.trim(), 'With a secondary action', 'renders the correct text');

  const buttonWrappers = findAll(calloutCardButtonWrapperSelector);
  assert.equal(buttonWrappers.length, 1, 'renders one button wrapper');

  const buttonSelector = buildNestedSelector(
    calloutCardButtonWrapperSelector,
    'div.Polaris-ButtonGroup',
    'div.Polaris-ButtonGroup__Item',
    'button.Polaris-Button'
  );
  const buttons = findAll(buttonSelector);
  assert.equal(buttons.length, 2, 'renders two buttons');

  let button = buttons[0];
  assert.equal(button.textContent.trim(), 'Primary action here', 'renders the correct primary button text');
  assert.notOk(button.classList.contains('Polaris-Button--plain'), 'renders normal primary button');

  button = buttons[1];
  assert.equal(button.textContent.trim(), 'Secondary action here', 'renders the correct secondary button text');
  assert.ok(button.classList.contains('Polaris-Button--plain'), 'renders plain secondary button');

  const images = findAll(calloutCardImageSelector);
  assert.equal(images.length, 1, 'renders one image');

  const image = images[0];
  assert.equal(image.src, 'http://www.somewhere.com/some-image.jpg', 'renders the correct image');
  assert.equal(image.alt, '', 'renders an empty image title');
});

test('it handles actions correctly', function(assert) {
  this.setProperties({
    primaryActionFired: false,
    secondaryActionFired: false,
  });

  this.render(hbs`
    {{polaris-callout-card
      primaryAction=(hash
        text="Primary"
        onAction=(action (mut primaryActionFired) true)
      )
      secondaryAction=(hash
        text="Secondary"
        onAction=(action (mut secondaryActionFired) true)
      )
    }}
  `);

  // Fire the primary action.
  click('button.Polaris-Button:first-of-type');
  assert.ok(this.get('primaryActionFired'), 'after firing primary action - primary action has fired');
  assert.notOk(this.get('secondaryActionFired'), 'after firing primary action - secondary action has not fired');

  click('button.Polaris-Button.Polaris-Button--plain');
  assert.ok(this.get('secondaryActionFired'), 'after firing secondary action - secondary action has been fired');
});
