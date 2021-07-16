import { hbs } from 'ember-cli-htmlbars';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, settled } from '@ember/test-helpers';

const avatar = '[data-test-avatar]';
const avatarSvg = '[data-test-avatar-svg]';
const avatarInitials = '[data-test-avatar-initials]';
const avatarImg = '[data-test-avatar-img]';

module('Integration | Component | polaris-avatar', function (hooks) {
  setupRenderingTest(hooks);

  module('intials', function () {
    test('renders intials if the image is not provided', async function (assert) {
      await render(hbs`<PolarisAvatar @initials="DL" />`);
      assert.dom(avatarSvg).exists({ count: 1 });
    });
  });

  module('source', function () {
    test('renders an Image component with the Avatar source if one is provided', async function (assert) {
      this.set('src', 'image/path/');
      await render(hbs`<PolarisAvatar @source={{this.src}} />`);

      assert.dom(avatarImg).hasAttribute('src', this.src);

      this.set('src', 'image/new/path/');
      assert.ok(true, 'safely updates - no errors');
    });
  });

  module('customer', function () {
    test('renders an inline svg', async function (assert) {
      await render(hbs`<PolarisAvatar @customer={{true}} />`);
      assert.dom(avatarSvg).exists({ count: 1 });
    });

    test('does not render a customer Avatar if a source is provided', async function (assert) {
      await render(
        hbs`<PolarisAvatar @customer={{true}} @source="image.png" />`
      );
      assert.dom(avatarSvg).doesNotExist();
    });
  });

  module('initials', function () {
    test('renders initials if the Image onError prop is triggered and the Intials are provided', async function (assert) {
      await render(hbs`
        <PolarisAvatar @size="large" @initials="DL" @source="image/path/" />
      `);

      assert.dom(avatarImg).exists();
      assert.dom(avatarInitials).doesNotExist();

      await triggerEvent(avatarImg, 'onerror');

      assert.dom(avatarImg).doesNotExist();
      assert.dom(avatarInitials).hasClass('Polaris-Avatar__Initials');
    });

    test('renders an inline svg if initials are blank', async function (assert) {
      await render(hbs`<PolarisAvatar @initials="" />`);
      assert.dom(avatarSvg).exists({ count: 1 });
    });
  });

  module('consumer-specified "onError" hook', function () {
    test('gets invoked in the event of an error', async function (assert) {
      assert.expect(1);

      this.set('handleError', () =>
        assert.ok(true, 'invokes onError callback')
      );

      await render(hbs`
        <PolarisAvatar @size="large" initials="DL" @source="image/path/" @onError={{this.handleError}} />
      `);

      await triggerEvent(avatarImg, 'onerror');
    });
  });

  module('on Error with changed props', function () {
    test('re-renders the image if a the source prop is changed after an error', async function (assert) {
      this.set('src', 'image/path/');

      await render(hbs`
        <PolarisAvatar @size="large" @initials="DL" @source={{this.src}} />
      `);

      await triggerEvent(avatarImg, 'onerror');

      assert.dom(avatarImg).doesNotExist();

      this.set('src', 'image/goodPath/');
      await settled();

      assert.dom(avatarImg).exists({ count: 1 });
    });
  });

  module('accessibilityLabel', function () {
    test('is passed to the aria-label', async function (assert) {
      await render(hbs`
        <PolarisAvatar @accessibilityLabel="Hello World" />
      `);
      assert.dom(avatar).hasAttribute('aria-label', 'Hello World');
    });
  });

  module('name', function () {
    test('is passed to the aria-label', async function (assert) {
      await render(hbs`<PolarisAvatar @name="Hello World" />`);
      assert.dom(avatar).hasAttribute('aria-label', 'Hello World');
    });
  });
});
