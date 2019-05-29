/**
 * Utility to wrap child nodes in wrapper nodes
 *
 * @param {HtmlCollection} children   Full list of child nodes for a given container.
 * @param {HtmlNode} wrapperNode      The node to wrap matching child nodes in.
 * @param {Function} shouldWrapFn     Function that recieves a child node and returns a boolean
 *                                    to determine if the child should be wrapped in the wrapper.
 *
 * Example:
 *
 *  wrapChildren(
 *    this.element.children,
 *    document.createElement('div'),
 *    function(el) {
 *      return !el.classList.contains('Polaris-Stack__Item');
 *    },
 *  );
 */
export default function wrapChildren(children, wrapperNode, shouldWrapFn) {
  let childNode;
  let clonedWrapper;

  for (var i = children.length - 1; i >= 0; i--) {
    childNode = children[i];

    if (shouldWrapFn(childNode)) {
      clonedWrapper = wrapperNode.cloneNode();
      childNode.parentNode.insertBefore(clonedWrapper, childNode);
      clonedWrapper.appendChild(childNode);
    }
  }

  wrapperNode.remove();
}
