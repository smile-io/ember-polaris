import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { typeOf, isNone } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/polaris-color-picker';
import { clamp } from '../utils/math';
import { hsbaToRgba } from '../utils/color';

/**
 * Polaris color picker component.
 * See https://polaris.shopify.com/components/forms/color-picker
 */
@classNames('Polaris-ColorPicker')
@templateLayout(layout)
export default class PolarisColorPicker extends Component {
  /**
   * The currently selected color
   *
   * @property color
   * @type {Object}
   * @default null
   * @public
   */
  color = null;

  /**
   * Allow user to select an alpha value
   *
   * @property allowAlpha
   * @type {boolean}
   * @default false
   * @public
   */
  allowAlpha = false;

  /**
   * Callback when color is selected
   *
   * @property onChange
   * @type {function}
   * @default null
   * @public
   */
  onChange = null;

  /**
   * @private
   */
  pickerSize = null;

  /**
   * @private
   */
  @(computed('color.{hue,alpha}').readOnly())
  get colorLayerStyle() {
    const { hue, alpha = 1 } = this.get('color');
    const { red, green, blue } = hsbaToRgba({
      hue,
      saturation: 1,
      brightness: 1,
    });

    const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    return htmlSafe(`background-color: ${backgroundColor};`);
  }

  /**
   * @private
   */
  @(computed('color.saturation', 'pickerSize').readOnly())
  get draggerX() {
    const {
      color: { saturation },
      pickerSize,
    } = this.getProperties('color', 'pickerSize');
    return clamp(saturation * pickerSize, 0, pickerSize);
  }

  /**
   * @private
   */
  @(computed('color.brightness', 'pickerSize').readOnly())
  get draggerY() {
    const {
      color: { brightness },
      pickerSize,
    } = this.getProperties('color', 'pickerSize');
    return clamp(pickerSize - brightness * pickerSize, 0, pickerSize);
  }

  didRender() {
    super.didRender(...arguments);

    // Grab the size of the picker for positioning the draggable markers.
    const mainColorElement = this.element.querySelector(
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
  }

  @action
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
  }

  @action
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
  }
}
