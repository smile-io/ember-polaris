import Ember from 'ember';
import layout from '../../templates/components/polaris-color-picker/slidable';

const {
  Component,
  computed,
  String: EmberString,
} = Ember;

const {
  htmlSafe,
} = EmberString;

// Draggable marker, used to pick hue, saturation, brightness and alpha.
export default Component.extend({
  classNames: ['Polaris-ColorPicker__Slidable'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The current x position of the dragger
   *
   * @property draggerX
   * @type {Number}
   * @default null
   */
  draggerX: null,

  /**
   * The current y position of the dragger
   *
   * @property draggerY
   * @type {Number}
   * @default null
   */
  draggerY: null,

  /*
   * Internal properties.
   */
  draggerStyle: computed('draggerX', 'draggerY', function() {
    const { draggerX, draggerY } = this.getProperties('draggerX', 'draggerY');
    const transform = `translate3d(${ draggerX }px, ${ draggerY }px, 0)`;
    return htmlSafe(`transform: ${ transform };`);
  }).readOnly(),
});
