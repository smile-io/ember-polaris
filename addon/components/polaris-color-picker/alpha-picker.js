import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { clamp } from '../../utils/math';
import { hsbaToRgba } from '../../utils/color';
import layout from '../../templates/components/polaris-color-picker/alpha-picker';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

const VERTICAL_PADDING = 13;

function offsetForAlpha(alpha, sliderHeight, draggerHeight) {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp(
    (1 - alpha) * slidableArea + VERTICAL_PADDING,
    0,
    sliderHeight - draggerHeight
  );
}

function alphaForOffset(offset, sliderHeight) {
  const selectionHeight = offset - VERTICAL_PADDING;
  const slidableArea = sliderHeight - 2 * VERTICAL_PADDING;
  return clamp(1 - selectionHeight / slidableArea, 0, 1);
}

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisColorPickerAlphaPicker extends Component {
  /**
   * The current alpha value
   *
   * @type {Number}
   * @default 1
   */
  alpha = 1;

  sliderHeight = null;
  draggerHeight = null;

  @(computed('color.{hue,saturation,brightness}').readOnly())
  get colorLayerStyle() {
    const { color } = this;
    const { red, green, blue } = hsbaToRgba(color);
    const rgb = `${red}, ${green}, ${blue}`;
    const background = `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;

    return htmlSafe(`background: ${background};`);
  }

  @(computed('alpha', 'draggerHeight', 'sliderHeight').readOnly())
  get draggerY() {
    const { alpha, sliderHeight, draggerHeight } = this;
    const offset = offsetForAlpha(alpha, sliderHeight, draggerHeight);
    return clamp(offset, 0, sliderHeight);
  }

  @action
  setSliderHeight(element) {
    // Grab the size of the component for positioning the draggable marker.
    this.set('sliderHeight', element.clientHeight);
  }

  @action
  handleChange({ y }) {
    const { sliderHeight, onChange } = this;
    if (typeOf(onChange) !== 'function') {
      return;
    }

    const offsetY = clamp(y, 0, sliderHeight);
    const alpha = alphaForOffset(offsetY, sliderHeight);

    onChange(alpha);
  }
}
