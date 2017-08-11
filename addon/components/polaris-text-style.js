import Ember from 'ember';
import layout from '../templates/components/polaris-text-style';

const {
  Component,
  computed,
  isEmpty,
  String: EmberString,
} = Ember;

const {
  classify,
} = EmberString;

/**
 * Polaris text style component (undocumented).
 */
export default Component.extend({
  tagName: 'span',
  classNameBindings: ['variationClass'],

  layout,

  /*
   * Public attributes.
   */
  /**
   * Text style to apply (positive, negative, strong or subdued)
   *
   * @property variation
   * @type {string}
   * @default: null
   */
  variation: null,

  /**
   * Content to apply the variation to
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

  /*
   * Internal properties.
   */
  variationClass: computed('variation', function() {
    const variation = this.get('variation');
    if (isEmpty(variation)) {
      return null;
    }

    return `Polaris-TextStyle--variation${ classify(variation) }`;
  }).readOnly(),
});
