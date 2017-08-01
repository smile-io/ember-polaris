import Ember from 'ember';
import layout from '../../templates/components/polaris-color-picker/alpha-picker';
import { clamp } from '../../utils/math';
import { hsbaToRgba } from '../../utils/color';

const {
  Component,
  computed,
  String: EmberString,
} = Ember;

const {
  htmlSafe,
} = EmberString;

const VERTICAL_PADDING = 13;

function offsetForAlpha(alpha, sliderHeight, draggerHeight) {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp(((1 - alpha) * slidableArea) + VERTICAL_PADDING, 0, sliderHeight - draggerHeight);
}

export default Component.extend({
  classNames: ['Polaris-ColorPicker__AlphaPicker'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The current alpha value
   *
   * @property alpha
   * @type {Number}
   * @default 1
   */
  alpha: 1,

  /*
   * Internal properties.
   */
  sliderHeight: null,
  draggerHeight: null,

  colorLayerStyle: computed('color.{hue,saturation,brightness}', function() {
    const color = this.get('color');
    const { red, green, blue } = hsbaToRgba(color);

    const rgb = `${ red }, ${ green }, ${ blue }`;
    const background = `linear-gradient(to top, rgba(${ rgb }, 0) 18px, rgba(${ rgb }, 1) calc(100% - 18px))`;
    return htmlSafe(`background: ${ background };`);
  }).readOnly(),

  draggerY: computed('alpha', 'sliderHeight', function() {
    const { alpha, sliderHeight, draggerHeight } = this.getProperties('alpha', 'sliderHeight', 'draggerHeight');
    const offset = offsetForAlpha(alpha, sliderHeight, draggerHeight);
    return clamp(offset, 0, sliderHeight);
  }).readOnly(),

  /*
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    // Grab the size of the component for positioning the draggable marker.
    const alphaPickerElement = this.$()[0];
    this.set('sliderHeight', alphaPickerElement.clientHeight);
  },
});
