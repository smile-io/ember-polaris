import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-display-text';

/**
 * Polaris display text component.
 * See https://polaris.shopify.com/components/titles-and-text/display-text
 *
 * Default inline usage:
 *
 *   {{polaris-display-text text="This is some text"}}
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

  /**
   * Size of the text
   *
   * @property size
   * @type {String}
   * @default medium
   * @public
   */
  size: 'medium',

  /**
   * Content to display
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

  'data-test-display-text': true,

  /**
   * @private
   */
  sizeClassName: computed('size', function() {
    const size = this.get('size');
    return `Polaris-DisplayText--size${classify(size)}`;
  }).readOnly(),
});
