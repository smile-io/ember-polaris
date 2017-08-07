import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, click } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-color-picker', 'Integration | Component | polaris color picker', {
  integration: true
});

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

test('it renders the correct HTML with default attributes', function(assert) {
  this.set('color', {
    hue: 40,
    saturation: 0.5,
    brightness: 0.8,
  });
  this.render(hbs`
    {{polaris-color-picker
      color=color
    }}
  `);

  const colorPickers = findAll(colorPickerSelector);
  assert.equal(colorPickers.length, 1, 'renders one color picker');

  const mainColorControls = findAll(mainColorControlSelector);
  assert.equal(mainColorControls.length, 1, 'renders one main color control');

  // Check the background of the main color control.
  const colorLayers = findAll(mainColorControlColorLayerSelector);
  assert.equal(colorLayers.length, 1, 'renders one color layer');

  const colorLayer = colorLayers[0];
  assert.equal(colorLayer.style.backgroundColor, 'rgb(255, 170, 0)', 'renders color layer with correct background color')

  // Check the main color control's dragger.
  const colorDraggers = findAll(draggerSelector, mainColorControls[0]);
  assert.equal(colorDraggers.length, 1, 'renders one dragger for the main color control');
  assert.equal(colorDraggers[0].style.transform, 'translate3d(80px, 32px, 0px)', 'renders color dragger in the correct position');

  // Check the hue picker.
  const huePickers = findAll(huePickerSelector);
  assert.equal(huePickers.length, 1, 'renders one hue picker');

  // Check the hue picker's dragger.
  const hueDraggers = findAll(draggerSelector, huePickers[0]);
  assert.equal(hueDraggers.length, 1, 'renders one dragger for the hue picker');
  assert.equal(hueDraggers[0].style.transform, 'translate3d(0px, 28px, 0px)', 'renders hue dragger in the correct position');

  // Check no alpha picker is rendered.
  const alphaPickers = findAll(alphaPickerSelector);
  assert.equal(alphaPickers.length, 0, 'does not render an alpha picker');
});

test('it renders the correct HTML with allowAlpha set', function(assert) {
  this.set('color', {
    hue: 214,
    saturation: 0.7,
    brightness: 0.3,
    alpha: 0.85,
  });
  this.render(hbs`
    {{polaris-color-picker
      color=color
      allowAlpha=true
    }}
  `);

  const colorPickers = findAll(colorPickerSelector);
  assert.equal(colorPickers.length, 1, 'renders one color picker');

  const mainColorControls = findAll(mainColorControlSelector);
  assert.equal(mainColorControls.length, 1, 'renders one main color control');

  // Check the background of the main color control.
  const colorLayers = findAll(mainColorControlColorLayerSelector);
  assert.equal(colorLayers.length, 1, 'renders one color layer');

  const colorLayer = colorLayers[0];
  assert.equal(colorLayer.style.backgroundColor, 'rgba(0, 110, 255, 0.85)', 'renders color layer with correct background color')

  // Check the main color control's dragger.
  const colorDraggers = findAll(draggerSelector, mainColorControls[0]);
  assert.equal(colorDraggers.length, 1, 'renders one dragger for the main color control');
  assert.equal(colorDraggers[0].style.transform, 'translate3d(112px, 112px, 0px)', 'renders color dragger in the correct position');

  // Check the hue picker.
  const huePickers = findAll(huePickerSelector);
  assert.equal(huePickers.length, 1, 'renders one hue picker');

  // Check the hue picker's dragger.
  const hueDraggers = findAll(draggerSelector, huePickers[0]);
  assert.equal(hueDraggers.length, 1, 'renders one dragger for the hue picker');
  assert.equal(hueDraggers[0].style.transform, 'translate3d(0px, 93.25px, 0px)', 'renders hue dragger in the correct position');

  // Check the alpha picker.
  const alphaPickers = findAll(alphaPickerSelector);
  assert.equal(alphaPickers.length, 1, 'renders one alpha picker');

  // Check the alpha picker's dragger.
  const alphaDraggers = findAll(draggerSelector, alphaPickers[0]);
  assert.equal(alphaDraggers.length, 1, 'renders one dragger for the alpha picker');
  assert.equal(alphaDraggers[0].style.transform, 'translate3d(0px, 33.25px, 0px)', 'renders alpha dragger in the correct position');
});

skip('it updates correctly when draggers are moved', function(assert) {
  // This is skipped for now until we figure out the correct calculation of the click coordinates...
  this.set('color', {
    hue: 120,
    saturation: 0.2,
    brightness: 0.65,
    alpha: 0.4,
  });
  this.render(hbs`
    {{polaris-color-picker
      color=color
      allowAlpha=true
      onChange=(action (mut color))
    }}
  `);

  // Helpers.
  const assertDraggerPosition = function(dragger, expectedX, expectedY, name, label) {
    assert.equal(
      dragger.style.transform,
      `translate3d(${expectedX}px, ${expectedY}px, 0px)`,
      `${ label } - renders ${ name } dragger in the correct position`
    );
  };

  const assertHsbaColor = function(color, hue, saturation, brightness, alpha, label) {
    assert.equal(color.hue, hue, `${ label } - has the correct hue`);
    assert.equal(color.saturation, saturation, `${ label } - has the correct saturation`);
    assert.equal(color.brightness, brightness, `${ label } - has the correct brightness`);
    assert.equal(color.alpha, alpha, `${ label } - has the correct alpha`);
  };

  const clickElementAtPosition = function(element, x, y) {
    // Click an element some fractional distance across its width and height.
    const { clientWidth: width, clientHeight: height } = element;
    return click(element, {
      clientX: (x * width),
      clientY: (y * height),
    });
  };

  // Grab the draggers to check their positions.
  const [ colorDragger, hueDragger, alphaDragger ] = findAll(draggerSelector);
  assertDraggerPosition(colorDragger, 32, 56, 'color', 'after initial render');
  assertDraggerPosition(hueDragger, 0, 58, 'hue', 'after initial render');
  assertDraggerPosition(alphaDragger, 0, 94, 'alpha', 'after initial render');

  // Test moving the main color dragger.
  clickElementAtPosition(colorDragger.parentNode, 0.25, 0.4);
  assertDraggerPosition(colorDragger, 40, 64, 'color', 'after moving color dragger');
  assertHsbaColor(this.get('color'), 120, 0.25, 0.6, 0.4, 'after moving color dragger');

  // Test moving the hue dragger.
  clickElementAtPosition(hueDragger.parentNode, 0, 0.5);
  assertDraggerPosition(hueDragger, 0, 80.5, 'hue', 'after moving hue dragger');
  assertHsbaColor(this.get('color'), 180, 0.25, 0.6, 0.4, 'after moving hue dragger');

  // Test moving the alpha dragger.
  clickElementAtPosition(alphaDragger.parentNode, 0, 0.5);
  assertDraggerPosition(alphaDragger, 0, 80.5, 'alpha', 'after moving alpha dragger');
  assertHsbaColor(this.get('color'), 180, 0.25, 0.6, 0.5, 'after moving alpha dragger');
});
