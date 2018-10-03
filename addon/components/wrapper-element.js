import Component from '@ember/component';
import { isBlank } from '@ember/utils';
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
    if (isBlank(this.get('tagName'))) {
      return;
    }

    let { attrs, blacklistedAttributeBindings } = this.getProperties(
      'attrs',
      'blacklistedAttributeBindings'
    );

    let newAttributeBindings = Object.keys(attrs).filter((attr) => {
      return blacklistedAttributeBindings.indexOf(attr) === -1;
    });
    this.set('attributeBindings', newAttributeBindings);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.updateAttributeBindings();
  },
});
