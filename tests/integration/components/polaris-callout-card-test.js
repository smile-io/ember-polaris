import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris callout card', function (hooks) {
  setupRenderingTest(hooks);

  const selector = buildNestedSelector('[data-test-callout-card]');
  const cardSelector = buildNestedSelector(
    selector,
    'div.Polaris-CalloutCard__Container',
    'div.Polaris-Card__Section',
    'div.Polaris-CalloutCard'
  );
  const contentSelector = buildNestedSelector(
    cardSelector,
    'div.Polaris-CalloutCard__Content'
  );
  const headingSelector = buildNestedSelector(
    contentSelector,
    'div.Polaris-CalloutCard__Title',
    'h2.Polaris-Heading'
  );
  const textSelector = buildNestedSelector(
    contentSelector,
    'div.Polaris-TextContainer'
  );
  const buttonsSelector = buildNestedSelector(
    contentSelector,
    'div.Polaris-CalloutCard__Buttons'
  );
  const imageSelector = buildNestedSelector(
    cardSelector,
    'img.Polaris-CalloutCard__Image'
  );

  test('it renders the correct HTML in inline form without secondary action', async function (assert) {
    await render(hbs`
      <PolarisCalloutCard
        @title="This is an inline callout card"
        @text="Without a secondary action"
        @illustration="http://www.somewhere.com/some-image.jpg"
        @primaryAction={{hash
          text="Primary action here"
          onAction=(fn (mut primaryActionFired) true)
        }}
      />
    `);

    assert.dom(cardSelector).exists({ count: 1 }, 'renders one callout card');

    assert
      .dom(headingSelector)
      .exists({ count: 1 }, 'renders one heading')
      .hasText('This is an inline callout card', 'renders the correct heading');

    assert
      .dom(textSelector)
      .exists({ count: 1 }, 'renders one text container')
      .hasText('Without a secondary action', 'renders the correct text');

    assert
      .dom(buttonsSelector)
      .exists({ count: 1 }, 'renders one button wrapper');

    const primaryButtonSelector = buildNestedSelector(
      buttonsSelector,
      '[data-test-callout-card-primary-button]'
    );
    assert
      .dom(primaryButtonSelector)
      .exists({ count: 1 }, 'renders one button')
      .hasText('Primary action here', 'renders the correct button text');

    assert
      .dom(imageSelector)
      .exists({ count: 1 }, 'renders one image')
      .hasAttribute(
        'src',
        'http://www.somewhere.com/some-image.jpg',
        'renders the correct image'
      )
      .hasAttribute('alt', '', 'renders an empty image title');
  });

  test('it renders the correct HTML in block form with secondary action', async function (assert) {
    await render(hbs`
      <PolarisCalloutCard
        @title="This is a block callout card"
        @illustration="http://www.somewhere.com/some-image.jpg"
        @primaryAction={{hash
          text="Primary action here"
          onAction=(fn (mut primaryActionFired) true)
        }}
        @secondaryAction={{hash
          text="Secondary action here"
          onAction=(fn (mut secondaryActionFired) true)
        }}
      >
        With a secondary action
      </PolarisCalloutCard>
    `);

    assert
      .dom(textSelector)
      .exists({ count: 1 }, 'renders one text container')
      .hasText('With a secondary action', 'renders the correct text');

    const buttonGroupSelector = buildNestedSelector(
      buttonsSelector,
      '[data-test-callout-card-button-group]'
    );
    assert
      .dom(`${buttonGroupSelector} [data-test-callout-card-primary-button]`)
      .hasText('Primary action here', 'renders the correct primary button text')
      .hasNoClass('Polaris-Button--plain', 'renders normal primary button');

    assert
      .dom(`${buttonGroupSelector} [data-test-callout-card-secondary-button]`)
      .hasText(
        'Secondary action here',
        'renders the correct secondary button text'
      )
      .hasClass('Polaris-Button--plain', 'renders plain secondary button');
  });

  test('it handles actions correctly', async function (assert) {
    this.set('cardAction', (name) => assert.step(name));

    await render(hbs`
      <PolarisCalloutCard
        @primaryAction={{hash
          text="Primary"
          onAction=(fn cardAction "primary")
        }}
        @secondaryAction={{hash
          text="Secondary"
          onAction=(fn cardAction "secondary")
        }}
      />
    `);

    // Fire the primary action.
    await click('[data-test-callout-card-primary-button]');
    assert.verifySteps(['primary'], 'triggers primary action');

    await click('[data-test-callout-card-secondary-button]');
    assert.verifySteps(['secondary'], 'triggers secondary action');
  });

  test('it is dismissed', async function (assert) {
    await render(hbs`
      <PolarisCalloutCard
        @primaryAction={{hash
          text="Primary"
          onAction=(fn (mut primaryActionFired) true)
        }}
        @onDismiss={{fn (mut wasOnDismissCalled) true}}
      />
    `);

    await click('[data-test-callout-card-dismiss-button]');
    assert.ok(this.get('wasOnDismissCalled'));
  });
});
