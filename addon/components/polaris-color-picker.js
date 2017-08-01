import Ember from 'ember';
import layout from '../templates/components/polaris-color-picker';
import { clamp } from '../utils/math';
import { hsbaToRgba } from '../utils/color';

const {
  Component,
  computed,
  String: EmberString,
} = Ember;

const {
  htmlSafe,
} = EmberString;

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
