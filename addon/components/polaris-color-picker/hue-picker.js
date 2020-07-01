import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { clamp } from '../../utils/math';
import layout from '../../templates/components/polaris-color-picker/hue-picker';
import TaglessCssDeprecation from '../../mixins/tagless-css-deprecation';

const VERTICAL_PADDING = 13;

function offsetForHue(hue, sliderHeight, draggerHeight) {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp(
    (hue / 360) * slidableArea + VERTICAL_PADDING,
    0,
    sliderHeight - draggerHeight
  );
}

function hueForOffset(offset, sliderHeight) {
  const selectionHeight = offset - VERTICAL_PADDING;
  const slidableArea = sliderHeight - VERTICAL_PADDING * 2;
  return clamp((selectionHeight / slidableArea) * 360, 0, 360);
}

@tagName('')
@templateLayout(layout)
export default class HuePicker extends Component.extend(TaglessCssDeprecation) {
  /**
   * The current hue value
   *
   * @type {Number}
   * @default 0
   * @public
   */
  hue = 0;

  /**
   * Callback when hue is changed
   *
   * @type {function}
   * @default null
   * @public
   */
  onChange = null;

  sliderHeight = null;
  draggerHeight = null;

  @(computed('draggerHeight', 'hue', 'sliderHeight').readOnly())
  get draggerY() {
    const { hue, sliderHeight, draggerHeight } = this;
    const offset = offsetForHue(hue, sliderHeight, draggerHeight);
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
    const hue = hueForOffset(offsetY, sliderHeight);

    onChange(hue);
  }
}
