import Ember from 'ember';
import layout from '../templates/components/polaris-display-text';

const {
  Component,
  computed,
  String: {
    classify,
  }
} = Ember;

/**
 * Polaris display text component.
 * See https://polaris.shopify.com/components/titles-and-text/display-text
 *
 * Default inline usage:
 *
 *   {{polaris-display-text children="This is some text"}}
 *
 * Customised block usage (note the use of tagName instead of element - this is an ember thing):
 *
 *   {{#polaris-display-text tagName="h1" size="extraLarge"}}
 *     This is some BIG text
 *   {{/polaris-display-text}}
 */
export default Component.extend({
  tagName: 'p',
  classNames: ['Polaris-DisplayText'],
  classNameBindings: ['sizeClassName'],

  layout,

  /*
   * Public attributes.
   */
  /*
   * element
   * string
   * Name of element to use for text
   * NOTE: use tagName instead to avoid "Cannot read property 'getElement' of undefined" error
   */
  // element: 'p',

  /*
   * size
   * string
   * Size of the text
   */
  size: 'medium',

  /**
   * children
   * string
   * Content to display
   * NOTE: this component can be used in block form,
   * in which case the block content will be used
   * instead of `children`
   */
  children: null,

  /**
   * Computed properties.
   */
  sizeClassName: computed('size', function() {
    const size = this.get('size');
    return `Polaris-DisplayText--size${classify(size)}`;
  }).readOnly(),
});
