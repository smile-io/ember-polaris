import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';

moduleForComponent('polaris-skeleton-display-text', 'Integration | Component | polaris skeleton display text', {
  integration: true
});

const textSelector = 'div.Polaris-SkeletonDisplayText__DisplayText';

test('it renders the correct size', function(assert) {
  this.render(hbs`{{polaris-skeleton-display-text size=size}}`);

  let texts = findAll(textSelector);
  assert.equal(texts.length, 1, 'renders one skeleton display text');

  let text = texts[0];
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeSmall'), 'size unset - does not apply small size');
  assert.ok(text.classList.contains('Polaris-SkeletonDisplayText--sizeMedium'), 'size unset - applies medium size');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeLarge'), 'size unset - does not apply large size');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeExtraLarge'), 'size unset - does not apply extra-large size');

  this.set('size', 'small');
  assert.ok(text.classList.contains('Polaris-SkeletonDisplayText--sizeSmall'), 'size small - applies small class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeMedium'), 'size small - does not apply medium class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeLarge'), 'size small - does not apply large class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeExtraLarge'), 'size small - does not apply extra-large class');

  this.set('size', 'medium');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeSmall'), 'size medium - does not apply small class');
  assert.ok(text.classList.contains('Polaris-SkeletonDisplayText--sizeMedium'), 'size medium - applies medium class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeLarge'), 'size medium - does not apply large class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeExtraLarge'), 'size medium - does not apply extra-large class');

  this.set('size', 'large');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeSmall'), 'size large - does not apply small class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeMedium'), 'size large - does not apply medium class');
  assert.ok(text.classList.contains('Polaris-SkeletonDisplayText--sizeLarge'), 'size large - applies large class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeExtraLarge'), 'size large - does not apply extra-large class');

  this.set('size', 'extraLarge');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeSmall'), 'size extra-large - does not apply small class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeMedium'), 'size extra-large - does not apply medium class');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeLarge'), 'size extra-large - does not apply large class');
  assert.ok(text.classList.contains('Polaris-SkeletonDisplayText--sizeExtraLarge'), 'size extra-large - applies extra-large class');

  this.set('size', 'unsupported');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeSmall'), 'size unsupported - does not apply small size');
  assert.ok(text.classList.contains('Polaris-SkeletonDisplayText--sizeMedium'), 'size unsupported - applies medium size');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeLarge'), 'size unsupported - does not apply large size');
  assert.notOk(text.classList.contains('Polaris-SkeletonDisplayText--sizeExtraLarge'), 'size unsupported - does not apply extra-large size');
});
