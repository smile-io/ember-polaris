import Ember from 'ember';
import layout from '../../templates/components/polaris-color-picker/hue-picker';
import { clamp } from '../../utils/math';

const {
  Component,
  computed,
} = Ember;

const VERTICAL_PADDING = 13;

function offsetForHue(hue, sliderHeight, draggerHeight) {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp((hue / 360 * slidableArea) + VERTICAL_PADDING, 0, sliderHeight - draggerHeight);
}

export default Component.extend({
  classNames: ['Polaris-ColorPicker__HuePicker'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The current hue value
   *
   * @property hue
   * @type {Number}
   * @default 0
   */
  hue: 0,

  /*
   * Internal properties.
   */
  sliderHeight: null,
  draggerHeight: null,

  draggerY: computed('hue', 'sliderHeight', function() {
    const { hue, sliderHeight, draggerHeight } = this.getProperties('hue', 'sliderHeight', 'draggerHeight');
    const offset = offsetForHue(hue, sliderHeight, draggerHeight);
    return clamp(offset, 0, sliderHeight);
  }).readOnly(),

  /*
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    // Grab the size of the component for positioning the draggable marker.
    const huePickerElement = this.$()[0];
    this.set('sliderHeight', huePickerElement.clientHeight);
  },
});
