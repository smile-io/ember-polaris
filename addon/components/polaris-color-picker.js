import Component from '@ember/component';
import { computed } from '@ember/object';
import { typeOf, isNone } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/polaris-color-picker';
import { clamp } from '../utils/math';
import { hsbaToRgba } from '../utils/color';

/**
 * Polaris color picker component.
 * See https://polaris.shopify.com/components/forms/color-picker
 */
export default Component.extend({
  classNames: ['Polaris-ColorPicker'],

  layout,

  /**
   * The currently selected color
   *
   * @property color
   * @type {Object}
   * @default null
   * @public
   */
  color: null,

  /**
   * Allow user to select an alpha value
   *
   * @property allowAlpha
   * @type {boolean}
   * @default false
   * @public
   */
  allowAlpha: false,

  /**
   * Callback when color is selected
   *
   * @property onChange
   * @type {function}
   * @default null
   * @public
   */
  onChange: null,

  /**
   * @private
   */
  pickerSize: null,

  /**
   * @private
   */
  colorLayerStyle: computed('color.{hue,alpha}', function() {
    const { hue, alpha = 1 } = this.get('color');
    const { red, green, blue } = hsbaToRgba({
      hue,
      saturation: 1,
      brightness: 1,
    });

    const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    return htmlSafe(`background-color: ${backgroundColor};`);
  }).readOnly(),

  /**
   * @private
   */
  draggerX: computed('color.saturation', 'pickerSize', function() {
    const {
      color: { saturation },
      pickerSize,
    } = this.getProperties('color', 'pickerSize');
    return clamp(saturation * pickerSize, 0, pickerSize);
  }).readOnly(),

  /**
   * @private
   */
  draggerY: computed('color.brightness', 'pickerSize', function() {
    const {
      color: { brightness },
      pickerSize,
    } = this.getProperties('color', 'pickerSize');
    return clamp(pickerSize - brightness * pickerSize, 0, pickerSize);
  }).readOnly(),

  didRender() {
    this._super(...arguments);

    // Grab the size of the picker for positioning the draggable markers.
    const mainColorElement = this.element.querySelector(
      'div.Polaris-ColorPicker__MainColor'
    );
    if (isNone(mainColorElement)) {
      return;
    }

    this.set('pickerSize', mainColorElement.clientWidth);
  },

  actions: {
    draggerMoved({ x, y }) {
      const {
        pickerSize,
        color: { hue, alpha = 1 },
        onChange,
      } = this.getProperties('pickerSize', 'color', 'onChange');

      if (typeOf(onChange) !== 'function') {
        return;
      }

      const saturation = clamp(x / pickerSize, 0, 1);
      const brightness = clamp(1 - y / pickerSize, 0, 1);

      onChange({
        hue,
        saturation,
        brightness,
        alpha,
      });
    },

    handleHueChange(hue) {
      const {
        color: { brightness, saturation, alpha = 1 },
        onChange,
      } = this.getProperties('color', 'onChange');

      if (typeOf(onChange) === 'function') {
        onChange({
          hue,
          brightness,
          saturation,
          alpha,
        });
      }
    },

    handleAlphaChange(alpha) {
      const {
        color: { hue, brightness, saturation },
        onChange,
      } = this.getProperties('color', 'onChange');

      if (typeOf(onChange) === 'function') {
        onChange({
          hue,
          brightness,
          saturation,
          alpha,
        });
      }
    },
  },
});
