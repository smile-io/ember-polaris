import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris empty state', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  const emptyStateSelector = '[data-test-empty-state]';
  const headingSelector = '[data-test-empty-state-heading]';
  const contentSelector = '[data-test-empty-state-content]';
  const actionsSelector = '[data-test-empty-state-actions]';
  const imageSelector = '[data-test-empty-state-image]';

  test('it renders the correct HTML in basic inline usage', async function (assert) {
    this.actions.doSomething = () => {};
    await render(hbs`
      {{polaris-empty-state
        heading="Empty State Here"
        image="http://www.somewhere.com/some-image.jpg"
        text="I'm some inline text"
        primaryAction=(hash
          text="Do something"
          onAction=(action "doSomething")
        )
      }}
    `);

    // Check the header.
    assert.dom(headingSelector).exists('renders one heading');
    assert
      .dom(headingSelector)
      .hasClass(
        'Polaris-DisplayText--sizeMedium',
        'renders the correct size heading'
      );
    assert
      .dom(headingSelector)
      .hasText('Empty State Here', 'renders the correct heading text');

    // Check the content.
    assert.dom(contentSelector).exists('renders content');
    assert
      .dom(contentSelector)
      .hasText("I'm some inline text", 'renders the correct content');

    // Check the image.
    assert.dom(imageSelector).exists('renders image');
    assert
      .dom(imageSelector)
      .hasAttribute(
        'src',
        'http://www.somewhere.com/some-image.jpg',
        'renders the correct image'
      );
    assert
      .dom(imageSelector)
      .hasAttribute('alt', '', 'renders an empty image title');
  });

  test('it renders the correct HTML in basic block usage', async function (assert) {
    this.actions.doSomething = () => {};
    await render(hbs`
      {{#polaris-empty-state
        heading="Empty State Here"
        image="http://www.somewhere.com/some-image.jpg"
        primaryAction=(hash
          text="Do something"
          onAction=(action "doSomething")
        )
      }}
        <p class="block-content">This is some block content</p>
      {{/polaris-empty-state}}
    `);

    // Check the header.
    assert.dom(headingSelector).exists('renders one heading');
    assert
      .dom(headingSelector)
      .hasClass(
        'Polaris-DisplayText--sizeMedium',
        'renders the correct size heading'
      );
    assert
      .dom(headingSelector)
      .hasText('Empty State Here', 'renders the correct heading text');

    // Check the content.
    let blockContentSelector = buildNestedSelector(
      contentSelector,
      'p.block-content'
    );
    assert.dom(blockContentSelector).exists('renders content');
    assert
      .dom(blockContentSelector)
      .hasText('This is some block content', 'renders the correct content');

    // Check the image.
    assert.dom(imageSelector).exists('renders image');
    assert
      .dom(imageSelector)
      .hasAttribute(
        'src',
        'http://www.somewhere.com/some-image.jpg',
        'renders the correct image'
      );
    assert
      .dom(imageSelector)
      .hasAttribute('alt', '', 'renders an empty image title');
  });

  test('it handles actions correctly', async function (assert) {
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
        primaryAction=(hash
          text="Main action"
          onAction=(action "mainAction")
        )
        secondaryAction=secondaryAction
      }}
    `);

    const mainActionSelector = `${actionsSelector} button.Polaris-Button--primary`;
    assert.dom(mainActionSelector).exists('renders primary action button');
    assert
      .dom(mainActionSelector)
      .hasClass(
        'Polaris-Button--sizeLarge',
        'renders large button for primary action'
      );
    assert
      .dom(mainActionSelector)
      .hasText('Main action', 'renders correct primary action button text');

    const secondaryActionSelector = `${actionsSelector} button.Polaris-Button--plain`;
    assert
      .dom(secondaryActionSelector)
      .doesNotExist(
        'does not render secondary action button when no secondary action supplied'
      );

    this.set('secondaryAction', {
      text: 'Secondary action',
      onAction: () => {
        this.set('secondaryActionFired', true);
      },
    });

    assert
      .dom(secondaryActionSelector)
      .exists('renders secondary action button when secondary action supplied');
    assert
      .dom(secondaryActionSelector)
      .hasText(
        'Secondary action',
        'renders correct secondary action text when secondary action supplied'
      );

    await click(mainActionSelector);
    assert.ok(
      this.get('mainActionFired'),
      'main action fires when main action button clicked'
    );
    assert.notOk(
      this.get('secondaryActionFired'),
      'secondary action does not fire when main action button clicked'
    );

    await click(secondaryActionSelector);
    assert.ok(
      this.get('secondaryActionFired'),
      'secondary action fires when secondary action button clicked'
    );
  });

  test('it handles the imageContained attribute correctly', async function (assert) {
    this.set('imageContained', false);

    this.actions.doSomething = () => {};
    await render(hbs`
      {{polaris-empty-state
        heading="Empty State Here"
        image="http://www.somewhere.com/some-image.jpg"
        text="I'm some inline text"
        imageContained=imageContained
        primaryAction=(hash
          text="Do something"
          onAction=(action "doSomething")
        )
      }}
    `);

    assert.dom(emptyStateSelector).exists('renders empty state component');
    assert
      .dom(emptyStateSelector)
      .hasNoClass(
        'Polaris-EmptyState--imageContained',
        'empty state component does not have imageContained class when imageContained is false'
      );

    this.set('imageContained', true);
    assert
      .dom(emptyStateSelector)
      .hasClass(
        'Polaris-EmptyState--imageContained',
        'empty state component has imageContained class when imageContained is true'
      );
  });
});
