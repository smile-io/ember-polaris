import Component from '@ember/component';
import { computed } from '@ember/object';
import { classify } from '@ember/string';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-display-text';
import deprecateClassArgument from '../utils/deprecate-class-argument';

/**
 * Polaris display text component.
 * See https://polaris.shopify.com/components/titles-and-text/display-text
 *
 * Default inline usage:
 *
 *   {{polaris-display-text text="This is some text"}}
 *
 * Customised block usage (note the use of htmlTag instead of element - this is an ember thing):
 *
 *   {{#polaris-display-text htmlTag="h1" size="extraLarge"}}
 *     This is some BIG text
 *   {{/polaris-display-text}}
 */
@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisDisplayText extends Component {
  /**
   * Name of element to use for text
   * NOTE: Matches polaris-react's `element`
   *
   * @type {String}
   * @default p
   * @public
   */
  htmlTag = 'p';

  /**
   * Size of the text
   *
   * @type {String}
   * @default medium
   * @public
   */
  size = 'medium';

  /**
   * Content to display
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

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisDisplayText] Passing 'tagName' argument is deprecated! Use '@htmlTag' instead`,
      !this.tagName,
      {
        id: 'ember-polaris.polaris-display-text.tagName-arg',
        until: '7.0.0',
      }
    );
  }

  @computed('size')
  get sizeClassName() {
    return `Polaris-DisplayText--size${classify(this.size)}`;
  }
}
