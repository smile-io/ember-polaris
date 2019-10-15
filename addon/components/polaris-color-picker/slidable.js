import Component from '@ember/component';
import { computed } from '@ember/object';
import { isNone, typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { getRectForNode } from '@shopify/javascript-utilities/geometry';
import layout from '../../templates/components/polaris-color-picker/slidable';

function startDrag(event) {
  this.set('isDragging', true);
  this.handleMove(event);

  // Set up global event listeners to handle dragging outside the slidable area.
  let mousemove = window.addEventListener('mousemove', (...moveArgs) =>
    this.handleMove(...moveArgs)
  );

  let mouseup = window.addEventListener('mouseup', () => this.handleDragEnd());

  let touchmove = window.addEventListener('touchmove', (...moveArgs) =>
    this.handleMove(...moveArgs)
  );
  let touchend = window.addEventListener('touchend', () =>
    this.handleDragEnd()
  );
  let touchcancel = window.addEventListener('touchcancel', () =>
    this.handleDragEnd()
  );

  this.set('globalEventListeners', {
    mousemove,
    mouseup,
    touchmove,
    touchend,
    touchcancel,
  });
}

// Draggable marker, used to pick hue, saturation, brightness and alpha.
export default Component.extend({
  classNames: ['Polaris-ColorPicker__Slidable'],

  layout,

  /**
   * The current x position of the dragger
   *
   * @property draggerX
   * @type {Number}
   * @default 0
   * @public
   */
  draggerX: 0,

  /**
   * The current y position of the dragger
   *
   * @property draggerY
   * @type {Number}
   * @default 0
   * @public
   */
  draggerY: 0,

  /**
   * Callback for the outside world to receive the height of the dragger
   *
   * @property onDraggerHeightChanged
   * @type {function}
   * @default null
   * @public
   */
  onDraggerHeightChanged: null,

  /**
   * @private
   */
  isDragging: false,

  /**
   * @private
   */
  mouseDown: startDrag,

  /**
   * @private
   */
  touchStart: startDrag,

  /**
   * @private
   */
  draggerStyle: computed('draggerX', 'draggerY', function() {
    const { draggerX, draggerY } = this.getProperties('draggerX', 'draggerY');
    const transform = `translate3d(${draggerX}px, ${draggerY}px, 0)`;
    return htmlSafe(`transform: ${transform};`);
  }).readOnly(),

  /**
   * @private
   */
  handleMove(event) {
    if (!this.get('isDragging')) {
      return;
    }

    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    if (event.touches && event.touches.length) {
      this.handleDraggerMove(
        event.touches[0].clientX,
        event.touches[0].clientY
      );
      return;
    }

    this.handleDraggerMove(event.clientX, event.clientY);
  },

  /**
   * @private
   */
  handleDragEnd() {
    this.set('isDragging', false);

    let { globalEventListeners } = this;

    // Remove our global event listeners.
    Object.keys(globalEventListeners).map((eventType) =>
      window.removeEventListener(eventType, globalEventListeners[eventType])
    );
  },

  /**
   * @private
   */
  handleDraggerMove(clientX, clientY) {
    const moveHandler = this.get('onChange');
    if (typeof moveHandler !== 'function') {
      return;
    }

    const element = this.get('element');
    if (isNone(element)) {
      return;
    }

    const rect = getRectForNode(element);
    moveHandler({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  },

  didRender() {
    this._super(...arguments);

    const onDraggerHeightChanged = this.get('onDraggerHeightChanged');
    if (typeOf(onDraggerHeightChanged) === 'function') {
      // Publish the height of our dragger.
      const draggerElement = this.element.querySelector(
        'div.Polaris-ColorPicker__Dragger'
      );
      if (isNone(draggerElement)) {
        return;
      }

      // Yes, for some strange reason this is width not height in the shopify code...
      onDraggerHeightChanged(draggerElement.clientWidth);
    }
  },
});
