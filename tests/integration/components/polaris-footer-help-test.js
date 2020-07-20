import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

module('Integration | Component | polaris footer help', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  const footerHelpContentSelector = buildNestedSelector(
    'div.Polaris-FooterHelp',
    'div.Polaris-FooterHelp__Content'
  );
  const footerHelpIconSelector = buildNestedSelector(
    footerHelpContentSelector,
    'div.Polaris-FooterHelp__Icon',
    'span.Polaris-Icon',
    'svg'
  );
  const footerHelpTextSelector = buildNestedSelector(
    footerHelpContentSelector,
    'div.Polaris-FooterHelp__Text'
  );

  test('it renders the correct HTML in inline usage', async function (assert) {
    await render(hbs`{{polaris-footer-help text="Looking for help?"}}`);

    assert
      .dom(footerHelpContentSelector)
      .exists({ count: 1 }, 'renders one footer help component with contents');

    // Check the icon.
    let footerHelpIcon = assert.dom(footerHelpIconSelector);
    footerHelpIcon.exists({ count: 1 }, 'renders one footer help icon');

    footerHelpIcon.hasAttribute(
      'data-icon-source',
      'polaris/help',
      'renders the correct icon'
    );

    const iconWrapper = this.element.querySelector(footerHelpIconSelector)
      .parentNode;

    assert
      .dom(iconWrapper)
      .hasClass(
        'Polaris-Icon--colorTeal',
        'renders the icon with the correct color'
      );
    assert
      .dom(iconWrapper)
      .hasClass('Polaris-Icon--hasBackdrop', 'renders the icon with backdrop');

    // Check the text.
    const footerHelpTexts = assert.dom(footerHelpTextSelector);

    footerHelpTexts.exists(
      { count: 1 },
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

    assert
      .dom(footerHelpContentSelector)
      .exists({ count: 1 }, 'renders one footer help component with contents');

    // Check the icon.
    const footerHelpIcons = assert.dom(footerHelpIconSelector);
    footerHelpIcons.exists({ count: 1 }, 'renders one footer help icon');

    footerHelpIcons.hasAttribute(
      'data-icon-source',
      'polaris/help',
      'renders the correct icon'
    );

    const iconWrapper = this.element.querySelector(footerHelpIconSelector)
      .parentNode;
    assert
      .dom(iconWrapper)
      .hasClass(
        'Polaris-Icon--colorTeal',
        'renders the icon with the correct color'
      );
    assert
      .dom(iconWrapper)
      .hasClass('Polaris-Icon--hasBackdrop', 'renders the icon with backdrop');

    // Check the text.
    const footerHelpTexts = assert.dom(footerHelpTextSelector);

    footerHelpTexts.exists(
      { count: 1 },
      'renders one footer help text wrapper'
    );
    footerHelpTexts.hasText('Looking for help?', 'renders the correct text');
  });
});
