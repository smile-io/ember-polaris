import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-link', 'Integration | Component | polaris link', {
  integration: true
});

const linkSelector = 'a.Polaris-Link';

test('it renders the correct HTML in basic inline usage', function(assert) {
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

test('it renders the correct HTML in basic block usage', function(assert) {
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
