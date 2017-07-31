import Ember from 'ember';
import layout from '../../templates/components/polaris-resource-list/item';

const {
  Component,
  computed,
  guidFor,
} = Ember;

export default Component.extend({
  classNames: ['Polaris-ResourceList__Item'],

  layout,

  /*
   * Public attributes.
   */
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
   */
  item: null,

  /*
   * Internal properties.
   */
  itemId: computed(function () {
    return guidFor(this);
  }),
});
