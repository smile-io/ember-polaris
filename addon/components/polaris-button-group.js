import Component from '@ember/component';
import layout from '../templates/components/polaris-button-group';

/**
 * Polaris button group component.
 * See https://polaris.shopify.com/components/actions/button-group
 */
export default Component.extend({
  classNames: ['Polaris-ButtonGroup'],
  classNameBindings: ['segmented:Polaris-ButtonGroup--segmented'],

  layout,

  /*
   * Public attributes.
   */
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
   */
  text: null,

  /**
   * Join buttons as segmented group
   *
   * @property segmented
   * @type {bool}
   * @default false
   */
  segmented: false,

  /**
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    // Wrap each child element that isn't already a group item.
    this.$().children()
      .not('div.Polaris-ButtonGroup__Item')
      .wrap('<div class="Polaris-ButtonGroup__Item"></div>');
  },
});
