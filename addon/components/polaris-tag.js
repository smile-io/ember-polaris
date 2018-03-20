import Component from '@ember/component';
import layout from '../templates/components/polaris-tag';

/**
 * Polaris tag component.
 * See https://polaris.shopify.com/components/forms/tag
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['Polaris-Tag'],

  layout,

  /**
   * The content to display inside the tag.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @public
   * @property text
   * @type {string}
   * @default: null
   */
  text: null,

  /**
   *  Callback when tag is removed
   *
   * @property onRemove
   * @type {function}
   * @default no-op
   */
  onRemove() {},

  actions: {
    remove() {
      this.get('onRemove')();
    }
  }
});
