import Component from '@ember/component';
import layout from '../templates/components/polaris-resource-list';

/**
 * Polaris resource list component.
 * See https://polaris.shopify.com/components/lists/resource-list
 */
export default Component.extend({
  tagName: 'ul',

  classNames: ['Polaris-ResourceList'],

  layout,

  /**
   * Item data; each item is rendered using the itemComponent below
   *
   * @property items
   * @type {Array}
   * @default null
   * @public
   */
  items: null,

  /**
   * Component to render each item
   *
   * @property itemComponent
   * @type {function}
   * @default 'polaris-resource-list/item'
   * @public
   */
  itemComponent: 'polaris-resource-list/item',
});
