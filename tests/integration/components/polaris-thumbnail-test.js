import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris thumbnail', function (hooks) {
  setupRenderingTest(hooks);

  const SRC = 'image.jpg';
  const ALT = 'Polaris thumbnail component';
  const THUMB_SELECTOR = 'span.Polaris-Thumbnail';

  test('it renders the correct HTML when all attributes are passed in', async function (assert) {
    this.setProperties({
      src: SRC,
      alt: ALT,
      size: 'small',
    });

    await render(hbs`{{polaris-thumbnail size=size source=src alt=alt}}`);

    let thumbnailSpan = assert.dom(THUMB_SELECTOR);

    // Container properties:
    thumbnailSpan.exists('thumbnail container element is rendered');
    thumbnailSpan.hasClass(
      'Polaris-Thumbnail--sizeSmall',
      'correct size class is applied to container element'
    );

    let imageSelector = buildNestedSelector(
      THUMB_SELECTOR,
      '.Polaris-Thumbnail__Image'
    );
    let image = assert.dom(imageSelector);

    // Thumbnail image properties:
    image.exists('image element is rendered');
    image.hasAttribute(
      'src',
      SRC,
      'correct source attribute is applied to image node'
    );
    image.hasAttribute('alt', ALT, 'correct alt text is applied to image node');
  });

  test('it renders a correctly-sized thumbnail', async function (assert) {
    await render(hbs`{{polaris-thumbnail}}`);

    let thumbnailSpan = assert.dom(THUMB_SELECTOR);

    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeSmall',
      'no size - does not apply small size class'
    );
    thumbnailSpan.hasClass(
      'Polaris-Thumbnail--sizeMedium',
      'no size - applies medium size class by default'
    );
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeLarge',
      'no size - does not apply large size class'
    );

    this.set('size', 'small');
    await render(hbs`{{polaris-thumbnail size=size}}`);

    thumbnailSpan = assert.dom(THUMB_SELECTOR);

    thumbnailSpan.hasClass(
      'Polaris-Thumbnail--sizeSmall',
      'size small - applies small size class'
    );
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeMedium',
      'size small - does not apply medium size class'
    );
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeLarge',
      'size small - does not apply large size class'
    );

    this.set('size', 'medium');
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeSmall',
      'size medium - does not apply small size class'
    );
    thumbnailSpan.hasClass(
      'Polaris-Thumbnail--sizeMedium',
      'size medium - applies medium size class'
    );
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeLarge',
      'size medium - does not apply large size class'
    );

    this.set('size', 'large');
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeSmall',
      'size large - does not apply small size class'
    );
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeMedium',
      'size large - does not apply medium size class'
    );
    thumbnailSpan.hasClass(
      'Polaris-Thumbnail--sizeLarge',
      'size large - applies large size class'
    );

    this.set('size', 'unsupported');
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeSmall',
      'unsupported size - does not apply small size class'
    );
    thumbnailSpan.hasClass(
      'Polaris-Thumbnail--sizeMedium',
      'unsupported size - falls back to applying medium size class'
    );
    thumbnailSpan.hasNoClass(
      'Polaris-Thumbnail--sizeLarge',
      'unsupported size - does not apply large size class'
    );
  });

  test('it does not apply alt text if `alt` is not passed in', async function (assert) {
    await render(hbs`{{polaris-thumbnail}}`);

    let imageSelector = buildNestedSelector(
      THUMB_SELECTOR,
      '.Polaris-Thumbnail__Image'
    );

    assert
      .dom(imageSelector)
      .doesNotHaveAttribute(
        'alt',
        'no alt text - alt text is not applied to image'
      );
  });

  test('it does not apply src if `source` is not passed in', async function (assert) {
    await render(hbs`{{polaris-thumbnail}}`);

    let imageSelector = buildNestedSelector(
      THUMB_SELECTOR,
      '.Polaris-Thumbnail__Image'
    );

    assert
      .dom(imageSelector)
      .doesNotHaveAttribute('src', 'no source - src is not applied to image');
  });
});
