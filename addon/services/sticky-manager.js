import Service from '@ember/service';
import { A as EmberArray } from '@ember/array';
import ContextBoundEventListenersMixin from 'ember-lifeline/mixins/dom';
import ContextBoundTasksMixin from 'ember-lifeline/mixins/run';
import tokens from '@shopify/polaris-tokens';
import stackedContent from '@smile-io/ember-polaris/utils/breakpoints';

export default Service.extend(
  ContextBoundEventListenersMixin,
  ContextBoundTasksMixin,
  {
    /**
     * @property stickyItems
     * @type {Array}
     * @private
     */
    stickyItems: EmberArray(),

    /**
     * @property stuckItems
     * @type {Array}
     * @private
     */
    stuckItems: EmberArray(),

    /**
     * @property container
     * @type {Document|HTMLElement}
     * @private
     */
    container: null,

    registerStickyItem(stickyItem) {
      this.get('stickyItems').push(stickyItem);
    },

    unregisterStickyItem(nodeToRemove) {
      let stickyItems = this.get('stickyItems');
      let nodeIndex = stickyItems.findIndex(
        ({ stickyNode }) => nodeToRemove === stickyNode
      );
      stickyItems.splice(nodeIndex, 1);
    },

    setContainer(el) {
      this.set('container', el);
      this.addEventListener(el, 'scroll', this.handleScroll);
      this.addEventListener(window, 'resize', this.handleResize);
      this.manageStickyItems();
    },

    removeScrollListener() {
      let container = this.get('container');
      if (container) {
        this.removeEventListener(container, 'scroll', this.handleScroll);
        this.removeEventListener(window, 'resize', this.handleResize);
      }
    },

    handleResize() {
      this.throttleTask('manageStickyItems', 50);
    },

    handleScroll() {
      this.throttleTask('manageStickyItems', 50);
    },

    manageStickyItems() {
      let stickyItems = this.get('stickyItems');
      if (stickyItems.length <= 0) {
        return;
      }

      let container = this.get('container');
      let scrollTop = scrollTopFor(container);
      let containerTop = container.getBoundingClientRect().top;

      stickyItems.forEach((stickyItem) => {
        let { handlePositioning } = stickyItem;

        let { sticky, top, left, width } = this.evaluateStickyItem(
          stickyItem,
          scrollTop,
          containerTop
        );

        this.updateStuckItems(stickyItem, sticky);

        handlePositioning(sticky, top, left, width);
      });
    },

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
    },

    updateStuckItems(item, sticky) {
      let { stickyNode } = item;
      if (sticky && !this.isNodeStuck(stickyNode)) {
        this.addStuckItem(item);
      } else if (!sticky && this.isNodeStuck(stickyNode)) {
        this.removeStuckItem(item);
      }
    },

    addStuckItem(stickyItem) {
      this.get('stuckItems').push(stickyItem);
    },

    removeStuckItem(stickyItem) {
      let stuckItems = this.get('stuckItems');
      let { stickyNode: nodeToRemove } = stickyItem;
      let nodeIndex = stuckItems.findIndex(
        ({ stickyNode }) => nodeToRemove === stickyNode
      );
      stuckItems.splice(nodeIndex, 1);
    },

    getOffset(node) {
      let stuckItems = this.get('stuckItems');
      let stuckItemsLength = stuckItems.get('length');
      if (stuckItemsLength === 0) {
        return 0;
      }

      let offset = 0;
      let count = 0;
      let stuckNodesLength = stuckItemsLength;
      let nodeRect = node.getBoundingClientRect();

      while (count < stuckNodesLength) {
        let stuckNode = stuckItems[count].stickyNode;
        if (stuckNode !== node) {
          let stuckNodeRect = stuckNode.getBoundingClientRect();
          if (!horizontallyOverlaps(nodeRect, stuckNodeRect)) {
            offset += stuckNode.getBoundingClientRect().height;
          }
        } else {
          break;
        }
        count++;
      }

      return offset;
    },

    isNodeStuck(node) {
      let nodeFound = this.get('stuckItems').findIndex(
        ({ stickyNode }) => node === stickyNode
      );

      return nodeFound >= 0;
    },

    init() {
      this._super(...arguments);

      let container = this.get('container');
      if (container) {
        this.setContainer(container);
      }
    },
  }
);

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
