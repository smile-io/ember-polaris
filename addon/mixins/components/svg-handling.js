/* eslint-disable ember/no-new-mixins */
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isNone } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';

/**
 * This mixin is intended for use with components that render an SVG icon
 * via the `svg-jar` helper.
 *
 * The Polaris React implementation checks the
 * `fill` attribute on SVG elements and their children to ensure SVGs
 * always respect whatever `color` they're passed.
 *
 * In this mixin, we automate that process - all that's needed is to
 * include this mixin in the component that renders the SVG, and pass
 * `id=svgElementId` to the `svg-jar` invocation.
 *
 * TODO: this currently only supports having a single SVG per component.
 * This should be fine for now though since this mixin only gets used
 * in components whose sole responsibility is to render a single SVG.
 */
export default Mixin.create({
  /**
   * Generated unique ID to be set on the rendered SVG element.
   *
   * @type {string}
   */
  svgElementId: computed(function () {
    // We append '-svg' to the component's Ember-generated GUID,
    // because Ember will automatically use that GUID as the ID
    // for the root element of non-tagless components.
    return `${guidFor(this)}-svg`;
  }).readOnly(),

  /**
   *
   * @type {DOMNode}
   */
  get svgElement() {
    return document.querySelector(`#${this.svgElementId}`);
  },

  removeFillsFromSvgElement() {
    this.removeSvgFills(this.svgElement);
  },

  /**
   * Helper method to process the `fill` attribute
   * on a given SVG element and its children.
   */
  removeSvgFills(elem) {
    if (isNone(elem) || !elem.hasChildNodes()) {
      return;
    }

    let children = elem.childNodes;
    for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i];
      if (child.tagName === 'g') {
        child.removeAttribute('fill');
        this.removeSvgFills(child);
      } else {
        let fill = child.getAttribute('fill');
        // This is what Shopify does too in @shopify/images/icon-loader.js
        let newFill = fill && fill.indexOf('#FFF') !== -1 ? 'currentColor' : '';
        child.setAttribute('fill', newFill);
      }
    }
  },

  didInsertElement() {
    this._super(...arguments);

    this.removeFillsFromSvgElement();
  },

  didUpdateAttrs() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, this.removeFillsFromSvgElement);
  },
});
