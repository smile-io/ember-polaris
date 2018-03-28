import Component from '@ember/component';
import layout from '../templates/components/polaris-tag';
import { handleMouseUpByBlurring } from '../utils/focus';

/**
 * Polaris tag component.
 * See https://polaris.shopify.com/components/forms/tag
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Tag'],

  layout,

  mouseUp: handleMouseUpByBlurring,

  /**
   * The content to display inside the tag.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @public
   * @property text
   * @type {String}
   * @default: null
   */
  text: null,

  /**
   *  Callback when tag is removed
   *
   * @property onRemove
   * @type {Function}
   * @default no-op
   */
  onRemove() {}
});
