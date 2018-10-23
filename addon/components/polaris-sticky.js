import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-sticky';
import { computedIdVariation } from '../utils/id';

/**
 * Undocumented Polaris sticky component.
 */
export default Component.extend({
  layout,

  stickyManager: service(),

  /**
   * Element outlining the fixed position boundaries
   *
   * @property boundingElement
   * @type {HTMLElement}
   * @default null
   * @public
   */
  boundingElement: null,

  /**
   * Offset vertical spacing from the top of the scrollable container
   *
   * @property offset
   * @type {Boolean}
   * @default null
   * @public
   */
  offset: null,

  /**
   * Should the element remain in a fixed position when the layout is stacked (smaller screens)
   *
   * @property disableWhenStacked
   * @type {Boolean}
   * @default null
   * @public
   */
  disableWhenStacked: null,

  /**
   * @property isSticky
   * @type {Boolean}
   * @default false
   * @private
   */
  isSticky: false,

  /**
   * @property style
   * @type {String}
   * @default null
   * @private
   */
  style: null,

  /**
   * @property placeHolderNodeId
   * @type {String}
   * @private
   */
  placeHolderNodeId: computedIdVariation('elementId', 'PlaceHolder').readOnly(),

  /**
   * @property stickyNodeId
   * @type {String}
   * @private
   */
  stickyNodeId: computedIdVariation('elementId', 'Sticky').readOnly(),

  /**
   * @property placeHolderNode
   * @type {HTMLElement}
   * @private
   */
  placeHolderNode: computed(function() {
    return this.get('element').querySelector(
      `#${this.get('placeHolderNodeId')}`
    );
  }),

  /**
   * @property stickyNode
   * @type {HTMLElement}
   * @private
   */
  stickyNode: computed(function() {
    return this.get('element').querySelector(`#${this.get('stickyNodeId')}`);
  }),

  handlePositioning(stick, top = 0, left = 0, width = 0) {
    let isSticky = this.get('isSticky');

    if ((stick && !isSticky) || (!stick && isSticky)) {
      this.adjustPlaceHolderNode(stick);
      this.setState({ isSticky: !isSticky });
    }

    let style = stick
      ? `position: fixed; top: ${top}px; left: ${left}px; width: ${width}px;`
      : null;

    this.set('style', style);
  },

  adjustPlaceHolderNode(add) {
    let { placeHolderNode, stickyNode } = this.getProperties(
      'placeHolderNode',
      'stickyNode'
    );
    if (placeHolderNode && stickyNode) {
      placeHolderNode.style.paddingBottom = add
        ? `${stickyNode.getBoundingClientRect().height}px`
        : '0px';
    }
  },

  didInsertElement() {
    this._super(...arguments);

    let stickyManager = this.get('stickyManager');

    stickyManager.registerStickyItem(
      this.getProperties(
        'stickyNode',
        'placeHolderNode',
        'handlePositioning',
        'offset',
        'boundingElement',
        'disableWhenStacked'
      )
    );
  },

  willDestroyElement() {
    this._super(...arguments);

    let stickyManager = this.get('stickyManager');
    stickyManager.unregisterStickyItem(this.get('stickyNode'));
  },
});
