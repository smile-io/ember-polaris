import Service from '@ember/service';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import { throttleTask, runDisposables } from 'ember-lifeline';
import tokens from '@shopify/polaris-tokens';
import { getRectForNode } from '@smile-io/ember-polaris/utils/geometry';
import stackedContent from '@smile-io/ember-polaris/utils/breakpoints';

export default class StickyManager extends Service.extend(
  ContextBoundEventListenersMixin
) {
  /**
   * @type {Object[]}
   */
  stickyItems = [];

  /**
   * @type {Object[]}
   */
  stuckItems = [];

  /**
   * @type {Document|HTMLElement}
   */
  container = null;

  registerStickyItem(stickyItem) {
    this.stickyItems.push(stickyItem);
  }

  unregisterStickyItem(nodeToRemove) {
    let nodeIndex = this.stickyItems.findIndex(
      ({ stickyNode }) => nodeToRemove === stickyNode
    );
    this.stickyItems.splice(nodeIndex, 1);
  }

  setContainer(el) {
    this.set('container', el);
    this.addEventListener(el, 'scroll', this.handleScroll);
    this.addEventListener(window, 'resize', this.handleResize);
    this.manageStickyItems();
  }

  removeScrollListener() {
    if (this.container) {
      this.removeEventListener(this.container, 'scroll', this.handleScroll);
      this.removeEventListener(window, 'resize', this.handleResize);
    }
  }

  handleResize() {
    throttleTask(this, 'manageStickyItems', 40, false);
  }

  handleScroll() {
    throttleTask(this, 'manageStickyItems', 40, false);
  }

  manageStickyItems() {
    if (this.stickyItems.length <= 0) {
      return;
    }

    let scrollTop = scrollTopFor(this.container);
    let containerTop = getRectForNode(this.container).top;

    this.stickyItems.forEach((stickyItem) => {
      let { handlePositioning } = stickyItem;

      let { sticky, top, left, width } = this.evaluateStickyItem(
        stickyItem,
        scrollTop,
        containerTop
      );

      this.updateStuckItems(stickyItem, sticky);

      handlePositioning(sticky, top, left, width);
    });
  }

  evaluateStickyItem(stickyItem, scrollTop, containerTop) {
    let {
      stickyNode,
      placeHolderNode,
      boundingElement,
      offset,
      disableWhenStacked,
    } = stickyItem;

    if (disableWhenStacked && stackedContent().matches) {
      return {
        sticky: false,
        top: 0,
        left: 0,
        width: 'auto',
      };
    }

    let stickyOffset = offset
      ? this.getOffset(stickyNode) + parseInt(tokens.spacingLoose, 10)
      : this.getOffset(stickyNode);

    let scrollPosition = scrollTop + stickyOffset;
    let placeHolderNodeCurrentTop =
      placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop;
    let top = containerTop + stickyOffset;
    let width = placeHolderNode.getBoundingClientRect().width;
    let left = placeHolderNode.getBoundingClientRect().left;

    let sticky;

    if (boundingElement == null) {
      sticky = scrollPosition >= placeHolderNodeCurrentTop;
    } else {
      let stickyItemHeight = stickyNode.getBoundingClientRect().height;
      let stickyItemBottomPosition =
        boundingElement.getBoundingClientRect().bottom -
        stickyItemHeight +
        scrollTop -
        containerTop;

      sticky =
        scrollPosition >= placeHolderNodeCurrentTop &&
        scrollPosition < stickyItemBottomPosition;
    }

    return {
      sticky,
      top,
      left,
      width,
    };
  }

  updateStuckItems(item, sticky) {
    let { stickyNode } = item;
    if (sticky && !this.isNodeStuck(stickyNode)) {
      this.addStuckItem(item);
    } else if (!sticky && this.isNodeStuck(stickyNode)) {
      this.removeStuckItem(item);
    }
  }

  addStuckItem(stickyItem) {
    this.stuckItems.push(stickyItem);
  }

  removeStuckItem(stickyItem) {
    let { stickyNode: nodeToRemove } = stickyItem;
    let nodeIndex = this.stuckItems.findIndex(
      ({ stickyNode }) => nodeToRemove === stickyNode
    );
    this.stuckItems.splice(nodeIndex, 1);
  }

  getOffset(node) {
    let stuckNodesLength = this.stuckItems.length;
    if (stuckNodesLength === 0) {
      return 0;
    }

    let offset = 0;
    let count = 0;
    let nodeRect = getRectForNode(node);

    while (count < stuckNodesLength) {
      let stuckNode = this.stuckItems[count].stickyNode;
      if (stuckNode !== node) {
        let stuckNodeRect = getRectForNode(stuckNode);
        if (!horizontallyOverlaps(nodeRect, stuckNodeRect)) {
          offset += getRectForNode(stuckNode).height;
        }
      } else {
        break;
      }
      count++;
    }

    return offset;
  }

  isNodeStuck(node) {
    let nodeFound = this.stuckItems.findIndex(
      ({ stickyNode }) => node === stickyNode
    );

    return nodeFound >= 0;
  }

  init() {
    super.init(...arguments);

    /*
     * The original `StickyManager` React code doesn't default this to `document`,
     * but the React `AppProvider` *does* set it to `document` if that exists.
     * This default value is here to recreate this behaviour without having to
     * implement `AppProvider`.
     */
    let container = this.container || document;
    if (container) {
      this.setContainer(container);
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    runDisposables(this);
  }
}

function isDocument(node) {
  return node === document;
}

function scrollTopFor(container) {
  return isDocument(container)
    ? document.body.scrollTop || document.documentElement.scrollTop
    : container.scrollTop;
}

function horizontallyOverlaps(rect1, rect2) {
  const rect1Left = rect1.left;
  const rect1Right = rect1.left + rect1.width;
  const rect2Left = rect2.left;
  const rect2Right = rect2.left + rect2.width;

  return rect2Right < rect1Left || rect1Right < rect2Left;
}
