import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { dasherize } from '@ember/string';
import layout from '../templates/components/wrapper-element';

const blacklistedAttributeBindings = ['tagName', 'class'];

/**
 * This is a simple utility component that lets us do things like wrap block content
 * in a conditional element, since `tagName` can't be a computed property.
 */
export default Component.extend({
  attributeBindings: [],

  layout,

  blacklistedAttributeBindings,

  updateAttributeBindings() {
    if (isBlank(this.tagName)) {
      return;
    }

    let { attrs, blacklistedAttributeBindings } = this;

    let newAttributeBindings = Object.keys(attrs)
      .filter((attr) => {
        return blacklistedAttributeBindings.indexOf(attr) === -1;
      })
      .map((attr) => {
        // Handle multi-word attributes (e.g. `ariaLabel`).
        let dasherizedAttr = dasherize(attr);
        return dasherizedAttr === attr ? attr : `${attr}:${dasherizedAttr}`;
      });

    this.set('attributeBindings', newAttributeBindings);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.updateAttributeBindings();
  },
});
