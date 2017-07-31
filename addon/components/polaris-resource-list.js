import Ember from 'ember';
import layout from '../templates/components/polaris-resource-list';
const {
  Component,
} = Ember;

/**
 * Polaris resource list component.
 * See https://polaris.shopify.com/components/tables-and-lists/resource-list
 */
export default Component.extend({
  tagName: 'ul',
  classNames: ['Polaris-ResourceList'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Item data; each item is rendered using the itemComponent below
   *
   * @property items*
   * @type {Array}
   * @default null
   */
  items: null,

  /**
   * Component to render each item
   *
   * @property itemComponent
   * @type {function}
   * @default 'polaris-resource-list/item'
   */
  itemComponent: 'polaris-resource-list/item',
});
