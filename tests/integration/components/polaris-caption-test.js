import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('polaris-caption', 'Integration | Component | polaris caption', {
  integration: true
});

const caption = 'Received April 21, 2017'
const componentSelector = 'p.Polaris-Caption';

test('it renders the correct HTML with inline usage', function(assert) {
  this.set('text', caption);
  this.render(hbs`{{polaris-caption text=text}}`);

  const captionNode = find(componentSelector);

  assert.ok(captionNode, 'it renders the caption');
  assert.equal(captionNode.textContent.trim(), caption, 'it renders the correct caption text');
});

test('it renders the correct HTML with block usage', function(assert) {
  this.set('caption', caption);
  this.render(hbs`
    {{#polaris-caption}}
      {{caption}}
    {{/polaris-caption}}
  `);

  const captionNode = find(componentSelector);

  assert.ok(captionNode, 'it renders the caption');
  assert.equal(captionNode.textContent.trim(), caption, 'it renders the correct caption text');
});
