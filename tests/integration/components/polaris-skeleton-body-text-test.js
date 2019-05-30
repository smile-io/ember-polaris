import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris skeleton body text', function(hooks) {
  setupRenderingTest(hooks);

  const containerSelector =
    'div.Polaris-SkeletonBodyText__SkeletonBodyTextContainer';
  const lineSelector = buildNestedSelector(
    containerSelector,
    'div.Polaris-SkeletonBodyText'
  );

  test('it renders the specified number of lines', async function(assert) {
    await render(hbs`{{polaris-skeleton-body-text lines=lines}}`);

    assert
      .dom(containerSelector)
      .exists({ count: 1 }, 'renders one skeleton body text container');

    assert
      .dom(lineSelector)
      .exists(
        { count: 3 },
        'lines not specified - renders three skeleton body text lines'
      );

    this.set('lines', 1);

    assert
      .dom(lineSelector)
      .exists(
        { count: 1 },
        'lines set to 1 - renders one skeleton body text line'
      );

    this.set('lines', 5);

    assert
      .dom(lineSelector)
      .exists(
        { count: 5 },
        'lines set to 5 - renders five skeleton body text lines'
      );
  });
});
