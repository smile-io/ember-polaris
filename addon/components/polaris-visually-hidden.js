import Ember from 'ember';
import layout from '../templates/components/polaris-visually-hidden';

const {
  Component,
} = Ember;

/**
 * Polaris VisuallyHidden component.
 * See https://polaris.shopify.com/components/titles-and-text/visuallyhidden
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-VisuallyHidden'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to be hidden visually
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default: null
   */
  text: null,
});
