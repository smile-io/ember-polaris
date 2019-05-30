import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import buildNestedSelector from '../../helpers/build-nested-selector';

module('Integration | Component | polaris color picker', function(hooks) {
  setupRenderingTest(hooks);

  const colorPickerSelector = 'div.Polaris-ColorPicker';
  const mainColorControlSelector = buildNestedSelector(
    colorPickerSelector,
    'div.Polaris-ColorPicker__MainColor'
  );
  const mainColorControlColorLayerSelector = buildNestedSelector(
    mainColorControlSelector,
    'div.Polaris-ColorPicker__ColorLayer'
  );
  const huePickerSelector = buildNestedSelector(
    colorPickerSelector,
    'div.Polaris-ColorPicker__HuePicker'
  );
  const alphaPickerSelector = buildNestedSelector(
    colorPickerSelector,
    'div.Polaris-ColorPicker__AlphaPicker'
  );
  const draggerSelector = buildNestedSelector(
    'div.Polaris-ColorPicker__Slidable',
    'div.Polaris-ColorPicker__Dragger'
  );

  test('it renders the correct HTML with default attributes', async function(assert) {
    this.set('color', {
      hue: 40,
      saturation: 0.5,
      brightness: 0.8,
    });
    await render(hbs`
      {{polaris-color-picker
        color=color
      }}
    `);

    const colorPickers = assert.dom(colorPickerSelector);
    colorPickers.exists({ count: 1 }, 'renders one color picker');

    const mainColorControls = assert.dom(mainColorControlSelector);
    mainColorControls.exists({ count: 1 }, 'renders one main color control');

    // Check the background of the main color control.
    const colorLayers = assert.dom(mainColorControlColorLayerSelector);
    colorLayers.exists({ count: 1 }, 'renders one color layer');

    colorLayers.hasStyle(
      { backgroundColor: 'rgb(255, 170, 0)' },
      'renders color layer with correct background color'
    );

    // Check the main color control's dragger.
    const colorDraggers = assert.dom(
      `${mainColorControlSelector} ${draggerSelector}`
    );
    colorDraggers.exists(
      { count: 1 },
      'renders one dragger for the main color control'
    );

    colorDraggers.hasStyle(
      { transform: 'matrix(1, 0, 0, 1, 80, 32)' },
      'renders color dragger in the correct position'
    );

    // Check the hue picker.
    const huePickers = assert.dom(huePickerSelector);
    huePickers.exists({ count: 1 }, 'renders one hue picker');

    // Check the hue picker's dragger.
    const hueDraggers = assert.dom(`${huePickerSelector} ${draggerSelector}`);
    hueDraggers.exists({ count: 1 }, 'renders one dragger for the hue picker');

    hueDraggers.hasStyle(
      { transform: 'matrix(1, 0, 0, 1, 0, 28)' },
      'renders hue dragger in the correct position'
    );

    // Check no alpha picker is rendered.
    const alphaPickers = assert.dom(alphaPickerSelector);
    alphaPickers.doesNotExist('does not render an alpha picker');
  });

  test('it renders the correct HTML with allowAlpha set', async function(assert) {
    this.set('color', {
      hue: 214,
      saturation: 0.7,
      brightness: 0.3,
      alpha: 0.85,
    });

    await render(hbs`
      {{polaris-color-picker
        color=color
        allowAlpha=true
      }}
    `);

    const colorPickers = assert.dom(colorPickerSelector);
    colorPickers.exists({ count: 1 }, 'renders one color picker');

    const mainColorControls = assert.dom(mainColorControlSelector);
    mainColorControls.exists({ count: 1 }, 'renders one main color control');

    // Check the background of the main color control.
    const colorLayers = assert.dom(mainColorControlColorLayerSelector);
    colorLayers.exists({ count: 1 }, 'renders one color layer');

    colorLayers.hasStyle(
      { backgroundColor: 'rgba(0, 110, 255, 0.85)' },
      'renders color layer with correct background color'
    );

    // Check the main color control's dragger.
    const colorDraggers = assert.dom(
      `.Polaris-ColorPicker__MainColor ${draggerSelector}`
    );

    colorDraggers.exists(
      { count: 1 },
      'renders one dragger for the main color control'
    );

    const getTransform = (elem) => find(elem.target).style.transform;

    assert.equal(
      getTransform(colorDraggers),
      'translate3d(112px, 112px, 0px)',
      'renders color dragger in the correct position'
    );

    // Check the hue picker.
    const huePickers = assert.dom(huePickerSelector);
    huePickers.exists({ count: 1 }, 'renders one hue picker');

    // Check the hue picker's dragger.
    const hueDraggers = assert.dom(`${huePickerSelector} ${draggerSelector}`);

    hueDraggers.exists({ count: 1 }, 'renders one dragger for the hue picker');

    assert.equal(
      getTransform(hueDraggers),
      'translate3d(0px, 93.25px, 0px)',
      'renders hue dragger in the correct position'
    );

    // Check the alpha picker.
    const alphaPickers = assert.dom(alphaPickerSelector);
    alphaPickers.exists({ count: 1 }, 'renders one alpha picker');

    // Check the alpha picker's dragger.
    const alphaDraggers = assert.dom(
      `${alphaPickerSelector} ${draggerSelector}`
    );

    alphaDraggers.exists(
      { count: 1 },
      'renders one dragger for the alpha picker'
    );

    assert.equal(
      getTransform(alphaDraggers),
      'translate3d(0px, 33.25px, 0px)',
      'renders alpha dragger in the correct position'
    );
  });

  skip('it updates correctly when draggers are moved', async function(assert) {
    assert.expect(18);
    const getTransform = (elem) => find(elem).style.transform;

    this.set('color', {
      hue: 120,
      saturation: 0.2,
      brightness: 0.65,
      alpha: 0.4,
    });

    await render(hbs`
      {{polaris-color-picker
        color=color
        allowAlpha=true
        onChange=(action (mut color))
      }}
    `);

    // Helpers.
    const assertDraggerPosition = function(
      dragger,
      expectedX,
      expectedY,
      name,
      label
    ) {
      assert.equal(
        getTransform(dragger),
        `translate3d(${expectedX}px, ${expectedY}px, 0px)`,
        `${label} - renders ${name} dragger in the correct position`
      );
    };

    const assertHsbaColor = function(color, colorValue, label) {
      let { hue, saturation, brightness, alpha } = colorValue;

      assert.equal(
        parseInt(color.hue),
        parseInt(hue),
        `${label} - has the correct hue`
      );
      assert.equal(
        parseInt(color.saturation),
        parseInt(saturation),
        `${label} - has the correct saturation`
      );
      assert.equal(
        parseInt(color.brightness),
        parseInt(brightness),
        `${label} - has the correct brightness`
      );
      assert.equal(
        parseInt(color.alpha),
        parseInt(alpha),
        `${label} - has the correct alpha`
      );
    };

    const clickElementAtPosition = async function(element, x, y) {
      // Click an element some fractional distance across its width and height.
      const { left, top } = element.parentNode.getBoundingClientRect();

      return await click(element.parentNode, {
        clientX: x + left,
        clientY: y + top,
        which: 1,
      });
    };

    // Grab the draggers to check their positions.
    const [colorDragger, hueDragger, alphaDragger] = findAll(draggerSelector);

    assertDraggerPosition(
      colorDragger,
      32,
      56,
      'color',
      'after initial render'
    );
    assertDraggerPosition(hueDragger, 0, 58, 'hue', 'after initial render');
    assertDraggerPosition(alphaDragger, 0, 94, 'alpha', 'after initial render');

    // Test moving the main color dragger.
    await clickElementAtPosition(colorDragger, 100, 100);
    assertDraggerPosition(
      colorDragger,
      100,
      99.75,
      'color',
      'after moving color dragger'
    );

    assertHsbaColor(
      this.get('color'),
      { hue: 120, saturation: 0.625, brightness: 0.375, alpha: 0.4 },
      'after moving color dragger'
    );

    // Test moving the hue dragger.
    await clickElementAtPosition(hueDragger, 0, 90);

    assertDraggerPosition(
      hueDragger,
      0,
      90.5746,
      'hue',
      'after moving hue dragger'
    );

    assertHsbaColor(
      this.get('color'),
      {
        alpha: 0.4,
        brightness: 0.375,
        hue: 206.87,
        saturation: 0.625,
      },
      'after moving hue dragger'
    );

    // Test moving the alpha dragger.
    await clickElementAtPosition(alphaDragger, 0, 70);
    assertDraggerPosition(
      alphaDragger,
      0,
      70.4254,
      'alpha',
      'after moving alpha dragger'
    );
    assertHsbaColor(
      this.get('color'),
      {
        alpha: 0.57,
        brightness: 0.375,
        hue: 206.87,
        saturation: 0.625,
      },
      'after moving alpha dragger'
    );
  });
});
