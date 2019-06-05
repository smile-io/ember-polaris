import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import layout from '../../templates/components/polaris-color-picker/alpha-picker';
import { clamp } from '../../utils/math';
import { hsbaToRgba } from '../../utils/color';

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

@classNames('Polaris-ColorPicker__AlphaPicker')
@templateLayout(layout)
export default class AlphaPicker extends Component {
  /**
   * The current alpha value
   *
   * @property alpha
   * @type {Number}
   * @default 1
   */
  alpha = 1;

  /**
   * @private
   */
  sliderHeight = null;

  /**
   * @private
   */
  draggerHeight = null;

  /**
   * @private
   */
  @(computed('color.{hue,saturation,brightness}').readOnly())
  get colorLayerStyle() {
    const color = this.get('color');
    const { red, green, blue } = hsbaToRgba(color);

    const rgb = `${red}, ${green}, ${blue}`;
    const background = `linear-gradient(to top, rgba(${rgb}, 0) 18px, rgba(${rgb}, 1) calc(100% - 18px))`;
    return htmlSafe(`background: ${background};`);
  }

  /**
   * @private
   */
  @(computed('alpha', 'sliderHeight').readOnly())
  get draggerY() {
    const { alpha, sliderHeight, draggerHeight } = this.getProperties(
      'alpha',
      'sliderHeight',
      'draggerHeight'
    );
    const offset = offsetForAlpha(alpha, sliderHeight, draggerHeight);
    return clamp(offset, 0, sliderHeight);
  }

  didRender() {
    super.didRender(...arguments);

    // Grab the size of the component for positioning the draggable marker.
    const alphaPickerElement = this.element;
    this.set('sliderHeight', alphaPickerElement.clientHeight);
  }

  @action
  handleChange({ y }) {
    const { sliderHeight, onChange } = this.getProperties(
      'sliderHeight',
      'onChange'
    );
    if (typeOf(onChange) !== 'function') {
      return;
    }

    const offsetY = clamp(y, 0, sliderHeight);
    const alpha = alphaForOffset(offsetY, sliderHeight);

    onChange(alpha);
  }
}
