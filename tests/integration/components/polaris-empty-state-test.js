import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-empty-state', 'Integration | Component | polaris empty state', {
  integration: true
});

const emptyStateSelector = 'div.Polaris-EmptyState';
const sectionSelector = buildNestedSelector(emptyStateSelector, 'div.Polaris-EmptyState__Section');
const detailsSelector = buildNestedSelector(sectionSelector,
  'div.Polaris-EmptyState__DetailsContainer',
  'div.Polaris-EmptyState__Details'
);
const detailsTextContainerSelector = buildNestedSelector(detailsSelector, 'div.Polaris-TextContainer');
const headingSelector = buildNestedSelector(detailsTextContainerSelector, 'p.Polaris-DisplayText');
const contentSelector = buildNestedSelector(detailsTextContainerSelector, 'div.Polaris-EmptyState__Content');
const actionsSelector = buildNestedSelector(detailsSelector,
  'div.Polaris-EmptyState__Actions',
  'div.Polaris-ButtonGroup'
);
const imageSelector = buildNestedSelector(sectionSelector,
  'div.Polaris-EmptyState__ImageContainer',
  'img.Polaris-EmptyState__Image'
);

test('it renders the correct HTML in basic inline usage', function(assert) {
  this.on('doSomething', () => {});
  this.render(hbs`
    {{polaris-empty-state
      heading="Empty State Here"
      image="http://www.somewhere.com/some-image.jpg"
      text="I'm some inline text"
      action=(hash
        text="Do something"
        onAction=(action "doSomething")
      )
    }}
  `);

  // Check the header.
  let heading = find(headingSelector);
  assert.ok(heading, 'renders one heading');
  assert.ok(heading.classList.contains('Polaris-DisplayText--sizeMedium'), 'renders the correct size heading');
  assert.equal(heading.textContent.trim(), 'Empty State Here', 'renders the correct heading text');

  // Check the content.
  let content = find(contentSelector);
  assert.ok(content, 'renders content');
  assert.equal(content.textContent.trim(), 'I\'m some inline text', 'renders the correct content');

  // Check the image.
  let image = find(imageSelector);
  assert.ok(content, 'renders image');
  assert.equal(image.src, 'http://www.somewhere.com/some-image.jpg', 'renders the correct image');
  assert.equal(image.alt, '', 'renders an empty image title');
});

test('it renders the correct HTML in basic block usage', function(assert) {
  this.on('doSomething', () => {});
  this.render(hbs`
    {{#polaris-empty-state
      heading="Empty State Here"
      image="http://www.somewhere.com/some-image.jpg"
      action=(hash
        text="Do something"
        onAction=(action "doSomething")
      )
    }}
      <p class="block-content">This is some block content</p>
    {{/polaris-empty-state}}
  `);

  // Check the header.
  let heading = find(headingSelector);
  assert.ok(heading, 'renders one heading');
  assert.ok(heading.classList.contains('Polaris-DisplayText--sizeMedium'), 'renders the correct size heading');
  assert.equal(heading.textContent.trim(), 'Empty State Here', 'renders the correct heading text');

  // Check the content.
  let blockContentSelector = buildNestedSelector(contentSelector, 'p.block-content');
  let content = find(blockContentSelector);
  assert.ok(content, 'renders content');
  assert.equal(content.textContent.trim(), 'This is some block content', 'renders the correct content');

  // Check the image.
  let image = find(imageSelector);
  assert.ok(content, 'renders image');
  assert.equal(image.src, 'http://www.somewhere.com/some-image.jpg', 'renders the correct image');
  assert.equal(image.alt, '', 'renders an empty image title');
});


test('it handles actions correctly', function(assert) {
  this.setProperties({
    mainActionFired: false,
    secondaryActionFired: false,
    secondaryAction: null,
  });

  this.on('mainAction', () => { this.set('mainActionFired', true); });

  this.render(hbs`
    {{polaris-empty-state
      heading="Empty State Here"
      image="http://www.somewhere.com/some-image.jpg"
      text="I'm some inline text"
      action=(hash
        text="Main action"
        onAction=(action "mainAction")
      )
      secondaryAction=secondaryAction
    }}
  `);

  const mainActionSelector = `${ actionsSelector } button.Polaris-Button--primary`;
  let mainActionButton = find(mainActionSelector);
  assert.ok(mainActionButton, 'renders primary action button');
  assert.ok(mainActionButton.classList.contains('Polaris-Button--sizeLarge'), 'renders large button for primary action');
  assert.equal(mainActionButton.textContent.trim(), 'Main action', 'renders correct primary action button text');

  const secondaryActionSelector = `${ actionsSelector } button.Polaris-Button--plain`;
  let secondaryActionButton = find(secondaryActionSelector);
  assert.notOk(secondaryActionButton, 'does not render secondary action button when no secondary action supplied');

  this.set('secondaryAction', {
    text: 'Secondary action',
    onAction: () => { this.set('secondaryActionFired', true); },
  });

  secondaryActionButton = find(secondaryActionSelector);
  assert.ok(secondaryActionButton, 'renders secondary action button when secondary action supplied');
  assert.equal(secondaryActionButton.textContent.trim(), 'Secondary action', 'renders correct secondary action text when secondary action supplied');

  click(mainActionSelector);
  assert.ok(this.get('mainActionFired'), 'main action fires when main action button clicked');
  assert.notOk(this.get('secondaryActionFired'), 'secondary action does not fire when main action button clicked');

  click(secondaryActionSelector);
  assert.ok(this.get('secondaryActionFired'), 'secondary action fires when secondary action button clicked');
});

test('it handles the imageContained attribute correctly', function(assert) {
  this.set('imageContained', false);

  this.on('doSomething', () => {});
  this.render(hbs`
    {{polaris-empty-state
      heading="Empty State Here"
      image="http://www.somewhere.com/some-image.jpg"
      text="I'm some inline text"
      imageContained=imageContained
      action=(hash
        text="Do something"
        onAction=(action "doSomething")
      )
    }}
  `);

  let emptyState = find(emptyStateSelector);
  assert.ok(emptyState, 'renders empty state component');
  assert.notOk(emptyState.classList.contains('Polaris-EmptyState--imageContained'),
    'empty state component does not have imageContained class when imageContained is false');

  this.set('imageContained', true);
  assert.ok(emptyState.classList.contains('Polaris-EmptyState--imageContained'),
    'empty state component has imageContained class when imageContained is true');
});
