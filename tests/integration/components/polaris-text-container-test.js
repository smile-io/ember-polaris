import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | polaris text container', function (hooks) {
  setupRenderingTest(hooks);

  const textContainerSelector = 'div.Polaris-TextContainer';

  test('it renders the correct HTML in inline form', async function (assert) {
    await render(
      hbs`{{polaris-text-container text="This is some inline text"}}`
    );

    const textContainer = assert.dom(textContainerSelector);
    textContainer.exists({ count: 1 }, 'renders one text container');
    textContainer.hasText(
      'This is some inline text',
      'renders the correct content'
    );
  });

  test('it renders the correct HTML in block form', async function (assert) {
    await render(
      hbs`{{#polaris-text-container}}This is some block text{{/polaris-text-container}}`
    );

    const textContainer = assert.dom(textContainerSelector);
    textContainer.exists({ count: 1 }, 'renders one text container');
    textContainer.hasText(
      'This is some block text',
      'renders the correct content'
    );
  });

  test('it handles spacing correctly', async function (assert) {
    await render(hbs`{{polaris-text-container spacing=spacing}}`);

    const textContainer = assert.dom(textContainerSelector);
    textContainer.exists({ count: 1 }, 'renders one text container');

    textContainer.hasNoClass(
      'Polaris-TextContainer--spacingLoose',
      'unset spacing - does not apply loose spacing class'
    );
    textContainer.hasNoClass(
      'Polaris-TextContainer--spacingTight',
      'unset spacing - does not apply tight spacing class'
    );

    this.set('spacing', 'loose');
    textContainer.hasClass(
      'Polaris-TextContainer--spacingLoose',
      'loose spacing - applies loose spacing class'
    );
    textContainer.hasNoClass(
      'Polaris-TextContainer--spacingTight',
      'loose spacing - does not apply tight spacing class'
    );

    this.set('spacing', 'tight');
    textContainer.hasNoClass(
      'Polaris-TextContainer--spacingLoose',
      'tight spacing - does not apply loose spacing class'
    );
    textContainer.hasClass(
      'Polaris-TextContainer--spacingTight',
      'tight spacing - applies tight spacing class'
    );

    this.set('spacing', 'unsupported');
    textContainer.hasNoClass(
      'Polaris-TextContainer--spacingLoose',
      'unsupported spacing - does not apply loose spacing class'
    );
    textContainer.hasNoClass(
      'Polaris-TextContainer--spacingTight',
      'unsupported spacing - does not apply tight spacing class'
    );
  });
});
