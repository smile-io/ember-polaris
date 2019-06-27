import Component from '@ember/component';
import layout from '../templates/components/polaris-subheading';

/**
 * Polaris subheading component.
 * See https://polaris.shopify.com/components/titles-and-text/subheading
 *
 * Default inline usage:
 *
 *   {{polaris-subheading text="This is a subheading"}}
 *
 * Customised block usage (note the use of tagName instead of element - this is an ember thing):
 *
 *   {{#polaris-subheading tagName="u"}}
 *     This is an underlined subheading
 *   {{/polaris-subheading}}
 */
export default Component.extend({
  tagName: 'h3',

  attributeBindings: ['ariaLabel:aria-label'],

  classNames: ['Polaris-Subheading'],

  layout,

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
   * @public
   */
  text: null,

  /**
   * @private
   */
  ariaLabel: null,

  didRender() {
    this._super(...arguments);

    // Update ariaLabel with the new content.
    this.set('ariaLabel', this.element.textContent.trim());
  },
});
