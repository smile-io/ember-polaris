import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { isNone, typeOf } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { getRectForNode } from '@smile-io/ember-polaris/utils/geometry';
import $Ember from 'jquery';
import layout from '../../templates/components/polaris-color-picker/slidable';
import deprecateClassArgument from '../../utils/deprecate-class-argument';
import { bind } from '@ember/runloop';

// Draggable marker, used to pick hue, saturation, brightness and alpha.
@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisColorPickerSlidable extends Component {
  /**
   * The current x position of the dragger
   *
   * @type {Number}
   * @default 0
   * @public
   */
  draggerX = 0;

  /**
   * The current y position of the dragger
   *
   * @type {Number}
   * @default 0
   * @public
   */
  draggerY = 0;

  /**
   * Callback for the outside world to receive the height of the dragger
   *
   * @type {function}
   * @default null
   * @public
   */
  onDraggerHeightChanged = null;

  isDragging = false;

  @(computed('draggerX', 'draggerY').readOnly())
  get draggerStyle() {
    const { draggerX, draggerY } = this;
    const transform = `translate3d(${draggerX}px, ${draggerY}px, 0)`;
    return htmlSafe(`transform: ${transform};`);
  }

  handleMove(event) {
    if (!this.isDragging) {
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
  }

  handleDragEnd() {
    this.set('isDragging', false);

    // Remove our global event listeners.
    $Ember(window).off('mousemove');
    $Ember(window).off('mouseup');

    $Ember(window).off('touchmove');
    $Ember(window).off('touchend');
    $Ember(window).off('touchcancel');
  }

  handleDraggerMove(clientX, clientY) {
    const { onChange: moveHandler } = this;
    if (typeof moveHandler !== 'function') {
      return;
    }

    const { sliderElement: element } = this;
    if (isNone(element)) {
      return;
    }

    const rect = getRectForNode(element);

    moveHandler({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }

  @action
  setElementAndTriggerHeightChanged(element) {
    this.set('sliderElement', element);

    const { onDraggerHeightChanged } = this;
    if (typeOf(onDraggerHeightChanged) === 'function') {
      // Publish the height of our dragger.
      const draggerElement = element.querySelector(
        'div.Polaris-ColorPicker__Dragger'
      );
      if (isNone(draggerElement)) {
        return;
      }

      // Yes, for some strange reason this is width not height in the shopify code...
      onDraggerHeightChanged(draggerElement.clientWidth);
    }
  }

  @action
  startDrag(event) {
    this.set('isDragging', true);
    this.handleMove(event);

    // Set up global event listeners to handle dragging outside the slidable area.
    $Ember(window).on('mousemove', bind(this, this.handleMove));
    $Ember(window).on('mouseup', bind(this, this.handleDragEnd));
    $Ember(window).on('touchmove', bind(this, this.handleMove));
    $Ember(window).on('touchend', bind(this, this.handleDragEnd));
    $Ember(window).on('touchcancel', bind(this, this.handleDragEnd));
  }
}
