import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris text style', function (hooks) {
  setupRenderingTest(hooks);

  const textStyleSelector = '[data-test-text-style]';

  test('it renders the correct HTML in inline usage with default attributes', async function (assert) {
    await render(hbs`{{polaris-text-style text="Inline styled text"}}`);

    assert
      .dom(textStyleSelector)
      .hasText('Inline styled text', 'renders the correct content');
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationPositive',
        'does not apply positive class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationNegative',
        'does not apply negative class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationStrong',
        'does not apply strong class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationSubdued',
        'does not apply subdued class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationCode',
        'does not apply code class'
      );
  });

  test('it renders the correct HTML in block usage with default attributes', async function (assert) {
    await render(
      hbs`{{#polaris-text-style}}Block styled text{{/polaris-text-style}}`
    );

    assert
      .dom(textStyleSelector)
      .hasText('Block styled text', 'renders the correct content');
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationPositive',
        'does not apply positive class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationNegative',
        'does not apply negative class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationStrong',
        'does not apply strong class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationSubdued',
        'does not apply subdued class'
      );
    assert
      .dom(textStyleSelector)
      .hasNoClass(
        'Polaris-TextStyle--variationCode',
        'does not apply code class'
      );
  });

  test('it handles the variation attribute correctly', async function (assert) {
    this.set('variation', 'positive');

    await render(hbs`{{polaris-text-style variation=variation}}`);

    let elementTag = find(textStyleSelector).tagName;
    assert
      .dom(textStyleSelector)
      .hasClass(
        'Polaris-TextStyle--variationPositive',
        'positive variation - applies positive class'
      );
    assert.equal(
      elementTag,
      'SPAN',
      'positive variation - is rendered as a span tag'
    );

    this.set('variation', 'negative');
    assert
      .dom(textStyleSelector)
      .hasClass(
        'Polaris-TextStyle--variationNegative',
        'negative variation - applies negative class'
      );
    assert.equal(
      elementTag,
      'SPAN',
      'negative variation - is rendered as a span tag'
    );

    this.set('variation', 'strong');
    assert
      .dom(textStyleSelector)
      .hasClass(
        'Polaris-TextStyle--variationStrong',
        'strong variation - applies strong class'
      );
    assert.equal(
      find(textStyleSelector).tagName,
      'SPAN',
      'strong variation - is rendered as a span tag'
    );

    this.set('variation', 'subdued');
    assert
      .dom(textStyleSelector)
      .hasClass(
        'Polaris-TextStyle--variationSubdued',
        'subdued variation - applies subdued class'
      );
    assert.equal(
      find(textStyleSelector).tagName,
      'SPAN',
      'subdued variation - is rendered as a span tag'
    );

    this.set('variation', 'code');
    assert
      .dom(textStyleSelector)
      .hasClass(
        'Polaris-TextStyle--variationCode',
        'code variation - applies code class'
      );
    assert.equal(
      find(textStyleSelector).tagName,
      'CODE',
      'code variation - is rendered as a code tag'
    );
  });

  test('it supports passing custom style classes', async function (assert) {
    await render(hbs`
      {{polaris-text-style
        classes="custom-class"
        variation="strong"
        text="My text"
      }}
    `);

    assert
      .dom(textStyleSelector)
      .hasClass('custom-class', 'applies custom style classes');
  });
});
