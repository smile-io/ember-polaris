/**
 * Utility to wrap nodes in wrapper nodes
 *
 * @param {Array} nodesToWrap   List of nodes to be wrapped
 * @param {HtmlNode} wrapper    The node to wrap matching child nodes in.
 *
 */
export default function wrapChildren(nodesToWrap, wrapper) {
  let clonedWrapper;

  nodesToWrap.forEach((node) => {
    clonedWrapper = wrapper.cloneNode();
    node.parentNode.insertBefore(clonedWrapper, node);
    clonedWrapper.appendChild(node);
  });
}

/**
 * Convert htmlCollection to an array in order
 * to use array methods on the collection.
 */
export function collectionToArray(htmlCollection) {
  let a = [];
  for (var i = 0; i < htmlCollection.length; i++) {
    a.push(htmlCollection[i]);
  }
  return a;
}

/**
 * Convert an htmlCollection into a filtered array.
 *
 */
export function childrenWithoutClassName(htmlCollection, className) {
  return collectionToArray(htmlCollection).filter(
    (el) => !el.classList.contains(className)
  );
}
