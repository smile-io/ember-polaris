import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import { setProperties } from '@ember/object';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-thumbnail', 'Integration | Component | polaris thumbnail', {
  integration: true
});

const SRC = 'image.jpg';
const ALT = 'Polaris thumbnail component';
const THUMB_SELECTOR = 'span.Polaris-Thumbnail';

test('it renders the correct HTML when all attributes are passed in', function(assert) {
  setProperties(this, {
    src: SRC,
    alt: ALT,
    size: 'small'
  });

  this.render(hbs`{{polaris-thumbnail size=size source=src alt=alt}}`);

  let thumbnailSpan = find(THUMB_SELECTOR);
  let imageSelector = buildNestedSelector(THUMB_SELECTOR, '.Polaris-Thumbnail__Image');
  let image = find(imageSelector);

  // container properties:
  assert.ok(thumbnailSpan, 'thumbnail container element is rendered');
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeSmall'), 'correct size class is applied to container element');

  // thumbnail image properties:
  assert.ok(image, 'image element is rendered');
  assert.equal(image.getAttribute('src'), SRC, 'correct source attribute is applied to image node');
  assert.equal(image.getAttribute('alt'), ALT, 'correct alt text is applied to image node');
});

test('it renders a medium thumbnail when no size attribute is passed in', function(assert) {
  this.render(hbs`{{polaris-thumbnail}}`);

  let thumbnailSpan = find(THUMB_SELECTOR);

  // container properties:
  assert.ok(thumbnailSpan.classList.contains('Polaris-Thumbnail--sizeMedium'), 'medium size class is applied by default when no size attribute is present');
});
