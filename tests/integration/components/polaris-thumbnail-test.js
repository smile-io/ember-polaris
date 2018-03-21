import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-thumbnail', 'Integration | Component | polaris thumbnail', {
  integration: true
});

const SRC = 'image.jpg';
const ALT = 'Polaris thumbnail component';
const THUMB_SELECTOR = 'span.Polaris-Thumbnail';

test('it renders the correct HTML when all attributes are passed in', function(assert) {
  this.setProperties({
    src: SRC,
    alt: ALT,
    size: 'small'
  });

  this.render(hbs`{{polaris-thumbnail size=size source=src alt=alt}}`);

  let thumbnailSpan = find(THUMB_SELECTOR);
  let imageSelector = buildNestedSelector(THUMB_SELECTOR, '.Polaris-Thumbnail__Image');
  let image = find(imageSelector);

  // Container properties:
  assert.ok(thumbnailSpan, 'thumbnail container element is rendered');
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeSmall'), 'correct size class is applied to container element');

  // Thumbnail image properties:
  assert.ok(image, 'image element is rendered');
  assert.equal(image.getAttribute('src'), SRC, 'correct source attribute is applied to image node');
  assert.equal(image.getAttribute('alt'), ALT, 'correct alt text is applied to image node');
});


test('it renders a correctly-sized thumbnail', function(assert) {
  this.set('size', null);
  this.render(hbs`{{polaris-thumbnail size=size}}`);

  let thumbnailSpan = find(THUMB_SELECTOR);

  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeSmall'), 'no size - does not apply small size class');
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeMedium'), 'no size - applies medium size class by default');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeLarge'), 'no size - does not apply large size class');

  this.set('size', 'small');
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeSmall'), 'size small - applies small size class');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeMedium'), 'size small - does not apply medium size class');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeLarge'), 'size small - does not apply large size class');

  this.set('size', 'medium');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeSmall'), 'size medium - does not apply small size class');
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeMedium'), 'size medium - applies medium size class');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeLarge'), 'size medium - does not apply large size class');

  this.set('size', 'large');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeSmall'), 'size large - does not apply small size class');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeMedium'), 'size large - does not apply medium size class');
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeLarge'), 'size large - applies large size class');

  this.set('size', 'unsupported');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeSmall'), 'unsupported size - does not apply small size class');
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeMedium'), 'unsupported size - falls back to applying medium size class');
  assert.notOk(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeLarge'), 'unsupported size - does not apply large size class');
});

test('it does not apply alt text if `alt` is not passed in', function(assert) {
  this.render(hbs`{{polaris-thumbnail}}`);

  let imageSelector = buildNestedSelector(THUMB_SELECTOR, '.Polaris-Thumbnail__Image');
  let image = find(imageSelector);

  assert.equal(image.getAttribute('alt'), null, 'no alt text - alt text is not applied to image');
});

test('it does not apply src if `source` is not passed in', function(assert) {
  this.render(hbs`{{polaris-thumbnail}}`);

  let imageSelector = buildNestedSelector(THUMB_SELECTOR, '.Polaris-Thumbnail__Image');
  let image = find(imageSelector);

  assert.equal(image.getAttribute('src'), null, 'no source - src is not applied to image');
});
