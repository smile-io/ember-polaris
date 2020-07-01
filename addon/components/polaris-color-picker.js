import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { typeOf, isNone } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { clamp } from '../utils/math';
import { hsbaToRgba } from '../utils/color';
import layout from '../templates/components/polaris-color-picker';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Polaris color picker component.
 * See https://polaris.shopify.com/components/forms/color-picker
 */
@tagName('')
@templateLayout(layout)
export default class PolarisColorPicker extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * The currently selected color
   *
   * @type {Object}
   * @default null
   * @public
   */
  color = null;

  /**
   * Allow user to select an alpha value
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  allowAlpha = false;

  /**
   * Callback when color is selected
   *
   * @type {Function}
   * @default null
   * @public
   */
  onChange = null;

  pickerSize = null;

  @(computed('color.{hue,alpha}').readOnly())
  get colorLayerStyle() {
    const { hue, alpha = 1 } = this.color;
    const { red, green, blue } = hsbaToRgba({
      hue,
      saturation: 1,
      brightness: 1,
    });

    const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    return htmlSafe(`background-color: ${backgroundColor};`);
  }

  @(computed('color.saturation', 'pickerSize').readOnly())
  get draggerX() {
    const {
      color: { saturation },
      pickerSize,
    } = this;
    return clamp(saturation * pickerSize, 0, pickerSize);
  }

  @(computed('color.brightness', 'pickerSize').readOnly())
  get draggerY() {
    const {
      color: { brightness },
      pickerSize,
    } = this;
    return clamp(pickerSize - brightness * pickerSize, 0, pickerSize);
  }

  @action
  setPickerSize(element) {
    // Grab the size of the picker for positioning the draggable markers.
    const mainColorElement = element.querySelector(
      'div.Polaris-ColorPicker__MainColor'
    );
    if (isNone(mainColorElement)) {
      return;
    }

    this.set('pickerSize', mainColorElement.clientWidth);
  }

  @action
  draggerMoved({ x, y }) {
    const {
      pickerSize,
      color: { hue, alpha = 1 },
      onChange,
    } = this;

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
  }

  @action
  handleHueChange(hue) {
    const {
      color: { brightness, saturation, alpha = 1 },
      onChange,
    } = this;

    if (typeOf(onChange) === 'function') {
      onChange({
        hue,
        brightness,
        saturation,
        alpha,
      });
    }
  }

  @action
  handleAlphaChange(alpha) {
    const {
      color: { hue, brightness, saturation },
      onChange,
    } = this;

    if (typeOf(onChange) === 'function') {
      onChange({
        hue,
        brightness,
        saturation,
        alpha,
      });
    }
  }
}
