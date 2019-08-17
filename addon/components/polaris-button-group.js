import Component from '@ember/component';
import layout from '../templates/components/polaris-button-group';

/**
 * Polaris button group component.
 * See https://polaris.shopify.com/components/actions/button-group
 */
export default Component.extend({
  classNames: ['Polaris-ButtonGroup'],

  classNameBindings: [
    'segmented:Polaris-ButtonGroup--segmented',
    'fullWidth:Polaris-ButtonGroup--fullWidth',
    'connectedTop:Polaris-ButtonGroup--connectedTop',
  ],

  layout,

  /**
   * Button components
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text: null,

  /**
   * Join buttons as segmented group
   *
   * @property segmented
   * @type {Boolean}
   * @default false
   * @public
   */
  segmented: false,

  /**
   * Buttons will stretch/shrink to occupy the full width
   *
   * @property fullWidth
   * @type {Boolean}
   * @default false
   * @public
   */
  fullWidth: false,

  /**
   * Remove top left and right border radius
   *
   * @property connectedTop
   * @type {Boolean}
   * @default false
   * @public
   */
  connectedTop: false,

  'data-test-button-group': true,
});
