import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const titleSelector = '.Polaris-DisplayText';
const descriptionSelector = '.Polaris-TextStyle--variationSubdued';
const illustrationSelector = '.Polaris-EmptySearchResult__Image';

module('Integration | Component | polaris-empty-search-result', function (
  hooks
) {
  setupRenderingTest(hooks);

  test('displays the title with style `Display Small`', async function (assert) {
    const title = 'Foo';

    this.set('title', title);

    await render(hbs`
      {{polaris-empty-search-result
        title=title
      }}
    `);

    assert.dom(titleSelector).hasClass('Polaris-DisplayText--sizeSmall');
    assert.dom(titleSelector).hasText(title);
  });

  test('displays the description with style `Body Subdued`', async function (assert) {
    const description = 'Bar';

    this.set('description', description);

    await render(hbs`
      {{polaris-empty-search-result
        title="Foo"
        description=description
      }}
    `);

    assert.dom(descriptionSelector).exists();
    assert.dom(descriptionSelector).hasText(description);
  });

  test('does not display an image when `withIllustration` is false', async function (assert) {
    await render(hbs`
      {{polaris-empty-search-result
        title="Foo"
      }}
    `);

    assert.dom(illustrationSelector).doesNotExist();
  });

  test('displays the illustration when `withIllustration` is true', async function (assert) {
    await render(hbs`
      {{polaris-empty-search-result
        title="Foo"
        withIllustration=true
      }}
    `);

    assert.dom(illustrationSelector).exists();
  });
});
