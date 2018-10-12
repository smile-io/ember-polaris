import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { classify } from '@ember/string';
import layout from '../templates/components/polaris-text-style';

const variationValue = {
  positive: 'positive',
  negative: 'negative',
  strong: 'strong',
  subdued: 'subdued',
  code: 'code',
};

const variationElement = (variation) => {
  switch (variation) {
    case variationValue.code:
      return 'code';
    case variationValue.strong:
      return 'b';
    case variationValue.positive:
    case variationValue.negative:
    case variationValue.subdued:
    default:
      return 'span';
  }
};

/**
 * Polaris text style component.
 * See https://polaris.shopify.com/components/titles-and-text/text-style
 *
 * @component polaris-text-style
 */
export default Component.extend({
  tagName: '',

  layout,

  /**
   * Give text additional visual meaning
   *
   * Possible values: positive, negative, strong, subdued
   *
   * @property variation
   * @type {String}
   * @default: null
   * @public
   */
  variation: null,

  /**
   * The content that should get the intended styling
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default: null
   * @public
   */
  text: null,

  dataTestTextStyle: true,

  /**
   * @private
   */
  elementTagName: computed('variation', function() {
    return variationElement(this.get('variation'));
  }).readOnly(),

  /**
   * @private
   */
  variationClass: computed('variation', function() {
    const variation = this.get('variation');
    if (!Object.keys(variationValue).includes(variation)) {
      return null;
    }

    return `Polaris-TextStyle--variation${classify(variation)}`;
  }).readOnly(),
});
