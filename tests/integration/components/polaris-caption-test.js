import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | polaris caption', function (hooks) {
  setupRenderingTest(hooks);

  const captionText = 'Received April 21, 2017';
  const captionSelector = '[data-test-caption]';

  test('it renders the correct HTML with inline usage', async function (assert) {
    this.set('text', captionText);
    await render(hbs`<PolarisCaption @text={{text}} />`);

    assert
      .dom(captionSelector)
      .exists('it renders the caption')
      .hasTagName('p', 'renders as a `p` tag')
      .hasText(captionText, 'it renders the correct caption text');
  });

  test('it renders the correct HTML with block usage', async function (assert) {
    this.set('caption', captionText);
    await render(hbs`
      <PolarisCaption>
        {{caption}}
      </PolarisCaption>
    `);

    assert
      .dom(captionSelector)
      .exists('it renders the caption')
      .hasTagName('p', 'renders as a `p` tag')
      .hasText(captionText, 'it renders the correct caption text');
  });
});
