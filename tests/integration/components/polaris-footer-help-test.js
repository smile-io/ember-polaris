import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent(
  'polaris-footer-help',
  'Integration | Component | polaris footer help',
  {
    integration: true,

    beforeEach() {
      this.register('component:svg-jar', MockSvgJarComponent);
    },
  }
);

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

test('it renders the correct HTML in inline usage', function(assert) {
  this.render(hbs`{{polaris-footer-help text="Looking for help?"}}`);

  const footerHelpContents = findAll(footerHelpContentSelector);
  assert.equal(
    footerHelpContents.length,
    1,
    'renders one footer help component with contents'
  );

  // Check the icon.
  const footerHelpIcons = findAll(footerHelpIconSelector);
  assert.equal(footerHelpIcons.length, 1, 'renders one footer help icon');

  const icon = footerHelpIcons[0];
  assert.equal(
    icon.dataset.iconSource,
    'polaris/help',
    'renders the correct icon'
  );

  const iconWrapper = icon.parentNode;
  assert.ok(
    iconWrapper.classList.contains('Polaris-Icon--colorTeal'),
    'renders the icon with the correct color'
  );
  assert.ok(
    iconWrapper.classList.contains('Polaris-Icon--hasBackdrop'),
    'renders the icon with backdrop'
  );

  // Check the text.
  const footerHelpTexts = findAll(footerHelpTextSelector);
  assert.equal(
    footerHelpTexts.length,
    1,
    'renders one footer help text wrapper'
  );
  assert.equal(
    footerHelpTexts[0].textContent.trim(),
    'Looking for help?',
    'renders the correct text'
  );
});

test('it renders the correct HTML in block usage', function(assert) {
  this.render(hbs`
    {{#polaris-footer-help}}
      Looking for help?
    {{/polaris-footer-help}}
  `);

  const footerHelpContents = findAll(footerHelpContentSelector);
  assert.equal(
    footerHelpContents.length,
    1,
    'renders one footer help component with contents'
  );

  // Check the icon.
  const footerHelpIcons = findAll(footerHelpIconSelector);
  assert.equal(footerHelpIcons.length, 1, 'renders one footer help icon');

  const icon = footerHelpIcons[0];
  assert.equal(
    icon.dataset.iconSource,
    'polaris/help',
    'renders the correct icon'
  );

  const iconWrapper = icon.parentNode;
  assert.ok(
    iconWrapper.classList.contains('Polaris-Icon--colorTeal'),
    'renders the icon with the correct color'
  );
  assert.ok(
    iconWrapper.classList.contains('Polaris-Icon--hasBackdrop'),
    'renders the icon with backdrop'
  );

  // Check the text.
  const footerHelpTexts = findAll(footerHelpTextSelector);
  assert.equal(
    footerHelpTexts.length,
    1,
    'renders one footer help text wrapper'
  );
  assert.equal(
    footerHelpTexts[0].textContent.trim(),
    'Looking for help?',
    'renders the correct text'
  );
});
