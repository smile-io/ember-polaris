import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../../templates/components/polaris-resource-list/item';

export default Component.extend({
  classNames: ['Polaris-ResourceList__Item'],

  layout,

  /**
   * Item to render.
   * Available properties:
   *  url - TODO
   *  media - TODO
   *  attributeOne
   *  attributeTwo
   *  attributeThree
   *  badges - TODO
   *  exceptions - TODO
   *  actions - TODO
   *  persistActions - TODO
   *
   * @property item
   * @type {Object}
   * @default null
   * @public
   */
  item: null,

  /**
   * @private
   */
  itemId: computed(function() {
    return guidFor(this);
  }),
});
