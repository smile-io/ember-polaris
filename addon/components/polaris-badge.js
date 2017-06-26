import Ember from 'ember';
import layout from '../templates/components/polaris-badge';

const {
  Component,
} = Ember;

/**
 * Polaris badge component.
 * See https://polaris.shopify.com/components/images-and-icons/badge
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Badge'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to display inside the badge.
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

  /**
   * Set the color of the badge for the given status.
   *
   * @property status
   * @type {string}
   * @default: null
   */
  status: null,
});
