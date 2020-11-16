import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { classify } from '@ember/string';
import buildNestedSelector from '../../helpers/build-nested-selector';
import { matchesIcon } from '../../helpers/matches-icon';

const iconSelector = 'span.Polaris-Icon';
const svgSelector = buildNestedSelector(iconSelector, 'svg.Polaris-Icon__Svg');
const placeholderSelector = buildNestedSelector(
  iconSelector,
  'div.Polaris-Icon__Placeholder'
);
const imageSelector = buildNestedSelector(
  iconSelector,
  'img.Polaris-Icon__Img'
);
const svg =
  "<svg><path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/></svg>";

module('Integration | Component | polaris icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders correctly', async function (assert) {
    await render(hbs`
      <PolarisIcon @source="placeholder" />
    `);

    assert
      .dom(iconSelector)
      .exists('renders the icon')
      .doesNotHaveClass(
        'Polaris-Icon--isColored',
        'without @color has no isColored class'
      )
      .doesNotHaveClass(
        /Polaris-Icon--color/,
        'without @color has no color class'
      )
      .doesNotHaveClass(
        'Polaris-Icon--hasBackdrop',
        'without @backdrop has no hasBackdrop class'
      );
  });

  module('newDesignLanguage', function () {
    test('it supports newDesignLanguage', async function (assert) {
      await render(hbs`<PolarisIcon @source="placeholder" />`);

      assert
        .dom(iconSelector)
        .doesNotHaveClass(
          'Polaris-Icon--newDesignLanguage',
          'when newDesignLanguage is false does not add --newDesignLanguage class'
        );

      this.appProviderService = this.owner.lookup(
        'service:polaris-app-provider'
      );
      this.appProviderService.features = { newDesignLanguage: true };

      await settled();
      assert
        .dom(iconSelector)
        .hasClass(
          'Polaris-Icon--newDesignLanguage',
          'when newDesignLanguage is true adds --newDesignLanguage class'
        );
    });
  });

  module('@source', function () {
    test('when set to "placeholder"', async function (assert) {
      await render(hbs`<PolarisIcon @source="placeholder" />`);
      assert.dom(placeholderSelector).exists('it renders a placeholder');
    });

    test('when set to an svg-jar ID', async function (assert) {
      await render(hbs`<PolarisIcon @source="NoteMinor" />`);

      assert
        .dom(svgSelector)
        .exists('it renders as a SVG element')
        .hasAttribute(
          'focusable',
          'false',
          'applies focusable:false to the SVG element'
        )
        .hasAttribute(
          'aria-hidden',
          'true',
          'applies aria-hidden to the SVG element'
        );
      assert.ok(matchesIcon(iconSelector, 'NoteMinor'), 'renders correct icon');
    });

    test('when set to an untrusted SVG element string', async function (assert) {
      this.svg = svg;
      await render(hbs`<PolarisIcon @source={{this.svg}} />`);

      assert
        .dom(imageSelector)
        .exists('it renders the SVG as an image')
        .hasAttribute(
          'src',
          `data:image/svg+xml;utf8,${this.svg}`,
          'sets `src` correctly on the SVG image'
        )
        .hasAttribute(
          'aria-hidden',
          'true',
          'sets `aria-hidden` on the SVG image'
        )
        .hasAttribute('alt', '', 'sets `alt` on the SVG image');
    });
  });

  test('it handles @color correctly', async function (assert) {
    await render(hbs`
      <PolarisIcon @source="placeholder" @color={{this.color}} />
    `);

    assert
      .dom(iconSelector)
      .doesNotHaveClass(
        'Polaris-Icon--isColored',
        'without @color has no isColored class'
      )
      .doesNotHaveClass(
        'Polaris-Icon--hasBackdrop',
        'without @backdrop has no hasBackdrop class'
      );

    this.set('color', 'blue');
    assert
      .dom(iconSelector)
      .hasClass('Polaris-Icon--isColored', 'with @color adds isColored class')
      .hasClass(
        `Polaris-Icon--color${classify(this.color)}`,
        'with @color adds color-specific class'
      );

    this.set('color', 'white');
    assert
      .dom(iconSelector)
      .doesNotHaveClass(
        'Polaris-Icon--isColored',
        'with @color set to `white` has no isColored class'
      );
  });

  test('it handles @backdrop correctly', async function (assert) {
    await render(hbs`
      <PolarisIcon @source="placeholder" @backdrop={{this.backdrop}} />
    `);

    assert
      .dom(iconSelector)
      .doesNotHaveClass(
        'Polaris-Icon--hasBackdrop',
        'without @backdrop has no hasBackdrop class'
      );

    this.set('backdrop', true);
    assert
      .dom(iconSelector)
      .hasClass(
        'Polaris-Icon--hasBackdrop',
        'with @backdrop has hasBackdrop class'
      );
  });

  test('it handles @accessibilityLabel correctly', async function (assert) {
    await render(
      hbs`<PolarisIcon @source="placeholder" @accessibilityLabel={{accessibilityLabel}} />`
    );

    const icon = assert.dom(iconSelector);

    icon.doesNotHaveAttribute(
      'aria-label',
      'without @accessibilityLabel - does not add aria-label attribute'
    );

    this.set('accessibilityLabel', 'This is the accessibility label');
    icon.hasAttribute(
      'aria-label',
      'This is the accessibility label',
      'with @accessibilityLabel - adds aria-label attribute'
    );
  });
});
