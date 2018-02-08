import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, click } from 'ember-native-dom-helpers';

moduleForComponent('polaris-link', 'Integration | Component | polaris link', {
  integration: true
});

const linkSelector = 'a.Polaris-Link';
const linkButtonSelector = 'button.Polaris-Link';

test('it renders the correct HTML in basic inline usage with a URL', function(assert) {
  this.render(hbs`{{polaris-link url="http://www.somewhere.com/" text="This is an inline link"}}`);

  const links = findAll(linkSelector);
  assert.equal(links.length, 1, 'renders one link');

  const link = links[0];
  assert.equal(link.href, 'http://www.somewhere.com/', 'renders the correct href');
  assert.equal(link.textContent.trim(), 'This is an inline link', 'renders the correct link text');
  assert.equal(link.dataset.polarisUnstyled, 'true', 'applies data-polaris-unstyled to the link');
  assert.notOk(link.target, 'does not set a target attribute on the link');
  assert.notOk(link.rel, 'does not set a rel attribute on the link');
});

test('it renders the correct HTML in basic block usage with a URL', function(assert) {
  this.render(hbs`
    {{#polaris-link url="http://www.somewhere.com/"}}
      This is a block link
    {{/polaris-link}}
  `);

  const links = findAll(linkSelector);
  assert.equal(links.length, 1, 'renders one link');

  const link = links[0];
  assert.equal(link.href, 'http://www.somewhere.com/', 'renders the correct href');
  assert.equal(link.textContent.trim(), 'This is a block link', 'renders the correct link text');
  assert.equal(link.dataset.polarisUnstyled, 'true', 'applies data-polaris-unstyled to the link');
  assert.notOk(link.target, 'does not set a target attribute on the link');
  assert.notOk(link.rel, 'does not set a rel attribute on the link');
});

test('it renders the correct HTML with external attribute', function(assert) {
  this.render(hbs`
    {{polaris-link
      url="http://www.somewhere.com/"
      external=true
      text="Testing external attribute"
    }}
  `);

  const links = findAll(linkSelector);
  assert.equal(links.length, 1, 'renders one link');

  const link = links[0];
  assert.equal(link.target, '_blank', 'sets the correct target attribute on the link');
  assert.equal(link.rel, 'noopener noreferrer', 'sets the correct rel attribute on the link');
});

test('it renders the correct HTML in basic inline usage without a URL', function(assert) {
  this.render(hbs`{{polaris-link text="This is an inline link button"}}`);

  const linkButtons = findAll(linkButtonSelector);
  assert.equal(linkButtons.length, 1, 'renders one link button');

  const linkButton = linkButtons[0];
  assert.equal(linkButton.textContent.trim(), 'This is an inline link button', 'renders the correct link text');
});

test('it renders the correct HTML in basic block usage without a URL', function(assert) {
  this.render(hbs`
    {{#polaris-link}}
      This is a block link button
    {{/polaris-link}}
  `);

    const linkButtons = findAll(linkButtonSelector);
    assert.equal(linkButtons.length, 1, 'renders one link button');

    const linkButton = linkButtons[0];
    assert.equal(linkButton.textContent.trim(), 'This is a block link button', 'renders the correct link text');
});

test('it handles click events correctly', function(assert) {
  let clickHandlerCalled = false;
  this.on('click', () => {
    clickHandlerCalled = true;
  });

  this.render(hbs`{{polaris-link onClick=(action "click")}}`);

  const linkButtons = findAll(linkButtonSelector);
  assert.equal(linkButtons.length, 1, 'renders one link button');

  click(linkButtonSelector);
  assert.ok(clickHandlerCalled, 'click handler fired');
});

test('clicking a link navigates but does not bubble to the parent', function(assert) {
  // Reset the hash part of the browser URL to keep this test valid on reruns.
  window.location.hash = 'linkNotClicked';

  let parentHandlerCalled = false;
  this.on('parentClicked', () => {
    parentHandlerCalled = true;
  });

  this.render(hbs`
    <div {{action (action "parentClicked")}}>
      {{polaris-link url="#linkClicked"}}
    </div>
  `);

  const links = findAll(linkSelector);
  assert.equal(links.length, 1, 'renders one link');

  click(linkSelector);
  assert.equal(location.hash, '#linkClicked', 'app navigates to specified URL');
  assert.notOk(parentHandlerCalled, 'parent click handler is not fired');
});

test('clicking a link fires the onClick handler if present', function(assert) {
  // Reset the hash part of the browser URL to keep this test valid on reruns.
  window.location.hash = 'linkNotClicked';

  this.set('clickHandlerCalled', false);
  let parentHandlerCalled = false;
  this.on('parentClicked', () => {
    parentHandlerCalled = true;
  });

  this.render(hbs`
    <div {{action (action "parentClicked")}}>
      {{polaris-link
        url="#linkClicked"
        onClick=(action (mut clickHandlerCalled) true)
      }}
    </div>
  `);

  const links = findAll(linkSelector);
  assert.equal(links.length, 1, 'renders one link');

  click(linkSelector);
  assert.equal(location.hash, '#linkClicked', 'app navigates to specified URL');
  assert.ok(this.get('clickHandlerCalled'), 'link click handler is fired');
  assert.notOk(parentHandlerCalled, 'parent click handler is not fired');
});

test('clicking a link button performs the button action but does not bubble to the parent', function(assert) {
  let parentHandlerCalled = false;
  this.on('parentClicked', () => {
    parentHandlerCalled = true;
  });
  let buttonHandlerCalled = false;
  this.on('buttonClicked', () => {
    buttonHandlerCalled = true;
  });

  this.render(hbs`
    <div {{action (action "parentClicked")}}>
      {{polaris-link onClick=(action "buttonClicked")}}
    </div>
  `);

  const linkButtons = findAll(linkButtonSelector);
  assert.equal(linkButtons.length, 1, 'renders one link button');

  click(linkButtonSelector);
  assert.ok(buttonHandlerCalled, 'button click handler is fired');
  assert.notOk(parentHandlerCalled, 'parent click handler is not fired');
});

test('it applies passed-in classes to the rendered element when rendering a link', function(assert) {
  this.set('class', 'my-link click-me');
  this.render(hbs`{{polaris-link class=class url="http://www.somewhere.com/"}}`);

  let link = find(`${linkSelector}.my-link.click-me`);
  assert.ok(link, 'renders link with input classes');

  // Try updating the classes.
  this.set('class', 'click-me-to-go-somewhere');

  link = find(`${linkSelector}.click-me-to-go-somewhere`);
  assert.ok(link, 'renders link with updated classes');
  assert.notOk(link.classList.contains('my-link'));
});

test('it applies passed-in classes to the rendered element when rendering a button', function(assert) {
  this.set('class', 'my-button press-me');
  this.render(hbs`{{polaris-link class=class}}`);

  let linkButton = find(`${linkButtonSelector}.my-button.press-me`);
  assert.ok(linkButton, 'renders button with input classes');

  // Try updating the classes.
  this.set('class', 'press-me-to-make-something-happen');

  linkButton = find(`${linkButtonSelector}.press-me-to-make-something-happen`);
  assert.ok(linkButton, 'renders button with updated classes');
  assert.notOk(linkButton.classList.contains('my-button'));
});
