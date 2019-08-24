import { action } from '@ember/object';
import { run } from '@ember/runloop';
import { wrapChildren, rejectNodesByClassName } from '../utils/dom';

export default class AutoWrapper {
  constructor(target, childClass, attributes) {
    this.target = target;
    this.childClass = childClass;
    this.attributes = attributes;

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

  @action
  _wrapChildren() {
    const { attributes, childClass, target } = this;

    let nodesToWrap = rejectNodesByClassName(target.children, childClass);
    let wrapper = document.createElement('div');

    wrapper.classList.add(childClass);
    Object.keys(attributes).forEach((key) =>
      wrapper.setAttribute(key, attributes[key])
    );

    wrapChildren(nodesToWrap, wrapper);
  }
}
