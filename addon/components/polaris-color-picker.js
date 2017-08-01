import Ember from 'ember';
import layout from '../templates/components/polaris-color-picker';
import { clamp } from '../utils/math';

const {
  Component,
  computed,
  String: EmberString,
} = Ember;

const {
  htmlSafe,
} = EmberString;

// implements https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
function hsbaToRgba(color) {
  const { hue, saturation, brightness, alpha = 1 } = color;
  const chroma = brightness * saturation;
  const huePrime = hue / 60;
  const hueDelta = 1 - Math.abs(huePrime % 2 - 1);
  const intermediateValue = chroma * hueDelta;

  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime <= 1) {
    red = chroma;
    green = intermediateValue;
    blue = 0;
  }

  if (huePrime >= 1 && huePrime <= 2) {
    red = intermediateValue;
    green = chroma;
    blue = 0;
  }

  if (huePrime >= 2 && huePrime <= 3) {
    red = 0;
    green = chroma;
    blue = intermediateValue;
  }

  if (huePrime >= 3 && huePrime <= 4) {
    red = 0;
    green = intermediateValue;
    blue = chroma;
  }

  if (huePrime >= 4 && huePrime <= 5) {
    red = intermediateValue;
    green = 0;
    blue = chroma;
  }

  if (huePrime >= 5 && huePrime <= 6) {
    red = chroma;
    green = 0;
    blue = intermediateValue;
  }

  const chromaBrightnessDelta = brightness - chroma;
  red += chromaBrightnessDelta;
  green += chromaBrightnessDelta;
  blue += chromaBrightnessDelta;

  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha,
  };
}

/**
 * Polaris color picker component.
 * See https://polaris.shopify.com/components/forms/color-picker
 */
export default Component.extend({
  classNames: ['Polaris-ColorPicker'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The currently selected color
   *
   * @property color
   * @type {Object}
   * @default null
   */
  color: null,

  /**
   * Allow user to select an alpha value
   *
   * @property allowAlpha
   * @type {boolean}
   * @default false
   */
  allowAlpha: false,

  /**
   * Callback when color is selected
   *
   * @property onChange
   * @type {function}
   * @default null
   */
  onChange: null,

  /*
   * Internal properties.
   */
  pickerSize: null,

  colorLayerStyle: computed('color.{hue,alpha}', function() {
    const { hue, alpha = 1 } = this.get('color');
    const { red, green, blue } = hsbaToRgba({
      hue,
      saturation: 1,
      brightness: 1,
    });

    const backgroundColor = `rgba(${ red }, ${ green }, ${ blue }, ${ alpha })`;
    return htmlSafe(`background-color: ${ backgroundColor };`);
  }).readOnly(),

  draggerX: computed('color.saturation', 'pickerSize', function() {
    const { color: { saturation }, pickerSize } = this.getProperties('color', 'pickerSize');
    return clamp(saturation * pickerSize, 0, pickerSize);
  }).readOnly(),

  draggerY: computed('color.brightness', 'pickerSize', function() {
    const { color: { brightness }, pickerSize } = this.getProperties('color', 'pickerSize');
    return clamp(pickerSize - (brightness * pickerSize), 0, pickerSize);
  }).readOnly(),

  /*
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    // Grab the size of the picker for positioning the draggable markers.
    const mainColorElement = this.$('div.Polaris-ColorPicker__MainColor')[0];
    this.set('pickerSize', mainColorElement.clientWidth);
  },

  actions: {
    draggerMoved() {

    },
  }
});
