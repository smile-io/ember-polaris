import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll } from 'ember-native-dom-helpers';
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
      onChange=(action (mut color))
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

  const colorDragger = colorDraggers[0];
  assert.equal(colorDragger.style.transform, 'translate3d(80px, 32px, 0px)', 'renders color dragger in the correct position');
});
