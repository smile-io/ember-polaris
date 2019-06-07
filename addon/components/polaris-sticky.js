import { layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember-decorators/service";
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { getRectForNode } from '@shopify/javascript-utilities/geometry';
import layout from '../templates/components/polaris-sticky';
import { computedIdVariation } from '@smile-io/ember-polaris/utils/id';

/**
 * Undocumented Polaris sticky component.
 */
@templateLayout(layout)
export default class PolarisSticky extends Component {
  @service()
  stickyManager;

  /**
   * Element outlining the fixed position boundaries
   *
   * @property boundingElement
   * @type {HTMLElement}
   * @default null
   * @public
   */
  boundingElement = null;

  /**
   * Offset vertical spacing from the top of the scrollable container
   *
   * @property offset
   * @type {Boolean}
   * @default null
   * @public
   */
  offset = null;

  /**
   * Should the element remain in a fixed position when the layout is stacked (smaller screens)
   *
   * @property disableWhenStacked
   * @type {Boolean}
   * @default null
   * @public
   */
  disableWhenStacked = null;

  /**
   * @property isSticky
   * @type {Boolean}
   * @default false
   * @private
   */
  isSticky = false;

  /**
   * @property style
   * @type {String}
   * @default null
   * @private
   */
  style = null;

  /**
   * @property placeHolderNodeId
   * @type {String}
   * @private
   */
  @computedIdVariation('elementId', 'PlaceHolder').readOnly()
  placeHolderNodeId;

  /**
   * @property stickyNodeId
   * @type {String}
   * @private
   */
  @computedIdVariation('elementId', 'Sticky').readOnly()
  stickyNodeId;

  /**
   * @property placeHolderNode
   * @type {HTMLElement}
   * @private
   */
  @computed()
  get placeHolderNode() {
    return this.get('element').querySelector(
      `#${this.get('placeHolderNodeId')}`
    );
  }

  /**
   * @property stickyNode
   * @type {HTMLElement}
   * @private
   */
  @computed()
  get stickyNode() {
    return this.get('element').querySelector(`#${this.get('stickyNodeId')}`);
  }

  handlePositioning(stick, top = 0, left = 0, width = 0) {
    let isSticky = this.get('isSticky');

    if ((stick && !isSticky) || (!stick && isSticky)) {
      this.adjustPlaceHolderNode(stick);
      this.toggleProperty('isSticky');
    }

    let style = stick
      ? htmlSafe(
          `position: fixed; top: ${top}px; left: ${left}px; width: ${width}px;`
        )
      : null;

    this.set('style', style);
  }

  adjustPlaceHolderNode(add) {
    let { placeHolderNode, stickyNode } = this.getProperties(
      'placeHolderNode',
      'stickyNode'
    );
    if (placeHolderNode && stickyNode) {
      placeHolderNode.style.paddingBottom = add
        ? `${getRectForNode(stickyNode).height}px`
        : '0px';
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    let stickyManager = this.get('stickyManager');

    let {
      stickyNode,
      placeHolderNode,
      offset,
      boundingElement,
      disableWhenStacked,
    } = this.getProperties(
      'stickyNode',
      'placeHolderNode',
      'offset',
      'boundingElement',
      'disableWhenStacked'
    );
    stickyManager.registerStickyItem({
      stickyNode,
      placeHolderNode,
      handlePositioning: (...positioningArgs) =>
        this.handlePositioning(...positioningArgs),
      offset,
      boundingElement,
      disableWhenStacked,
    });
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    let stickyManager = this.get('stickyManager');
    stickyManager.unregisterStickyItem(this.get('stickyNode'));
  }
}
