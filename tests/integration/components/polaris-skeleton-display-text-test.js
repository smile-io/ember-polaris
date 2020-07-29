import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris skeleton display text', function (
  hooks
) {
  setupRenderingTest(hooks);

  const textSelector = 'div.Polaris-SkeletonDisplayText__DisplayText';

  test('it renders the correct size', async function (assert) {
    await render(hbs`{{polaris-skeleton-display-text size=size}}`);

    let text = assert.dom(textSelector);
    text.exists({ count: 1 }, 'renders one skeleton display text');

    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeSmall',
      'size unset - does not apply small size'
    );
    text.hasClass(
      'Polaris-SkeletonDisplayText--sizeMedium',
      'size unset - applies medium size'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeLarge',
      'size unset - does not apply large size'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeExtraLarge',
      'size unset - does not apply extra-large size'
    );

    this.set('size', 'small');
    text.hasClass(
      'Polaris-SkeletonDisplayText--sizeSmall',
      'size small - applies small class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeMedium',
      'size small - does not apply medium class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeLarge',
      'size small - does not apply large class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeExtraLarge',
      'size small - does not apply extra-large class'
    );

    this.set('size', 'medium');
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeSmall',
      'size medium - does not apply small class'
    );
    text.hasClass(
      'Polaris-SkeletonDisplayText--sizeMedium',
      'size medium - applies medium class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeLarge',
      'size medium - does not apply large class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeExtraLarge',
      'size medium - does not apply extra-large class'
    );

    this.set('size', 'large');
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeSmall',
      'size large - does not apply small class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeMedium',
      'size large - does not apply medium class'
    );
    text.hasClass(
      'Polaris-SkeletonDisplayText--sizeLarge',
      'size large - applies large class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeExtraLarge',
      'size large - does not apply extra-large class'
    );

    this.set('size', 'extraLarge');
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeSmall',
      'size extra-large - does not apply small class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeMedium',
      'size extra-large - does not apply medium class'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeLarge',
      'size extra-large - does not apply large class'
    );
    text.hasClass(
      'Polaris-SkeletonDisplayText--sizeExtraLarge',
      'size extra-large - applies extra-large class'
    );

    this.set('size', 'unsupported');
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeSmall',
      'size unsupported - does not apply small size'
    );
    text.hasClass(
      'Polaris-SkeletonDisplayText--sizeMedium',
      'size unsupported - applies medium size'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeLarge',
      'size unsupported - does not apply large size'
    );
    text.hasNoClass(
      'Polaris-SkeletonDisplayText--sizeExtraLarge',
      'size unsupported - does not apply extra-large size'
    );
  });
});
