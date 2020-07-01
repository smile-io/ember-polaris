import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { getRectForNode } from '@shopify/javascript-utilities/geometry';
import layout from '../templates/components/polaris-sticky';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Undocumented Polaris sticky component.
 */
@tagName('')
@templateLayout(layout)
export default class PolarisSticky extends Component.extend(
  TaglessCssDeprecation
) {
  @service
  stickyManager;

  /**
   * Element outlining the fixed position boundaries
   *
   * @type {HTMLElement}
   * @default null
   * @public
   */
  boundingElement = null;

  /**
   * Offset vertical spacing from the top of the scrollable container
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  offset = null;

  /**
   * Should the element remain in a fixed position when the layout is stacked (smaller screens)
   *
   * @type {Boolean}
   * @default null
   * @public
   */
  disableWhenStacked = null;

  /**
   * @type {Boolean}
   */
  isSticky = false;

  /**
   * @type {String}
   */
  style = null;

  adjustPlaceHolderNode(add) {
    let { placeHolderNode, stickyNode } = this;
    if (placeHolderNode && stickyNode) {
      placeHolderNode.style.paddingBottom = add
        ? `${getRectForNode(stickyNode).height}px`
        : '0px';
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.stickyManager.unregisterStickyItem(this.stickyNode);
  }

  @action
  handlePositioning(stick, top = 0, left = 0, width = 0) {
    let { isSticky } = this;

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

  @action
  registerStickyItem() {
    let {
      stickyNode,
      placeHolderNode,
      handlePositioning,
      offset,
      boundingElement,
      disableWhenStacked,
    } = this;

    this.stickyManager.registerStickyItem({
      stickyNode,
      placeHolderNode,
      handlePositioning,
      offset,
      boundingElement,
      disableWhenStacked,
    });
  }

  @action
  setPlaceHolderNode(element) {
    this.placeHolderNode = element;
  }

  @action
  setStickyNode(element) {
    this.stickyNode = element;
  }
}
