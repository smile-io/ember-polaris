/**
 * Utility to wrap nodes in wrapper nodes
 *
 * @param {Array} nodesToWrap   List of nodes to be wrapped
 * @param {HtmlNode} wrapper    The node to wrap matching child nodes in.
 *
 */
export function wrapChildren(nodesToWrap, wrapper) {
  let clonedWrapper;

  nodesToWrap.forEach((node) => {
    clonedWrapper = wrapper.cloneNode();
    node.parentNode.insertBefore(clonedWrapper, node);
    clonedWrapper.appendChild(node);
  });
}

/**
 * Convert an htmlCollection into a filtered array.
 *
 */
export function rejectNodesByClassName(htmlCollection, className) {
  return [...htmlCollection].filter((el) => !el.classList.contains(className));
}
