import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-badge', 'Integration | Component | polaris badge', {
  integration: true
});

const badgeSelector = 'span.Polaris-Badge';

test('it renders the correct HTML in basic inline usage', function(assert) {
  this.render(hbs`{{polaris-badge text="Inline badge"}}`);

  const badges = findAll(badgeSelector);
  assert.equal(badges.length, 1, 'renders one badge');
  assert.equal(badges[0].textContent.trim(), 'Inline badge')
});

test('it renders the correct HTML in basic block usage', function(assert) {
  this.render(hbs`
    {{#polaris-badge}}
      Block badge
    {{/polaris-badge}}
  `);

  const badges = findAll(badgeSelector);
  assert.equal(badges.length, 1, 'renders one badge');
  assert.equal(badges[0].textContent.trim(), 'Block badge')
});
