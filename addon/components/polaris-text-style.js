import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
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
   * @type {String}
   * @default null
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
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * Custom style classes to apply to this element.
   *
   * @type {String}
   */
  classes = '';

  @(computed('variation').readOnly())
  get elementTagName() {
    return variationElement(this.variation);
  }

  @(computed('variation', 'classes').readOnly())
  get textStyleClasses() {
    let { variation, classes } = this;
    if (Object.keys(variationValue).includes(variation)) {
      classes = `Polaris-TextStyle--variation${classify(variation)} ${classes}`;
    }

    return classes.trim();
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisTextStyle] Passing 'classes' argument is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.classes,
      {
        id: 'ember-polaris.polaris-text-style.classes-arg',
        until: '7.0.0',
      }
    );
    deprecate(
      `[PolarisTextStyle] Passing 'dataTestTextStyle' argument is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.dataTestTextStyle,
      {
        id: 'ember-polaris.polaris-text-style.dataTestTextStyle-arg',
        until: '7.0.0',
      }
    );
  }
}
