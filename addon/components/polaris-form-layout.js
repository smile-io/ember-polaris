import Component from '@ember/component';
import layout from '../templates/components/polaris-form-layout';

/**
 * Polaris form layout component.
 * See https://polaris.shopify.com/components/forms/form-layout
 *
 * @component polaris-form-layout
 */
export default Component.extend({
  classNames: ['Polaris-FormLayout'],

  layout,

  /**
   * The content to display inside the layout
   *
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text: null,

  'data-test-form-layout': true,

  didRender() {
    this._super(...arguments);

    // Wrap each child element that isn't already a group or an item.
    this.$()
      .children()
      .not('div[role="group"]')
      .not('div.Polaris-FormLayout__Item')
      .wrap(
        '<div class="Polaris-FormLayout__Item" data-test-form-layout-item></div>'
      );
  },
});
