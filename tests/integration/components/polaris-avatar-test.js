import { hbs } from 'ember-cli-htmlbars';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';

module('Integration | Component | polaris-avatar', function (hooks) {
  setupRenderingTest(hooks);

  module('intials', function () {
    test('renders intials if the image is not provided', async function (assert) {
      await render(hbs`{{polaris-avatar initials="DL"}}`);
      assert.dom('span[role="img"] span svg').exists({ count: 1 });
    });
  });

  module('source', function () {
    skip('renders an Image component with the Avatar source if one is provided', async function (assert) {
      await render(hbs`{{polaris-avatar source="image.png"}}`);
      assert.dom('img').hasAttribute('src', 'image.png');
    });
  });

  module('customer', function () {
    skip('renders an Image component with a customer Avatar if the customer prop is true', async function (assert) {
      await render(hbs`{{polaris-avatar customer=true}}`);
      assert.dom('img').hasAttribute('src', /avatar-/);
    });

    skip('does not render a customer Avatar if a source is provided', async function (assert) {
      await render(hbs`{{polaris-avatar customer=true source="image.png"}}`);
      assert.dom('img').hasAttribute('src', /(?!avatar-)/);
    });
  });

  module('on Error with Initials', function () {
    skip('renders initials if the Image onError prop is triggered and the Intials are provided', async function (assert) {
      const src = 'image/path/';
      this.set('src', src);
      await render(hbs`
        {{polaris-avatar size="large" initials="DL" source=src}}
      `);
      assert.dom('span[role="img"] span svg').doesNotExist();
      await triggerEvent('img', 'onerror');
      assert.dom('span[role="img"] span svg').exists({ count: 1 });
    });
  });

  module('on Error with changed props', function () {
    skip('re-renders the image if a the source prop is changed after an error', async function (assert) {
      const src = 'image/path/';
      const workingSrc = 'image/goodPath/';
      this.set('src', src);
      await render(hbs`
        {{polaris-avatar size="large" initials="DL" source=src}}
      `);
      await triggerEvent('img', 'onerror');
      assert.dom('img').doesNotExist();
      this.set('src', workingSrc);
      assert.dom('img').exists({ count: 1 });
    });
  });

  module('accessibilityLabel', function () {
    test('is passed to the aria-label', async function (assert) {
      await render(hbs`
        {{polaris-avatar accessibilityLabel="Hello World"}}
      `);
      assert.dom('span:first-child').hasAttribute('aria-label', 'Hello World');
    });
  });

  module('name', function () {
    test('is passed to the aria-label', async function (assert) {
      await render(hbs`{{polaris-avatar name="Hello World"}}`);
      assert.dom('span:first-child').hasAttribute('aria-label', 'Hello World');
    });
  });
});
