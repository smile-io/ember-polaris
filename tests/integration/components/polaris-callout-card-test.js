import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { click, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris callout card', function (hooks) {
  setupRenderingTest(hooks);

  const calloutCardSelector = buildNestedSelector(
    'div.Polaris-Card',
    'div.Polaris-CalloutCard__Container',
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

  test('it renders the correct HTML in inline form without secondary action', async function (assert) {
    await render(hbs`
      <PolarisCalloutCard
        @title="This is an inline callout card"
        @text="Without a secondary action"
        @illustration="http://www.somewhere.com/some-image.jpg"
        @primaryAction={{hash
          text="Primary action here"
          onAction=(action (mut primaryActionFired) true)
        }}
      />
    `);

    assert
      .dom(calloutCardSelector)
      .exists({ count: 1 }, 'renders one callout card');

    const headings = assert.dom(calloutCardContentHeadingSelector);
    headings.exists({ count: 1 }, 'renders one heading');
    headings.hasText(
      'This is an inline callout card',
      'renders the correct heading'
    );

    const texts = assert.dom(calloutCardContentTextSelector);
    texts.exists({ count: 1 }, 'renders one text container');
    texts.hasText('Without a secondary action', 'renders the correct text');

    assert
      .dom(calloutCardButtonWrapperSelector)
      .exists({ count: 1 }, 'renders one button wrapper');

    const buttonSelector = buildNestedSelector(
      calloutCardButtonWrapperSelector,
      'button.Polaris-Button'
    );
    const buttons = assert.dom(buttonSelector);
    buttons.exists({ count: 1 }, 'renders one button');
    buttons.hasText('Primary action here', 'renders the correct button text');

    const images = assert.dom(calloutCardImageSelector);
    images.exists({ count: 1 }, 'renders one image');

    images.hasAttribute(
      'src',
      'http://www.somewhere.com/some-image.jpg',
      'renders the correct image'
    );
    images.hasAttribute('alt', '', 'renders an empty image title');
  });

  test('it renders the correct HTML in block form with secondary action', async function (assert) {
    await render(hbs`
      <PolarisCalloutCard
        @title="This is a block callout card"
        @illustration="http://www.somewhere.com/some-image.jpg"
        @primaryAction={{hash
          text="Primary action here"
          onAction=(action (mut primaryActionFired) true)
        }}
        @secondaryAction={{hash
          text="Secondary action here"
          onAction=(action (mut secondaryActionFired) true)
        }}
      >
        With a secondary action
      </PolarisCalloutCard>
    `);

    assert
      .dom(calloutCardSelector)
      .exists({ count: 1 }, 'renders one callout card');

    const headings = assert.dom(calloutCardContentHeadingSelector);
    headings.exists({ count: 1 }, 'renders one heading');
    headings.hasText(
      'This is a block callout card',
      'renders the correct heading'
    );

    const texts = assert.dom(calloutCardContentTextSelector);
    texts.exists({ count: 1 }, 'renders one text container');
    texts.hasText('With a secondary action', 'renders the correct text');

    assert
      .dom(calloutCardButtonWrapperSelector)
      .exists({ count: 1 }, 'renders one button wrapper');

    const buttonSelector = buildNestedSelector(
      calloutCardButtonWrapperSelector,
      'div.Polaris-ButtonGroup',
      'div.Polaris-ButtonGroup__Item',
      'button.Polaris-Button'
    );
    const buttons = findAll(buttonSelector);
    assert.equal(buttons.length, 2, 'renders two buttons');

    let button = buttons[0];
    assert
      .dom(button)
      .hasText(
        'Primary action here',
        'renders the correct primary button text'
      );
    assert
      .dom(button)
      .hasNoClass('Polaris-Button--plain', 'renders normal primary button');

    button = buttons[1];
    assert
      .dom(button)
      .hasText(
        'Secondary action here',
        'renders the correct secondary button text'
      );
    assert
      .dom(button)
      .hasClass('Polaris-Button--plain', 'renders plain secondary button');

    const images = assert.dom(calloutCardImageSelector);
    images.exists({ count: 1 }, 'renders one image');

    images.hasAttribute(
      'src',
      'http://www.somewhere.com/some-image.jpg',
      'renders the correct image'
    );
    images.hasAttribute('alt', '', 'renders an empty image title');
  });

  test('it handles actions correctly', async function (assert) {
    this.setProperties({
      primaryActionFired: false,
      secondaryActionFired: false,
    });

    await render(hbs`
      <PolarisCalloutCard
        @primaryAction={{hash
          text="Primary"
          onAction=(action (mut primaryActionFired) true)
        }}
        @secondaryAction={{hash
          text="Secondary"
          onAction=(action (mut secondaryActionFired) true)
        }}
      />
    `);

    // Fire the primary action.
    await click('button.Polaris-Button:first-of-type');
    assert.ok(
      this.get('primaryActionFired'),
      'after firing primary action - primary action has fired'
    );
    assert.notOk(
      this.get('secondaryActionFired'),
      'after firing primary action - secondary action has not fired'
    );

    await click('button.Polaris-Button.Polaris-Button--plain');
    assert.ok(
      this.get('secondaryActionFired'),
      'after firing secondary action - secondary action has been fired'
    );
  });

  test('it is dismissed', async function (assert) {
    await render(hbs`
      <PolarisCalloutCard
        @primaryAction={{hash
          text="Primary"
          onAction=(action (mut primaryActionFired) true)
        }}
        @onDismiss={{action (mut wasOnDismissCalled) true}}
      />
    `);

    assert.dom('.Polaris-Button').exists({ count: 2 });

    await click('.Polaris-Button');
    assert.ok(this.get('wasOnDismissCalled'));
  });
});
