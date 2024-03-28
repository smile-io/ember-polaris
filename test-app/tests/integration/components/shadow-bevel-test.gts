import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hash } from '@ember/helper';
import { ShadowBevel } from '@smile-io/ember-polaris';

module('Integration | Component | shadow-bevel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <ShadowBevel data-test-shadow-bevel @boxShadow="300" @borderRadius="300">
          <p>hello</p>
          <p>world</p>
        </ShadowBevel>
      </template>
    );

    assert.dom('[data-test-shadow-bevel] p').exists({ count: 2 });
  });

  test('disables bevel effect', async function (assert) {
    await render(
      <template>
        <ShadowBevel data-test-shadow-bevel @boxShadow="300" @borderRadius="300" @bevel={{false}} />
      </template>
    );

    assert.customDom('[data-test-shadow-bevel]').hasStyle({
      '--pc-shadow-bevel-box-shadow-xs': 'none',
      '--pc-shadow-bevel-border-radius-xs': 'var(--p-border-radius-0)',
      '--pc-shadow-bevel-content-xs': 'none',
    });
  });

  test('sets boxShadow and borderRadius props as inline styles', async function (assert) {
    await render(
      <template>
        <ShadowBevel data-test-shadow-bevel @boxShadow="300" @borderRadius="300" />
      </template>
    );

    assert.customDom('[data-test-shadow-bevel]').hasStyle({
      '--pc-shadow-bevel-box-shadow-xs': 'var(--p-shadow-300)',
      '--pc-shadow-bevel-border-radius-xs': 'var(--p-border-radius-300)',
      '--pc-shadow-bevel-content-xs': '""',
    });
  });

  test('sets boxShadow and borderRadius props as responsive inline styles', async function (assert) {
    await render(
      <template>
        <ShadowBevel
          data-test-shadow-bevel
          @boxShadow="300"
          @borderRadius="300"
          @bevel={{hash xs=false sm=true lg=false}}
        />
      </template>
    );

    assert.customDom('[data-test-shadow-bevel]').hasStyle({
      '--pc-shadow-bevel-box-shadow-xs': 'none',
      '--pc-shadow-bevel-box-shadow-sm': 'var(--p-shadow-300)',
      '--pc-shadow-bevel-box-shadow-lg': 'none',
      '--pc-shadow-bevel-border-radius-xs': 'var(--p-border-radius-0)',
      '--pc-shadow-bevel-border-radius-sm': 'var(--p-border-radius-300)',
      '--pc-shadow-bevel-border-radius-lg': 'var(--p-border-radius-0)',
      '--pc-shadow-bevel-content-xs': 'none',
      '--pc-shadow-bevel-content-sm': '""',
      '--pc-shadow-bevel-content-lg': 'none',
    });
  });

  test('sets as prop to the root element', async function (assert) {
    await render(
      <template>
        <ShadowBevel data-test-shadow-bevel @as="article" @boxShadow="300" @borderRadius="300" />
      </template>
    );

    assert.dom('[data-test-shadow-bevel]').hasTagName('article');
  });
});
