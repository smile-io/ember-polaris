import Ember from 'ember';
import layout from '../templates/components/polaris-footer-help';

const {
  Component,
} = Ember;

/**
 * Polaris footer help component.
 * See https://polaris.shopify.com/components/titles-and-text/footer-help
 */
export default Component.extend({
  classNames: ['Polaris-FooterHelp'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to display inside the layout.
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
