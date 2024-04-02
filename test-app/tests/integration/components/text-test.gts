import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { Text } from '@smile-io/ember-polaris';

module('Integration | Component | text', function (hooks) {
  setupRenderingTest(hooks);

  const text = "It's Friday then";

  test('it renders', async function (assert) {
    await render(
      <template>
        <Text data-test-text @as="h1" @variant="heading3xl">{{text}}</Text>
      </template>
    );

    assert.dom('[data-test-text]').hasText(text);
  });

  ['p', 'strong'].forEach((tagName) => {
    test('it renders the specified element', async function (assert) {
      await render(
        <template>
          <Text data-test-text @as={{tagName}} @variant="bodySm">{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').hasTagName(tagName);
    });
  });

  test('renders its children with variant text style', async function (assert) {
    await render(
      <template>
        <Text data-test-text @as="h2" @variant="heading3xl">{{text}}</Text>
      </template>
    );

    assert
      .dom('[data-test-text]')
      .hasClass(/heading3xl/)
      .hasTagName('h2');
  });

  module('alignment', function () {
    test('overrides default alignment', async function (assert) {
      await render(
        <template>
          <Text data-test-text @as="p" @alignment="center">{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').hasClass(/center/);
    });
  });

  module('tone', function () {
    test('renders children with tone', async function (assert) {
      await render(
        <template>
          <Text data-test-text @as="h2" @variant="heading3xl" @tone="success">{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').hasClass(/success/);
    });
  });

  module('fontWeight', function () {
    test('overrides the default variant font weight', async function (assert) {
      await render(
        <template>
          <Text data-test-text @as="h4" @variant="headingXl" @fontWeight="bold">{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').hasClass(/bold/);
    });

    test('no font weight when using body variant', async function (assert) {
      await render(
        <template>
          <Text data-test-text @as="h4" @variant="bodySm">{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').doesNotHaveClass(/bold/);
    });
  });

  module('truncate', function () {
    test('truncates texts', async function (assert) {
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt vel lorem nec pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi sollicitudin ex nec imperdiet pellentesque. Etiam dapibus ipsum non ligula molestie rhoncus. Vivamus eget iaculis lectus. Sed porttitor leo at nulla mollis malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vestibulum porttitor mollis. Nam dictum ante sed lobortis commodo. Ut luctus ut metus vel bibendum.';

      await render(
        <template>
          <Text data-test-text @as="p" @truncate={{true}}>{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').hasClass(/truncate/);
    });
  });

  module('visuallyHidden', function () {
    test('renders with the text hidden', async function (assert) {
      await render(
        <template>
          <Text data-test-text @as="p" @visuallyHidden={{true}}>{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').hasClass(/visuallyHidden/);
    });
  });

  module('textDecoration', function () {
    test('adds text decoration line-through when passed', async function (assert) {
      await render(
        <template>
          <Text data-test-text @as="p" @textDecorationLine="line-through">{{text}}</Text>
        </template>
      );

      assert.dom('[data-test-text]').hasClass(/line--through/);
    });
  });
});
