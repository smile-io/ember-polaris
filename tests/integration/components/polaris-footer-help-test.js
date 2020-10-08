import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import { matchesIcon } from '../../helpers/matches-icon';

module('Integration | Component | polaris footer help', function (hooks) {
  setupRenderingTest(hooks);

  const footerHelpContentSelector = buildNestedSelector(
    'div.Polaris-FooterHelp',
    'div.Polaris-FooterHelp__Content'
  );
  const footerHelpIconSelector = buildNestedSelector(
    footerHelpContentSelector,
    'div.Polaris-FooterHelp__Icon',
    'span.Polaris-Icon'
  );
  const footerHelpTextSelector = buildNestedSelector(
    footerHelpContentSelector,
    'div.Polaris-FooterHelp__Text'
  );

  test('it renders the correct HTML in inline usage', async function (assert) {
    await render(hbs`{{polaris-footer-help text="Looking for help?"}}`);

    assert.dom(footerHelpContentSelector).exists(
      {
        count: 1,
      },
      'renders one footer help component with contents'
    );

    // Check the icon.
    assert.dom(footerHelpIconSelector).exists(
      {
        count: 1,
      },
      'renders one footer help icon'
    );

    assert.ok(
      matchesIcon(footerHelpIconSelector, 'QuestionMarkMajor'),
      'renders the correct icon'
    );
    assert
      .dom(footerHelpIconSelector)
      .hasClass(
        'Polaris-Icon--colorTeal',
        'renders the icon with the correct color'
      );
    assert
      .dom(footerHelpIconSelector)
      .hasClass('Polaris-Icon--hasBackdrop', 'renders the icon with backdrop');

    // Check the text.
    const footerHelpTexts = assert.dom(footerHelpTextSelector);

    footerHelpTexts.exists(
      {
        count: 1,
      },
      'renders one footer help text wrapper'
    );
    footerHelpTexts.hasText('Looking for help?', 'renders the correct text');
  });

  test('it renders the correct HTML in block usage', async function (assert) {
    await render(hbs`
      {{#polaris-footer-help}}
        Looking for help?
      {{/polaris-footer-help}}
    `);

    assert.dom(footerHelpContentSelector).exists(
      {
        count: 1,
      },
      'renders one footer help component with contents'
    );

    // Check the icon.
    const footerHelpIcons = assert.dom(footerHelpIconSelector);
    footerHelpIcons.exists(
      {
        count: 1,
      },
      'renders one footer help icon'
    );

    assert.ok(
      matchesIcon(footerHelpIconSelector, 'QuestionMarkMajor'),
      'renders the correct icon'
    );
    assert
      .dom(footerHelpIconSelector)
      .hasClass(
        'Polaris-Icon--colorTeal',
        'renders the icon with the correct color'
      );
    assert
      .dom(footerHelpIconSelector)
      .hasClass('Polaris-Icon--hasBackdrop', 'renders the icon with backdrop');

    // Check the text.
    const footerHelpTexts = assert.dom(footerHelpTextSelector);

    footerHelpTexts.exists(
      {
        count: 1,
      },
      'renders one footer help text wrapper'
    );
    footerHelpTexts.hasText('Looking for help?', 'renders the correct text');
  });
});
