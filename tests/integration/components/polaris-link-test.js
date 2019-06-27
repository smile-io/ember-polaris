import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris link', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  const linkSelector = 'a.Polaris-Link';
  const linkButtonSelector = 'button.Polaris-Link';

  test('it renders the correct HTML in basic inline usage with a URL', async function(assert) {
    await render(
      hbs`{{polaris-link url="http://www.somewhere.com/" text="This is an inline link"}}`
    );

    const links = assert.dom(linkSelector);
    links.exists({ count: 1 }, 'renders one link');

    links.hasAttribute(
      'href',
      'http://www.somewhere.com/',
      'renders the correct href'
    );
    links.hasText('This is an inline link', 'renders the correct link text');

    links.hasAttribute(
      'data-polaris-unstyled',
      'true',
      'applies data-polaris-unstyled to the link'
    );
    links.doesNotHaveAttribute(
      'target',
      'does not set a target attribute on the link'
    );
    links.doesNotHaveAttribute(
      'rel',
      'does not set a rel attribute on the link'
    );
  });

  test('it renders the correct HTML in basic block usage with a URL', async function(assert) {
    await render(hbs`
      {{#polaris-link url="http://www.somewhere.com/"}}
        This is a block link
      {{/polaris-link}}
    `);

    const links = assert.dom(linkSelector);
    links.exists({ count: 1 }, 'renders one link');

    links.hasAttribute(
      'href',
      'http://www.somewhere.com/',
      'renders the correct href'
    );
    links.hasText('This is a block link', 'renders the correct link text');
    links.hasAttribute(
      'data-polaris-unstyled',
      'true',
      'applies data-polaris-unstyled to the link'
    );
    links.doesNotHaveAttribute(
      'target',
      'does not set a target attribute on the link'
    );
    links.doesNotHaveAttribute(
      'rel',
      'does not set a rel attribute on the link'
    );
  });

  test('it renders the correct HTML with external attribute', async function(assert) {
    await render(hbs`
      {{polaris-link
        url="http://www.somewhere.com/"
        external=true
        text="Testing external attribute"
      }}
    `);

    const links = assert.dom(linkSelector);
    links.exists({ count: 1 }, 'renders one link');

    links.hasAttribute(
      'target',
      '_blank',
      'sets the correct target attribute on the link'
    );

    links.hasAttribute(
      'rel',
      'noopener noreferrer',
      'sets the correct rel attribute on the link'
    );
  });

  test('it renders the correct HTML with monochrome attribute', async function(assert) {
    await render(hbs`
      {{polaris-link
        url="http://www.somewhere.com/"
        monochrome=true
        text="Testing monochrome attribute"
      }}
    `);

    const links = assert.dom(linkSelector);
    links.exists({ count: 1 }, 'renders one link');

    links.hasClass(
      'Polaris-Link--monochrome',
      'sets the monochrome class on the link'
    );
  });

  test('it renders the correct HTML in basic inline usage without a URL', async function(assert) {
    await render(hbs`{{polaris-link text="This is an inline link button"}}`);

    const linkButtons = assert.dom(linkButtonSelector);
    linkButtons.exists({ count: 1 }, 'renders one link button');

    linkButtons.hasText(
      'This is an inline link button',
      'renders the correct link text'
    );
  });

  test('it renders the correct HTML in basic block usage without a URL', async function(assert) {
    await render(hbs`
      {{#polaris-link}}
        This is a block link button
      {{/polaris-link}}
    `);

    const linkButton = assert.dom(linkButtonSelector);

    linkButton.exists({ count: 1 }, 'renders one link button');

    linkButton.hasText(
      'This is a block link button',
      'renders the correct link text'
    );
  });

  test('it handles click events correctly', async function(assert) {
    let clickHandlerCalled = false;
    this.actions.click = () => (clickHandlerCalled = true);

    await render(hbs`{{polaris-link onClick=(action "click")}}`);

    assert
      .dom(linkButtonSelector)
      .exists({ count: 1 }, 'renders one link button');

    await click(linkButtonSelector);
    assert.ok(clickHandlerCalled, 'click handler fired');
  });

  test('clicking a link navigates but does not bubble to the parent', async function(assert) {
    // Reset the hash part of the browser URL to keep this test valid on reruns.
    window.location.hash = 'linkNotClicked';

    let parentHandlerCalled = false;
    this.actions.parentClicked = () => (parentHandlerCalled = true);

    await render(hbs`
      <div {{action (action "parentClicked")}}>
        {{polaris-link url="#linkClicked"}}
      </div>
    `);

    assert.dom(linkSelector).exists({ count: 1 }, 'renders one link');

    await click(linkSelector);
    assert.equal(
      location.hash,
      '#linkClicked',
      'app navigates to specified URL'
    );
    assert.notOk(parentHandlerCalled, 'parent click handler is not fired');
  });

  test('clicking a link fires the onClick handler if present', async function(assert) {
    // Reset the hash part of the browser URL to keep this test valid on reruns.
    window.location.hash = 'linkNotClicked';

    this.set('clickHandlerCalled', false);
    let parentHandlerCalled = false;
    this.actions.parentClicked = () => (parentHandlerCalled = true);

    await render(hbs`
      <div {{action (action "parentClicked")}}>
        {{polaris-link
          url="#linkClicked"
          onClick=(action (mut clickHandlerCalled) true)
        }}
      </div>
    `);

    assert.dom(linkSelector).exists({ count: 1 }, 'renders one link');

    await click(linkSelector);
    assert.equal(
      location.hash,
      '#linkClicked',
      'app navigates to specified URL'
    );
    assert.ok(this.get('clickHandlerCalled'), 'link click handler is fired');
    assert.notOk(parentHandlerCalled, 'parent click handler is not fired');
  });

  test('clicking a link button performs the button action but does not bubble to the parent', async function(assert) {
    let parentHandlerCalled = false;
    let buttonHandlerCalled = false;

    this.actions.parentClicked = () => (parentHandlerCalled = true);
    this.actions.buttonClicked = () => (buttonHandlerCalled = true);

    await render(hbs`
      <div {{action (action "parentClicked")}}>
        {{polaris-link onClick=(action "buttonClicked")}}
      </div>
    `);

    assert
      .dom(linkButtonSelector)
      .exists({ count: 1 }, 'renders one link button');

    await click(linkButtonSelector);
    assert.ok(buttonHandlerCalled, 'button click handler is fired');
    assert.notOk(parentHandlerCalled, 'parent click handler is not fired');
  });

  test('it applies passed-in classes to the rendered element when rendering a link', async function(assert) {
    this.set('class', 'my-link click-me');
    await render(
      hbs`{{polaris-link class=class url="http://www.somewhere.com/"}}`
    );

    assert
      .dom(`${linkSelector}.my-link.click-me`)
      .exists('renders link with input classes');

    // Try updating the classes.
    this.set('class', 'click-me-to-go-somewhere');

    let link = assert.dom(`${linkSelector}.click-me-to-go-somewhere`);
    link.exists('renders link with updated classes');
    link.hasNoClass('my-link');
  });

  test('it applies passed-in classes to the rendered element when rendering a button', async function(assert) {
    this.set('class', 'my-button press-me');
    await render(hbs`{{polaris-link class=class}}`);

    assert
      .dom(`${linkButtonSelector}.my-button.press-me`)
      .exists('renders button with input classes');

    // Try updating the classes.
    this.set('class', 'press-me-to-make-something-happen');

    let linkButton = assert.dom(
      `${linkButtonSelector}.press-me-to-make-something-happen`
    );
    linkButton.exists('renders button with updated classes');
    linkButton.hasNoClass('my-button');
  });
});
