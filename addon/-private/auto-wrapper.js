import { action } from '@ember/object';
import { run } from '@ember/runloop';
import { wrapChildren, rejectNodesByClassName } from '../utils/dom';

export default class AutoWrapper {
  /**
   * Auto-wrap an HTML element's child nodes with a div with a CSS class and attributes given. By
   * default (if `nodesFilter` is ommited), will wrap the nodes that don't have the `childClass` CSS
   * class.
   *
   * @param {HTMLElement} target    Element to wrap child nodes for
   * @param {String} childClass     CSS class to apply to the child wrapping div
   * @param {Object} attributes     Object with HTML attribute/value to be applied to the wrapping
   *                                div
   * @param {Function} nodesFilter  Optional. If given will be invoked with all child nodes to
   *                                filter the ones that will be wrapped
   */
  constructor(target, childClass, attributes, nodesFilter = null) {
    this.target = target;
    this.childClass = childClass;
    this.attributes = attributes;
    this.nodesFilter = nodesFilter;

    this._setup();
    this._wrapChildren();
  }

  _setup() {
    this.mutationObserver = new MutationObserver(() => {
      run(this, this._wrapChildren);
    });

    this.mutationObserver.observe(this.target, {
      childList: true,
    });
  }

  teardown() {
    this.mutationObserver.disconnect();
    this.mutationObserver = null;
  }

  _nodesFilter(nodes) {
    if (this.nodesFilter) {
      return [...nodes].filter(this.nodesFilter);
    }

    return rejectNodesByClassName(nodes, this.childClass);
  }

  @action
  _wrapChildren() {
    const { attributes } = this;
    let nodesToWrap = this._nodesFilter(this.target.children);

    let wrapper = document.createElement('div');
    wrapper.classList.add(this.childClass);
    Object.keys(attributes).forEach((key) =>
      wrapper.setAttribute(key, attributes[key])
    );

    wrapChildren(nodesToWrap, wrapper);
  }
}
