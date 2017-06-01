import Ember from 'ember';
import layout from '../templates/components/polaris-heading';

const {
  Component,
} = Ember;

/**
 * Polaris heading component.
 * See https://polaris.shopify.com/components/titles-and-text/heading
 *
 * Default inline usage:
 *
 *   {{polaris-heading children="This is a heading"}}
 *
 * Customised block usage (note the use of tagName instead of element - this is an ember thing):
 *
 *   {{#polaris-heading tagName="em"}}
 *     This is an emphasised heading
 *   {{/polaris-heading}}
 */
export default Component.extend({
  tagName: 'h2',
  classNames: ['Polaris-Heading'],

  layout,

  /*
   * Public attributes.
   */
  /*
   * element
   * string
   * The element name to use for the heading
   * NOTE: use tagName instead to avoid "Cannot read property 'getElement' of undefined" error
   */
  // element: 'h2',

  /**
   * children
   * string
   * The content to display inside the heading
   * NOTE: this component can be used in block form,
   * in which case the block content will be used
   * instead of `children`
   */
  children: null,
});
