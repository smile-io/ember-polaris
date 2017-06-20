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
  attributeBindings: ['ariaLabel:aria-label'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * The content to display inside the heading
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `children`
   *
   * @property children
   * @type {String}
   * @default null
   */
  children: null,

  /**
   * Internal properties.
   */
  ariaLabel: null,

  /**
   * Lifecycle hooks.
   */
  didRender() {
    this._super(...arguments);

    // Update ariaLabel with the new content.
    this.set('ariaLabel', this.$().text().trim());
  },
});
