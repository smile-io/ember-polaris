import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module(
  'Integration | Component | polaris skeleton thumbnail',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`{{polaris-skeleton-thumbnail}}`);

      assert.dom('div.Polaris-SkeletonThumbnail').exists({ count: 1 });
    });

    test('it applies the correct size class', async function (assert) {
      await render(hbs`{{polaris-skeleton-thumbnail size=size}}`);

      assert
        .dom('div.Polaris-SkeletonThumbnail')
        .hasClass('Polaris-SkeletonThumbnail--sizeMedium');

      this.set('size', 'small');
      assert
        .dom('div.Polaris-SkeletonThumbnail')
        .hasClass('Polaris-SkeletonThumbnail--sizeSmall');

      this.set('size', 'large');
      assert
        .dom('div.Polaris-SkeletonThumbnail')
        .hasClass('Polaris-SkeletonThumbnail--sizeLarge');

      this.set('size', 'something invalid');
      assert
        .dom('div.Polaris-SkeletonThumbnail')
        .hasClass('Polaris-SkeletonThumbnail--sizeMedium');
    });
  }
);
