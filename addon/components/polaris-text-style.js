import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { computed } from "@ember/object";
import Component from '@ember/component';
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
@tagName('')
@templateLayout(layout)
export default class PolarisTextStyle extends Component {
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
  variation = null;

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
  text = null;

  /**
   * Custom style classes to apply to this element.
   *
   * @type {String}
   */
  classes = '';

  dataTestTextStyle = true;

  /**
   * @private
   */
  @(computed('variation').readOnly())
  get elementTagName() {
    return variationElement(this.get('variation'));
  }

  /**
   * @private
   */
  @(computed('variation', 'classes').readOnly())
  get textStyleClasses() {
    let { variation, classes } = this.getProperties('variation', 'classes');
    if (Object.keys(variationValue).includes(variation)) {
      classes = `Polaris-TextStyle--variation${classify(variation)} ${classes}`;
    }

    return classes.trim();
  }
}
