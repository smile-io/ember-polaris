import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris empty state', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  const emptyStateSelector = '[data-test-empty-state]';
  const sectionSelector = '[data-test-empty-state-section]';
  const detailsSelector = '[data-test-empty-state-details]';
  const headingSelector = '[data-test-empty-state-heading]';
  const contentSelector = '[data-test-empty-state-content]';
  const actionsSelector = '[data-test-empty-state-actions]';
  const imageSelector = '[data-test-empty-state-image]';

  test('it renders the correct HTML in basic inline usage', async function(assert) {
    this.actions.doSomething = () => {};
    await render(hbs`
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
    assert
      .dom(heading)
      .hasClass(
        'Polaris-DisplayText--sizeMedium',
        'renders the correct size heading'
      );
    assert
      .dom(heading)
      .hasText('Empty State Here', 'renders the correct heading text');

    // Check the content.
    let content = find(contentSelector);
    assert.ok(content, 'renders content');
    assert
      .dom(content)
      .hasText("I'm some inline text", 'renders the correct content');

    // Check the image.
    let image = find(imageSelector);
    assert.ok(content, 'renders image');
    assert.equal(
      image.src,
      'http://www.somewhere.com/some-image.jpg',
      'renders the correct image'
    );
    assert.equal(image.alt, '', 'renders an empty image title');
  });

  test('it renders the correct HTML in basic block usage', async function(assert) {
    this.actions.doSomething = () => {};
    await render(hbs`
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
    assert
      .dom(heading)
      .hasClass(
        'Polaris-DisplayText--sizeMedium',
        'renders the correct size heading'
      );
    assert
      .dom(heading)
      .hasText('Empty State Here', 'renders the correct heading text');

    // Check the content.
    let blockContentSelector = buildNestedSelector(
      contentSelector,
      'p.block-content'
    );
    let content = find(blockContentSelector);
    assert.ok(content, 'renders content');
    assert
      .dom(content)
      .hasText('This is some block content', 'renders the correct content');

    // Check the image.
    let image = find(imageSelector);
    assert.ok(content, 'renders image');
    assert.equal(
      image.src,
      'http://www.somewhere.com/some-image.jpg',
      'renders the correct image'
    );
    assert.equal(image.alt, '', 'renders an empty image title');
  });

  test('it handles actions correctly', async function(assert) {
    this.setProperties({
      mainActionFired: false,
      secondaryActionFired: false,
      secondaryAction: null,
    });

    this.actions.mainAction = () => {
      this.set('mainActionFired', true);
    };

    await render(hbs`
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

    const mainActionSelector = `${actionsSelector} button.Polaris-Button--primary`;
    let mainActionButton = find(mainActionSelector);
    assert.ok(mainActionButton, 'renders primary action button');
    assert
      .dom(mainActionButton)
      .hasClass(
        'Polaris-Button--sizeLarge',
        'renders large button for primary action'
      );
    assert
      .dom(mainActionButton)
      .hasText('Main action', 'renders correct primary action button text');

    const secondaryActionSelector = `${actionsSelector} button.Polaris-Button--plain`;
    let secondaryActionButton = find(secondaryActionSelector);
    assert.notOk(
      secondaryActionButton,
      'does not render secondary action button when no secondary action supplied'
    );

    this.set('secondaryAction', {
      text: 'Secondary action',
      onAction: () => {
        this.set('secondaryActionFired', true);
      },
    });

    secondaryActionButton = find(secondaryActionSelector);
    assert.ok(
      secondaryActionButton,
      'renders secondary action button when secondary action supplied'
    );
    assert
      .dom(secondaryActionButton)
      .hasText(
        'Secondary action',
        'renders correct secondary action text when secondary action supplied'
      );

    click(mainActionSelector);
    assert.ok(
      this.get('mainActionFired'),
      'main action fires when main action button clicked'
    );
    assert.notOk(
      this.get('secondaryActionFired'),
      'secondary action does not fire when main action button clicked'
    );

    click(secondaryActionSelector);
    assert.ok(
      this.get('secondaryActionFired'),
      'secondary action fires when secondary action button clicked'
    );
  });

  test('it handles the imageContained attribute correctly', async function(assert) {
    this.set('imageContained', false);

    this.actions.doSomething = () => {};
    await render(hbs`
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
    assert
      .dom(emptyState)
      .hasNoClass(
        'Polaris-EmptyState--imageContained',
        'empty state component does not have imageContained class when imageContained is false'
      );

    this.set('imageContained', true);
    assert
      .dom(emptyState)
      .hasClass(
        'Polaris-EmptyState--imageContained',
        'empty state component has imageContained class when imageContained is true'
      );
  });
});
