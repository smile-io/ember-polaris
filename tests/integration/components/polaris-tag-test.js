import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('polaris-tag', 'Integration | Component | polaris tag', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // this.render(hbs`{{polaris-tag tag='howdy'}}`);
  this.set('onRemove', function() {
    console.log('derp');
  });

  // Template block usage:
  this.render(hbs`
    {{#polaris-tag onRemove=(action onRemove)}}
      tag name here
    {{/polaris-tag}}
  `);

  let tag = find('.Polaris-Tag');
  console.log(tag);
  debugger
  assert.ok(true)
});
