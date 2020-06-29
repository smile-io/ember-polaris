import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris link', function(hooks) {
  setupRenderingTest(hooks);

  const linkSelector = 'a.Polaris-Link';
  const linkButtonSelector = 'button.Polaris-Link';

  test('it renders the correct HTML in basic inline usage with a URL', async function(assert) {
    await render(
      hbs`{{polaris-link url="http://www.somewhere.com/" text="This is an inline link"}}`
    );

    assert.dom(linkSelector).exists({ count: 1 }, 'renders one link');
    assert
      .dom(linkSelector)
      .hasAttribute(
        'href',
        'http://www.somewhere.com/',
        'renders the correct href'
      );
    assert
      .dom(linkSelector)
      .hasText('This is an inline link', 'renders the correct link text');

    assert
      .dom(linkSelector)
      .hasAttribute(
        'data-polaris-unstyled',
        'true',
        'applies data-polaris-unstyled to the link'
      );
    assert
      .dom(linkSelector)
      .doesNotHaveAttribute(
        'target',
        'does not set a target attribute on the link'
      );
    assert
      .dom(linkSelector)
      .doesNotHaveAttribute('rel', 'does not set a rel attribute on the link');
  });

  test('it renders the correct HTML in basic block usage with a URL', async function(assert) {
    await render(hbs`
      {{#polaris-link url="http://www.somewhere.com/"}}
        This is a block link
      {{/polaris-link}}
    `);

    assert.dom(linkSelector).exists({ count: 1 }, 'renders one link');
    assert
      .dom(linkSelector)
      .hasAttribute(
        'href',
        'http://www.somewhere.com/',
        'renders the correct href'
      );
    assert
      .dom(linkSelector)
      .hasText('This is a block link', 'renders the correct link text');
    assert
      .dom(linkSelector)
      .hasAttribute(
        'data-polaris-unstyled',
        'true',
        'applies data-polaris-unstyled to the link'
      );
    assert
      .dom(linkSelector)
      .doesNotHaveAttribute(
        'target',
        'does not set a target attribute on the link'
      );
    assert
      .dom(linkSelector)
      .doesNotHaveAttribute('rel', 'does not set a rel attribute on the link');
  });

  test('it renders the correct HTML with external attribute', async function(assert) {
    await render(hbs`
      {{polaris-link
        url="http://www.somewhere.com/"
        external=true
        text="Testing external attribute"
      }}
    `);

    assert
      .dom(linkSelector)
      .hasAttribute(
        'target',
        '_blank',
        'sets the correct target attribute on the link'
      );

    assert
      .dom(linkSelector)
      .hasAttribute(
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

    assert
      .dom(linkSelector)
      .hasClass(
        'Polaris-Link--monochrome',
        'sets the monochrome class on the link'
      );
  });

  test('it renders the correct HTML in basic inline usage without a URL', async function(assert) {
    await render(hbs`{{polaris-link text="This is an inline link button"}}`);

    assert
      .dom(linkButtonSelector)
      .exists({ count: 1 }, 'renders one link button');
    assert
      .dom(linkButtonSelector)
      .hasText(
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

    assert
      .dom(linkButtonSelector)
      .exists({ count: 1 }, 'renders one link button');
    assert
      .dom(linkButtonSelector)
      .hasText('This is a block link button', 'renders the correct link text');
  });

  test('it handles click events correctly', async function(assert) {
    this.handleClick = () => assert.ok('onClick is fired correctly');

    await render(hbs`{{polaris-link onClick=this.handleClick}}`);

    assert
      .dom(linkButtonSelector)
      .exists({ count: 1 }, 'renders one link button');

    await click(linkButtonSelector);
  });

  test('clicking a link navigates but does not bubble to the parent', async function(assert) {
    // Reset the hash part of the browser URL to keep this test valid on reruns.
    window.location.hash = 'linkNotClicked';

    this.handleParentClicked = () => assert.notOk("click event doesn't bubble");

    await render(hbs`
      {{!-- template-lint-disable no-invalid-interactive --}}
      <div {{on "click" this.handleParentClicked}}>
        {{polaris-link url="#linkClicked"}}
      </div>
    `);

    await click(linkSelector);
    assert.equal(
      location.hash,
      '#linkClicked',
      'app navigates to specified URL'
    );
  });

  test('clicking a link fires the onClick handler if present', async function(assert) {
    // Reset the hash part of the browser URL to keep this test valid on reruns.
    window.location.hash = 'linkNotClicked';

    assert.expect(3);

    this.handleParentClicked = () =>
      assert.notOk(true, "click event doesn't bubble to the parent");
    this.handleClick = (event) => {
      assert.ok(true, '@onClick handler is fired');
      assert.notOk(event, 'click event is not curried to @onClick handler');
    };

    await render(hbs`
      <div {{on "click" this.handleParentClicked}}>
        {{polaris-link
          url="#linkClicked"
          onClick=this.handleClick
        }}
      </div>
    `);

    await click(linkSelector);
    assert.equal(
      location.hash,
      '#linkClicked',
      'app navigates to specified URL'
    );
  });

  test('clicking a link button performs the button action but does not bubble to the parent', async function(assert) {
    assert.expect(3);

    this.handleParentClicked = () =>
      assert.notOk(true, "click event doesn't bubble to the parent");
    this.handleClick = (event) => {
      assert.ok(true, '@onClick handler is fired');
      assert.notOk(event, 'click event is not curried to @onClick handler');
    };

    await render(hbs`
      <div {{on "click" this.handleParentClicked}}>
        {{polaris-link onClick=this.handleClick}}
      </div>
    `);

    assert
      .dom(linkButtonSelector)
      .exists({ count: 1 }, 'renders one link button');

    await click(linkButtonSelector);
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
