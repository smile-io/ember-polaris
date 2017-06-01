import Ember from 'ember';
import layout from '../templates/components/polaris-subheading';

const {
  Component,
} = Ember;

/**
 * Polaris subheading component.
 * See https://polaris.shopify.com/components/titles-and-text/subheading
 *
 * Default inline usage:
 *
 *   {{polaris-subheading children="This is a subheading"}}
 *
 * Customised block usage (note the use of tagName instead of element - this is an ember thing):
 *
 *   {{#polaris-subheading tagName="u"}}
 *     This is an underlined subheading
 *   {{/polaris-subheading}}
 */
export default Component.extend({
  tagName: 'h3',
  classNames: ['Polaris-Subheading'],

  layout,

  /*
   * Public attributes.
   */
  /*
   * element
   * string
   * The element name to use for the subheading
   * NOTE: use tagName instead to avoid "Cannot read property 'getElement' of undefined" error
   */
  // element: 'h2',

  /**
   * children
   * string
   * The content to display inside the subheading
   * NOTE: this component can be used in block form,
   * in which case the block content will be used
   * instead of `children`
   */
  children: null,
});
