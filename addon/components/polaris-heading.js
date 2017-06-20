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
 *   {{polaris-heading text="This is a heading"}}
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
  /**
   * The content to display inside the heading
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   */
  text: null,
});
