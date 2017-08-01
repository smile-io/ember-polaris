import Ember from 'ember';
import layout from '../../templates/components/polaris-color-picker/slidable';

const {
  Component,
  computed,
  String: EmberString,
  typeOf,
} = Ember;

const {
  htmlSafe,
} = EmberString;

function startDrag(event) {
  this.set('isDragging', true);
  this.handleMove(event);
}

function handleMove(event) {
  if (!this.get('isDragging')) {
    return;
  }

  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault();

  if (event.touches && event.touches.length) {
    this.handleDraggerMove(event.touches[0].clientX, event.touches[0].clientY);
    return;
  }

  this.handleDraggerMove(event.clientX, event.clientY);
}

function handleDragEnd() {
  this.set('isDragging', false);
}

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
   * @default 0
   */
  draggerX: 0,

  /**
   * The current y position of the dragger
   *
   * @property draggerY
   * @type {Number}
   * @default 0
   */
  draggerY: 0,

  /**
   * Callback for the outside world to receive the height of the dragger
   *
   * @property onDraggerHeightChanged
   * @type {function}
   * @default null
   */
  onDraggerHeightChanged: null,

  /*
   * Internal properties.
   */
  isDragging: false,

  draggerStyle: computed('draggerX', 'draggerY', function() {
    const { draggerX, draggerY } = this.getProperties('draggerX', 'draggerY');
    const transform = `translate3d(${ draggerX }px, ${ draggerY }px, 0)`;
    return htmlSafe(`transform: ${ transform };`);
  }).readOnly(),

  /*
   * Internal methods.
   */
  handleMove,

  handleDraggerMove(clientX, clientY) {
    const moveHandler = this.get('onChange');
    if (typeof(moveHandler) !== 'function') {
      return;
    }

    moveHandler({
      x: clientX,
      y: clientY,
    });
  },

  /*
   * Action handlers.
   */
  mouseDown: startDrag,
  mouseMove: handleMove,
  mouseUp: handleDragEnd,

  touchStart: startDrag,
  touchMove: handleMove,
  touchEnd: handleDragEnd,
  touchCancel: handleDragEnd,

  /*
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    const onDraggerHeightChanged = this.get('onDraggerHeightChanged');
    if (typeOf(onDraggerHeightChanged) === 'function') {
      // Publish the height of our dragger.
      const draggerElement = this.$('div.Polaris-ColorPicker__Dragger')[0];

      // Yes, for some strange reason this is width not height in the shopify code...
      onDraggerHeightChanged(draggerElement.clientWidth);
    }
  },
});
