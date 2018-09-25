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
  classNameBindings: ['disabled:Polaris-Tag--disabled'],

  layout,

  /**
   * The content to display inside the tag.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @public
   * @type {String}
   * @default: null
   */
  text: null,

  /**
   * Disables the tag.
   *
   * @property disabled
   * @public
   * @type {boolean}
   * @default: false
   */
  disabled: false,

  /**
   * String to be used as the `remove` button's `aria-label`
   * Gets updated after rendering to always use the most up-to-date tag text
   *
   * @property buttonLabel
   * @private
   * @type {String}
   * @default null
   */
  buttonLabel: null,

  handleMouseUpByBlurring,

  /**
   * Callback when tag is removed
   *
   * @property onRemove
   * @public
   * @type {Function}
   * @default no-op
   */
  onRemove() {},

  updateButtonLabel() {
    // Set the remove button's aria-label based on the current text in the tag.
    // We access the element's `textContent` so that this still works in block usage.
    let tagText = this.get('element.textContent') || '';
    this.set('buttonLabel', `Remove ${tagText.trim()}`);
  },

  didRender() {
    this._super(...arguments);
    this.updateButtonLabel();
  },
});
