import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { classify } from '@ember/string';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

// Colors lifted from shopify source.
const colors = [
  'white',
  'black',
  'skyLighter',
  'skyLight',
  'sky',
  'skyDark',
  'inkLightest',
  'inkLighter',
  'inkLight',
  'ink',
  'blueLighter',
  'blueLight',
  'blue',
  'blueDark',
  'blueDarker',
  'indigoLighter',
  'indigoLight',
  'indigo',
  'indigoDark',
  'indigoDarker',
  'tealLighter',
  'tealLight',
  'teal',
  'tealDark',
  'tealDarker',
  'greenLighter',
  'green',
  'greenDark',
  'yellowLighter',
  'yellow',
  'yellowDark',
  'orange',
  'redLighter',
  'red',
  'redDark',
  'purple',
];

module('Integration | Component | polaris icon', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('component:svg-jar', MockSvgJarComponent);
  });

  const iconSelector = 'span.Polaris-Icon';

  const svgSelector = buildNestedSelector(
    iconSelector,
    'svg.Polaris-Icon__Svg'
  );

  test('it renders the specified icon correctly', async function (assert) {
    await render(hbs`{{polaris-icon source="notes"}}`);

    assert.dom(iconSelector).exists({ count: 1 }, 'renders one icon component');

    const svg = assert.dom(svgSelector);
    svg.exists({ count: 1 }, 'renders one SVG element');

    svg.hasAttribute(
      'data-icon-source',
      'polaris/notes',
      'uses the correct SVG source'
    );
    svg.hasAttribute(
      'focusable',
      'false',
      'applies focusable:false to the SVG element'
    );
    svg.hasAttribute(
      'aria-hidden',
      'true',
      'applies aria-hidden to the SVG element'
    );
  });

  test('it applies colors correctly', async function (assert) {
    assert.expect(2 + colors.length * 3);

    await render(hbs`{{polaris-icon source="add" color=color}}`);

    // Check without any color set first.
    const icon = assert.dom(iconSelector);
    const iconClassList = this.element.querySelector(iconSelector).classList;

    icon.doesNotHaveClass(
      'Polaris-Icon--color',
      'icon without color does not add color class'
    );
    icon.hasNoClass(
      'Polaris-Icon--isColored',
      'icon without color does not add isColored class'
    );

    // Check all the available colors are handled correctly.
    colors.forEach((color) => {
      this.set('color', color);

      const colorClass = `Polaris-Icon--color${classify(color)}`;
      icon.hasClass(
        colorClass,
        `icon with ${color} color applies ${colorClass} class`
      );

      const colorClassNames = [...iconClassList].filter((className) =>
        className.includes('Polaris-Icon--color')
      );

      assert.equal(
        colorClassNames.length,
        1,
        `icon with ${color} color does not add other color classes`
      );

      if (color === 'white') {
        icon.hasNoClass(
          'Polaris-Icon--isColored',
          `icon with ${color} color does not add isColored class`
        );
      } else {
        icon.hasClass(
          'Polaris-Icon--isColored',
          `icon with ${color} color adds isColored class`
        );
      }
    });
  });

  test('it handles backdrop correctly', async function (assert) {
    await render(hbs`{{polaris-icon source="add" backdrop=backdrop}}`);

    // Check default setting.
    const backdropClass = 'Polaris-Icon--hasBackdrop';

    const icon = assert.dom(iconSelector);
    icon.hasNoClass(
      backdropClass,
      'icon without backdrop set does not apply backdrop class'
    );

    this.set('backdrop', true);
    icon.hasClass(
      backdropClass,
      `icon with backdrop=true applies backdrop class`
    );

    this.set('backdrop', false);
    icon.hasNoClass(
      backdropClass,
      `icon with backdrop=false does not apply backdrop class`
    );
  });

  test('it handles accessibilityLabel correctly', async function (assert) {
    await render(
      hbs`{{polaris-icon source="add" accessibilityLabel=accessibilityLabel}}`
    );

    // Check default setting.
    const icon = assert.dom(iconSelector);

    icon.doesNotHaveAttribute(
      'aria-label',
      'no accessibilityLabel set - does not add aria-label attribute'
    );

    this.set('accessibilityLabel', 'This is the accessibility label');
    icon.hasAttribute(
      'aria-label',
      'This is the accessibility label',
      'accessibilityLabel set - adds aria-label attribute'
    );
  });

  test('it handles placeholder icons correctly', async function (assert) {
    await render(hbs`{{polaris-icon source="placeholder"}}`);

    const iconPlaceholderSelector = buildNestedSelector(
      iconSelector,
      'div.Polaris-Icon__Placeholder'
    );
    assert
      .dom(iconPlaceholderSelector)
      .exists({ count: 1 }, 'renders one icon placeholder');
  });
});
